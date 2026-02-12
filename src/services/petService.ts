// src/services/petService.ts

import { Pet, CreatePetInput, UpdatePetInput } from '@/types/pet'
import { createClient } from '@/lib/supabase/client'

const getUpdatedClient = () => createClient()

export const petService = {
  // Listar pets de um usuário específico
  async getPetsByUser(userId: string): Promise<Pet[]> {
    const supabase = getUpdatedClient()
    const { data, error } = await supabase
      .from('pets')
      .select('*, user_id:shelter_id') // alias shelter_id -> user_id para compatibilidade
      .eq('shelter_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching pets:', error)
      throw new Error(`Failed to fetch pets: ${error.message}`)
    }

    return data as unknown as Pet[]
  },

  // Obter um pet específico
  async getPetById(id: string): Promise<Pet | null> {
    const supabase = getUpdatedClient()
    const { data, error } = await supabase
      .from('pets')
      .select('*, user_id:shelter_id')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      console.error('Error fetching pet:', error)
      throw new Error(`Failed to fetch pet: ${error.message}`)
    }

    return data as unknown as Pet
  },

  // Criar um novo pet
  async createPet(petData: CreatePetInput, userId: string): Promise<Pet> {
    const supabase = getUpdatedClient()
    const newPet = {
      ...petData,
      shelter_id: userId, // compat: coluna existente
      status: 'available',
      photos: petData.photos || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('pets')
      .insert([newPet])
      .select('*, user_id:shelter_id')
      .single()

    if (error) {
      console.error('[petService] Erro completo do Supabase:', error)
      throw new Error(`Failed to create pet: ${error.message}`)
    }

    return data as unknown as Pet
  },

  // Atualizar um pet existente
  async updatePet(id: string, petData: UpdatePetInput): Promise<Pet> {
    const supabase = getUpdatedClient()
    const updateData = {
      ...petData,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('pets')
      .update(updateData)
      .eq('id', id)
      .select('*, user_id:shelter_id')
      .single()

    if (error) {
      console.error('Error updating pet:', error)
      throw new Error(`Failed to update pet: ${error.message}`)
    }

    return data as unknown as Pet
  },

  // Deletar um pet
  async deletePet(id: string): Promise<void> {
    const supabase = getUpdatedClient()
    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting pet:', error)
      throw new Error(`Failed to delete pet: ${error.message}`)
    }
  },

  // Obter todos os pets disponíveis
  async getAllAvailablePets(): Promise<Pet[]> {
    const supabase = getUpdatedClient()
    const { data, error } = await supabase
      .from('pets')
      .select('*, user_id:shelter_id')
      .eq('status', 'available')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all pets:', error)
      throw new Error(`Failed to fetch pets: ${error.message}`)
    }

    return data as unknown as Pet[]
  },
}
