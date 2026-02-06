'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Users, Star, Heart } from 'lucide-react';

// Interface para representar um abrigo
interface Shelter {
  id: string;
  name: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  totalReviews: number;
  petsCount: number;
  verified: boolean;
}

export default function SheltersPage() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Simular dados de abrigos
  useEffect(() => {
    // Em uma aplicação real, isso viria de uma API
    const mockShelters: Shelter[] = [
      {
        id: '1',
        name: 'Abrigo Amor de Patas',
        description: 'Dedicados ao resgate e cuidado de animais abandonados, oferecendo amor e proteção até que encontrem seu lar definitivo.',
        location: 'Rua dos Animais, 123 - Centro, São Paulo, SP',
        phone: '(11) 98765-4321',
        email: 'contato@amordepatas.org',
        rating: 4.8,
        totalReviews: 124,
        petsCount: 32,
        verified: true
      },
      {
        id: '2',
        name: 'Protetores de Pelos',
        description: 'Organização sem fins lucrativos especializada no resgate e reabilitação de cães e gatos em situação de rua.',
        location: 'Av. Protetores, 456 - Jardins, Rio de Janeiro, RJ',
        phone: '(21) 99876-5432',
        email: 'ajuda@protetoresdepelos.org',
        rating: 4.9,
        totalReviews: 89,
        petsCount: 27,
        verified: true
      },
      {
        id: '3',
        name: 'Cantinho dos Bichinhos',
        description: 'Pequeno abrigo familiar que cuida com muito carinho de animais especiais que precisam de atenção veterinária constante.',
        location: 'Travessa dos Gatinhos, 78 - Vila Madalena, São Paulo, SP',
        phone: '(11) 97654-3210',
        email: 'contato@cantinhodobicho.org',
        rating: 4.7,
        totalReviews: 67,
        petsCount: 18,
        verified: false
      },
      {
        id: '4',
        name: 'Lar dos Peludinhos',
        description: 'Abrigo comunitário movido por voluntários apaixonados por animais, promovendo adoções responsáveis.',
        location: 'Praça da Esperança, 90 - Copacabana, Rio de Janeiro, RJ',
        phone: '(21) 98765-1234',
        email: 'lar@peludinhos.org',
        rating: 4.6,
        totalReviews: 102,
        petsCount: 41,
        verified: true
      }
    ];

    // Simular carregamento
    setTimeout(() => {
      setShelters(mockShelters);
      setLoading(false);
    }, 800);
  }, []);

  const filteredShelters = filter === 'verified' 
    ? shelters.filter(shelter => shelter.verified)
    : shelters;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-pink-600 flex items-center">
              <Users className="h-8 w-8 mr-3" />
              Nossos Abrigos Parceiros
            </h1>
            <Badge variant="secondary" className="bg-pink-100 text-pink-800">
              Carregando abrigos...
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="card-kawaii overflow-hidden animate-pulse">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-pink-600 flex items-center">
              <Users className="h-8 w-8 mr-3" />
              Nossos Abrigos Parceiros
            </h1>
            <p className="text-gray-600 mt-2">Conheça os abrigos que trabalham incansavelmente pelo bem-estar animal</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'border-pink-200 text-pink-600 hover:bg-pink-50'}
            >
              Todos
            </Button>
            <Button
              variant={filter === 'verified' ? 'default' : 'outline'}
              onClick={() => setFilter('verified')}
              className={filter === 'verified' ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'border-pink-200 text-pink-600 hover:bg-pink-50'}
            >
              Verificados
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredShelters.map((shelter) => (
            <Card key={shelter.id} className="card-kawaii overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-800 flex items-center">
                      {shelter.name}
                      {shelter.verified && (
                        <span className="ml-2 text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                          </svg>
                        </span>
                      )}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      <span>{shelter.rating} ({shelter.totalReviews})</span>
                    </div>
                  </div>
                  <Badge variant={shelter.verified ? 'default' : 'secondary'} className={shelter.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {shelter.verified ? 'Verificado' : 'Não verificado'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{shelter.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                    <span>{shelter.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-pink-400" />
                      <span>{shelter.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-pink-400" />
                      <span>{shelter.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Heart className="h-4 w-4 mr-1 text-pink-400" />
                      <span>{shelter.petsCount} pets sob cuidado</span>
                    </div>
                    <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                      Contatar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredShelters.length === 0 && (
          <Card className="card-kawaii text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="bg-pink-100 rounded-full p-4">
                  <Users className="h-12 w-12 text-pink-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum abrigo encontrado</h3>
              <p className="text-gray-600 mb-4">Tente ajustar os filtros para ver mais resultados</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}