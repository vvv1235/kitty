export interface Pet {
  id: number;
  name: string;
  age: string;
  breed: string;
  location: string;
  description: string;
  status: 'available' | 'pending' | 'adopted';
  vaccinated: boolean;
  spayed: boolean;
  specialNeeds: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shelter {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  verified: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'adopter' | 'shelter' | 'admin';
  createdAt: Date;
}

export interface AdoptionRequest {
  id: number;
  petId: number;
  adopterId: string;
  shelterId: number;
  status: 'pending' | 'approved' | 'rejected';
  message: string;
  createdAt: Date;
  updatedAt: Date;
}