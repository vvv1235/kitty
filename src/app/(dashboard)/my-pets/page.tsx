'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pet } from '@/types/pet';
import { useAuth } from '@/lib/auth/provider';
import { PlusCircle, Edit, Trash2, Eye, Heart, Users, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { petService } from '@/services/petService';

export default function PetsList() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPets() {
      try {
        if (user?.id) {
          const petsData = await petService.getPetsByShelter(user.id);
          setPets(petsData);
        }
      } catch (err) {
        console.error('Error fetching pets:', err);
        setError('Falha ao carregar os pets. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, [user]);

  const handleDeletePet = async (petId: string) => {
    if (confirm('Tem certeza que deseja excluir este pet? Esta ação não pode ser desfeita.')) {
      try {
        await petService.deletePet(petId);
        // Atualizar a lista removendo o pet excluído
        setPets(pets.filter(pet => pet.id !== petId));
      } catch (err) {
        console.error('Error deleting pet:', err);
        alert('Falha ao excluir o pet. Por favor, tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Meus Pets</h1>
            <Link href="/dashboard/announce-pet">
              <Button className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar Pet
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="card-kawaii overflow-hidden animate-pulse">
                <CardContent className="p-4">
                  <div className="bg-gray-200 rounded-xl h-48 w-full mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="card-kawaii text-center p-8">
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <Users className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar pets</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white"
            >
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Meus Pets</h1>
          <Link href="/dashboard/announce-pet">
            <Button className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Pet
            </Button>
          </Link>
        </div>
        
        {pets.length === 0 ? (
          <Card className="card-kawaii text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="bg-pink-100 rounded-full p-4">
                  <Users className="h-12 w-12 text-pink-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum pet cadastrado</h3>
              <p className="text-gray-600 mb-4">Comece adicionando seu primeiro pet para adoção</p>
              <Link href="/dashboard/announce-pet">
                <Button className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adicionar Pet
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <Card key={pet.id} className="card-kawaii overflow-hidden">
                <div className="relative">
                  <img 
                    src={pet.photos[0] ? pet.photos[0] : 'https://placehold.co/300x300/EFEFEF/333333?text=Foto+do+Pet'} 
                    alt={pet.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
                    pet.status === 'available' ? 'bg-green-100 text-green-800' :
                    pet.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {pet.status === 'available' ? 'Disponível' : 
                     pet.status === 'reserved' ? 'Reservado' : 'Adotado'}
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-gray-800">{pet.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/my-pets/${pet.id}/edit`}>
                        <Button variant="ghost" size="icon" className="text-pink-500 hover:text-pink-700">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeletePet(pet.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Heart className="h-4 w-4 mr-1 text-pink-400" />
                    <span>{pet.species === 'cat' ? 'Gato' : pet.species === 'dog' ? 'Cachorro' : 'Outro'} • </span>
                    <span className="ml-2">{pet.gender === 'male' ? 'Macho' : 'Fêmea'} • </span>
                    <span className="ml-2">{pet.age} meses</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                      <span>{pet.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-pink-400" />
                      <span>Cadastrado em: {new Date(pet.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <p className="text-sm text-gray-700 line-clamp-2">{pet.description}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pet.vaccinated && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Vacinado</span>}
                      {pet.dewormed && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vermifugado</span>}
                      {pet.sterilized && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Esterilizado</span>}
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Link href={`/pets/${pet.id}`}>
                        <Button variant="outline" size="sm" className="flex-1 border-pink-200 text-pink-600 hover:bg-pink-50">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </Link>
                      <Link href={`/dashboard/my-pets/${pet.id}/edit`}>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}