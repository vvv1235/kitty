// src/services/petService.ts

import { Pet, CreatePetInput, UpdatePetInput } from '@/types/pet';
import { createClient } from '@/lib/supabase/client';

// Função auxiliar para garantir que o cliente está atualizado com a sessão
const getUpdatedClient = () => {
  return createClient();
};

export const petService = {
  // Listar pets de um abrigo específico
  async getPetsByShelter(shelterId: string): Promise<Pet[]> {
    const supabase = getUpdatedClient();
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('shelter_id', shelterId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pets:', error);
      throw new Error(`Failed to fetch pets: ${error.message}`);
    }

    return data as Pet[];
  },

  // Obter um pet específico
  async getPetById(id: string): Promise<Pet | null> {
    const supabase = getUpdatedClient();
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Registro não encontrado
        return null;
      }
      console.error('Error fetching pet:', error);
      throw new Error(`Failed to fetch pet: ${error.message}`);
    }

    return data as Pet;
  },

  // Criar um novo pet
  async createPet(petData: CreatePetInput, shelterId: string): Promise<Pet> {
    console.log('[petService] Dados recebidos para insert:', petData);
    console.log('[petService] shelter_id:', shelterId);
    
    const supabase = getUpdatedClient();
    const newPet = {
      ...petData,
      shelter_id: shelterId,
      status: 'available',
      photos: petData.photos || [], // Initialize with empty array if not provided
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log('[petService] Objeto final para insert:', newPet);
    
    const { data, error } = await supabase
      .from('pets')
      .insert([newPet])
      .select()
      .single();

    if (error) {
      console.error('[petService] Erro completo do Supabase:', error);
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);
      console.error('Code:', error.code);
      console.error('Error creating pet:', error);
      throw new Error(`Failed to create pet: ${error.message}`);
    }
    
    console.log('[petService] Pet salvo com sucesso:', data);
    return data as Pet;
  },

  // Atualizar um pet existente
  async updatePet(id: string, petData: UpdatePetInput): Promise<Pet> {
    const supabase = getUpdatedClient();
    const updateData = {
      ...petData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('pets')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pet:', error);
      throw new Error(`Failed to update pet: ${error.message}`);
    }

    return data as Pet;
  },

  // Deletar um pet
  async deletePet(id: string): Promise<void> {
    const supabase = getUpdatedClient();
    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting pet:', error);
      throw new Error(`Failed to delete pet: ${error.message}`);
    }
  },

  // Obter todos os pets disponíveis
  async getAllAvailablePets(): Promise<Pet[]> {
    const supabase = getUpdatedClient();
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all pets:', error);
      throw new Error(`Failed to fetch pets: ${error.message}`);
    }

    return data as Pet[];
  }
};