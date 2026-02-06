// src/types/adoption.ts

export interface AdoptionRequest {
  id: string;
  pet_id: string;
  adopter_id: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  created_at: string;
  updated_at: string;
  // Campos adicionais que podem ser úteis para exibição
  adopter?: {
    email: string;
  };
  pet?: {
    name: string;
    photos: string[];
  };
}