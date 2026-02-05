'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/provider"
import { useRouter } from 'next/navigation'
import { Heart, MapPin, Calendar, Users, Syringe, Scissors, Home, Star } from "lucide-react"

export default function PetDetail({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()

  const handleAdoptionRequest = () => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/login')
      return
    }
    
    // Here you would typically open a modal or navigate to an adoption form
    alert('Solicitação de adoção enviada!')
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
                  <CardTitle className="text-2xl font-bold text-gray-800">Fluffy - Gatinho Carinhoso</CardTitle>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                  <Star className="h-4 w-4 text-gray-300 ml-1" />
                  <span className="ml-2 text-sm text-gray-600">(4.8 de 5)</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 bg-pink-100 px-4 py-2 rounded-full flex items-center">
                <Heart className="h-4 w-4 text-pink-500 mr-1" />
                <span className="text-pink-700 font-medium">Disponível</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                  <img 
                    src="https://placehold.co/400x400/EFEFEF/333333?text=Foto+do+Pet" 
                    alt="Foto do pet" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-pink-600">2 anos</div>
                    <div className="text-sm text-gray-600">Idade</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-pink-600">Médio</div>
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
                    <span className="ml-2">Vira-lata</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Sexo:</span> 
                    <span className="ml-2">Macho</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Localização:</span> 
                    <span className="ml-2">Manaus, AM</span>
                  </div>
                  <div className="flex items-center">
                    <Syringe className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Vacinado:</span> 
                    <span className="ml-2">Sim</span>
                  </div>
                  <div className="flex items-center">
                    <Scissors className="h-4 w-4 text-pink-400 mr-2" />
                    <span className="font-semibold">Castrado:</span> 
                    <span className="ml-2">Sim</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                    <Heart className="h-4 w-4 text-pink-500 mr-2" />
                    Descrição
                  </h4>
                  <p className="text-gray-700">Fluffy é um gatinho muito carinhoso e brincalhão. Ele adora receber atenção e está procurando um lar cheio de amor. Ele é muito dócil e se dá bem com crianças e outros animais.</p>
                </div>
                
                <Button 
                  className="mt-6 w-full btn-kawaii py-6 text-lg" 
                  onClick={handleAdoptionRequest}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Solicitar Adoção
                </Button>
                
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

// Componente de ícone de gato para uso no cabeçalho
function CatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}