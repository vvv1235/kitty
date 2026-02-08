'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, MapPin, Search } from 'lucide-react';
import { Pet } from '@/types/pet';
import { petService } from '@/services/petService';
import Link from 'next/link';

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchPets() {
      try {
        // Pegar todos os pets disponíveis
        const allPets = await petService.getAllAvailablePets();
        setPets(allPets);
      } catch (err) {
        console.error('Error fetching pets:', err);
        setError('Falha ao carregar os pets disponíveis. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    return (
      pet.name.toLowerCase().includes(term) ||
      pet.breed.toLowerCase().includes(term) ||
      pet.location.toLowerCase().includes(term) ||
      pet.color.toLowerCase().includes(term) ||
      pet.species.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Pets Disponíveis para Adoção</h1>
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

  const hasPets = pets.length > 0;
  const hasFilteredPets = filteredPets.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Pets Disponíveis para Adoção</h1>
            <Badge variant="secondary" className="bg-pink-100 text-pink-800">
              {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}
            </Badge>
          </div>

          {/* Barra de pesquisa com lupa SEPARADA à esquerda */}
          <div className="w-full md:w-80 flex items-center gap-3 bg-white rounded-full shadow-md px-5 py-3 border border-pink-200">
            <Search className="h-6 w-6 text-pink-500 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Buscar por nome, raça, cidade, espécie..."
              className="border-none focus:ring-0 bg-transparent placeholder:text-pink-400 text-pink-600 text-base outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {!hasPets ? (
          <Card className="card-kawaii text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="bg-pink-100 rounded-full p-4">
                  <Heart className="h-12 w-12 text-pink-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum pet disponível no momento</h3>
              <p className="text-gray-600 mb-4">Volte mais tarde para ver novos pets disponíveis para adoção</p>
            </CardContent>
          </Card>
        ) : !hasFilteredPets ? (
          <Card className="card-kawaii text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="bg-pink-100 rounded-full p-4">
                  <Heart className="h-12 w-12 text-pink-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum pet encontrado</h3>
              <p className="text-gray-600 mb-4">Tente ajustar os termos da sua busca ou limpar o campo de pesquisa.</p>
              <Button
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
                onClick={() => setSearchTerm('')}
              >
                Limpar busca
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <Card key={pet.id} className="card-kawaii overflow-hidden">
                <div className="relative">
                  <img 
                    src={pet.photos && pet.photos.length > 0 ? pet.photos[0] : 'https://placehold.co/300x300/EFEFEF/333333?text=Foto+do+Pet'} 
                    alt={pet.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Disponível
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-gray-800">{pet.name}</CardTitle>
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
                    
                    <p className="text-sm text-gray-700 line-clamp-2">{pet.description}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pet.vaccinated && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Vacinado</span>}
                      {pet.dewormed && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vermifugado</span>}
                      {pet.sterilized && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Esterilizado</span>}
                    </div>
                    
                    <Link href={`/pets/${pet.id}`}>
                      <Button variant="outline" className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 mt-4">
                        <Heart className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </Link>
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