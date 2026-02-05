// src/services/petService.ts

import { Pet, CreatePetInput, UpdatePetInput } from '@/types/pet';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const petService = {
  // Listar pets de um abrigo específico
  async getPetsByShelter(shelterId: string): Promise<Pet[]> {
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
    const newPet = {
      ...petData,
      shelter_id: shelterId,
      status: 'available',
      photos: petData.photos || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('pets')
      .insert([newPet])
      .select()
      .single();

    if (error) {
      console.error('Error creating pet:', error);
      throw new Error(`Failed to create pet: ${error.message}`);
    }

    return data as Pet;
  },

  // Atualizar um pet existente
  async updatePet(id: string, petData: UpdatePetInput): Promise<Pet> {
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
    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting pet:', error);
      throw new Error(`Failed to delete pet: ${error.message}`);
    }
  },

  // Upload de fotos para o Supabase Storage
  async uploadPetPhotos(files: File[], petId: string): Promise<string[]> {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Gerar nome único para o arquivo
      const fileName = `${petId}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${file.type.split('/')[1]}`;
      
      const { data, error } = await supabase.storage
        .from('pet-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading photo:', error);
        throw new Error(`Failed to upload photo: ${error.message}`);
      }

      // Obter URL pública
      const { data: publicData } = supabase.storage
        .from('pet-photos')
        .getPublicUrl(fileName);

      if (publicData) {
        uploadedUrls.push(publicData.publicUrl);
      }
    }

    return uploadedUrls;
  },

  // Remover fotos do Supabase Storage
  async removePetPhotos(photoUrls: string[], petId: string): Promise<void> {
    for (const url of photoUrls) {
      // Extrair o caminho do arquivo da URL
      const path = url.split('/pet-photos/')[1];
      if (path) {
        const { error } = await supabase.storage
          .from('pet-photos')
          .remove([path]);

        if (error) {
          console.error('Error removing photo:', error);
          // Não lançamos erro aqui para não interromper o processo
        }
      }
    }
  }
};