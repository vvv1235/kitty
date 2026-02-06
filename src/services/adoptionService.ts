// src/services/adoptionService.ts

import { AdoptionRequest } from '@/types/adoption';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const adoptionService = {
  // Criar uma nova solicitação de adoção
  async createAdoptionRequest(requestData: Omit<AdoptionRequest, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<AdoptionRequest> {
    const newRequest = {
      ...requestData,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('adoption_requests')
      .insert([newRequest])
      .select()
      .single();

    if (error) {
      console.error('Error creating adoption request:', error);
      throw new Error(`Failed to create adoption request: ${error.message}`);
    }

    return data as AdoptionRequest;
  },

  // Obter solicitações de adoção para um pet específico
  async getAdoptionRequestsByPet(petId: string): Promise<AdoptionRequest[]> {
    const { data, error } = await supabase
      .from('adoption_requests')
      .select(`
        *,
        adopter:user_id (email)
      `)
      .eq('pet_id', petId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching adoption requests by pet:', error);
      throw new Error(`Failed to fetch adoption requests: ${error.message}`);
    }

    return data as AdoptionRequest[];
  },

  // Obter solicitações de adoção feitas por um adotante específico
  async getAdoptionRequestsByAdopter(adopterId: string): Promise<AdoptionRequest[]> {
    const { data, error } = await supabase
      .from('adoption_requests')
      .select(`
        *,
        pet:pet_id (name, photos)
      `)
      .eq('adopter_id', adopterId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching adoption requests by adopter:', error);
      throw new Error(`Failed to fetch adoption requests: ${error.message}`);
    }

    return data as AdoptionRequest[];
  },

  // Obter todas as solicitações de adoção para pets de um abrigo específico
  async getAdoptionRequestsByShelter(shelterId: string): Promise<AdoptionRequest[]> {
    const { data, error } = await supabase
      .from('adoption_requests')
      .select(`
        *,
        adopter:user_id (email),
        pet:pet_id (name, photos)
      `)
      .in('pet_id', 
        supabase
          .from('pets')
          .select('id')
          .eq('shelter_id', shelterId)
          .then(res => res.data?.map((pet: any) => pet.id) || [])
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching adoption requests by shelter:', error);
      throw new Error(`Failed to fetch adoption requests: ${error.message}`);
    }

    return data as AdoptionRequest[];
  },

  // Atualizar o status de uma solicitação de adoção
  async updateAdoptionRequestStatus(requestId: string, status: 'pending' | 'approved' | 'rejected'): Promise<AdoptionRequest> {
    const updateData = {
      status,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('adoption_requests')
      .update(updateData)
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      console.error('Error updating adoption request status:', error);
      throw new Error(`Failed to update adoption request: ${error.message}`);
    }

    return data as AdoptionRequest;
  },

  // Deletar uma solicitação de adoção
  async deleteAdoptionRequest(requestId: string): Promise<void> {
    const { error } = await supabase
      .from('adoption_requests')
      .delete()
      .eq('id', requestId);

    if (error) {
      console.error('Error deleting adoption request:', error);
      throw new Error(`Failed to delete adoption request: ${error.message}`);
    }
  },
};