'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth/provider'
import { useRouter, useParams } from 'next/navigation'
import { Heart, MapPin, Users, Syringe, Scissors, Home, Star } from 'lucide-react'
import { Pet } from '@/types/pet'
import { petService } from '@/services/petService'
import Link from 'next/link'

export default function PetDetail() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchPet() {
      try {
        const petData = await petService.getPetById(id)
        setPet(petData)
      } catch (err) {
        console.error('Error fetching pet:', err)
        setError('Falha ao carregar os detalhes do pet. Por favor, tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchPet()
  }, [id])

  const handleAdoptionNavigate = () => {
    if (!user) {
      router.push('/login')
      return
    }
    router.push(`/pets/${id}/adopt`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="card-kawaii p-8 text-center">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar pet</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => router.back()}
              className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white"
            >
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="card-kawaii p-8 text-center">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pet não encontrado</h3>
            <p className="text-gray-600 mb-4">O pet que você está procurando não existe ou foi removido.</p>
            <Button 
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white"
            >
              Voltar para início
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="card-kawaii overflow-visible">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center">
                  <CatIcon className="h-6 w-6 text-pink-500 mr-2" />
                  <CardTitle className="text-2xl font-bold text-gray-800">{pet.name} - {pet.species === 'cat' ? 'Gatinho' : pet.species === 'dog' ? 'Cachorrinho' : 'Pet'} Carinhoso</CardTitle>
                </div>
              </div>
              <div className="mt-4 md:mt-0 bg-pink-100 px-4 py-2 rounded-full flex items-center">
                <Heart className="h-4 w-4 text-pink-500 mr-1" />
                <span className="text-pink-700 font-medium capitalize">{pet.status}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                  <img 
                    src={pet.photos && pet.photos.length > 0 ? pet.photos[0] : 'https://placehold.co/400x400/EFEFEF/333333?text=Foto+do+Pet'} 
                    alt={pet.name} 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-pink-600">{pet.age} meses</div>
                    <div className="text-sm text-gray-600">Idade</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-pink-600 capitalize">{pet.size}</div>
                    <div className="text-sm text-gray-600">Porte</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Heart className="h-5 w-5 text-pink-500 mr-2" />
                  Detalhes do Pet
                </h3>
                
                <div className="space-y-3 bg-white rounded-xl p-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Raça:</span> 
                    <span className="ml-2">{pet.breed || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Sexo:</span> 
                    <span className="ml-2 capitalize">{pet.gender === 'male' ? 'Macho' : 'Fêmea'}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Localização:</span> 
                    <span className="ml-2">{pet.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Syringe className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Vacinado:</span> 
                    <span className="ml-2">{pet.vaccinated ? 'Sim' : 'Não'}</span>
                  </div>
                  <div className="flex items-center">
                    <Scissors className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Castrado:</span> 
                    <span className="ml-2">{pet.sterilized ? 'Sim' : 'Não'}</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                    <Heart className="h-4 w-4 text-pink-500 mr-2" />
                    Descrição
                  </h4>
                  <p className="text-gray-700">{pet.description}</p>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full btn-kawaii py-6 text-lg" 
                    onClick={handleAdoptionNavigate}
                    disabled={pet.status !== 'available'}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    {pet.status !== 'available' ? 'Pet não disponível' : 'Solicitar Adoção'}
                  </Button>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-600">
                  <Home className="h-4 w-4 inline mr-1" />
                  Este pet está aguardando um lar cheio de carinho
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
