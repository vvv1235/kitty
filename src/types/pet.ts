export interface Pet {
  id: string;
  name: string;
  species: 'cat' | 'dog' | 'other';
  breed: string;
  age: number; // in months
  size: 'small' | 'medium' | 'large';
  gender: 'male' | 'female';
  color: string;
  description: string;
  vaccinated: boolean;
  dewormed: boolean;
  sterilized: boolean;
  photos: string[]; // URLs das fotos
  shelter_id: string; // ID do abrigo que está anunciando
  location: string; // cidade/estado
  status: 'available' | 'reserved' | 'adopted';
  created_at: string;
  updated_at: string;
}

export interface CreatePetInput {
  name: string;
  species: 'cat' | 'dog' | 'other';
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large';
  gender: 'male' | 'female';
  color: string;
  description: string;
  vaccinated: boolean;
  dewormed: boolean;
  sterilized: boolean;
  location: string;
  photos?: string[];
}

export interface UpdatePetInput extends Partial<CreatePetInput> {
  status?: 'available' | 'reserved' | 'adopted';
  photos?: string[];
}