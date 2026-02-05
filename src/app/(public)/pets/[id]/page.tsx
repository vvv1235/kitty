import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/provider"
import { useRouter } from 'next/navigation'

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
    <div className="p-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Fluffy - Gatinho Carinhoso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src="https://placehold.co/400x400/EFEFEF/333333?text=Foto+do+Pet" 
                alt="Foto do pet" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Detalhes do Pet</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Idade:</span> 2 anos
                </div>
                <div>
                  <span className="font-semibold">Raça:</span> Vira-lata
                </div>
                <div>
                  <span className="font-semibold">Porte:</span> Médio
                </div>
                <div>
                  <span className="font-semibold">Sexo:</span> Macho
                </div>
                <div>
                  <span className="font-semibold">Localização:</span> Manaus, AM
                </div>
                <div>
                  <span className="font-semibold">Vacinado:</span> Sim
                </div>
                <div>
                  <span className="font-semibold">Castrado:</span> Sim
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold mb-2">Descrição:</h4>
                <p>Fluffy é um gatinho muito carinhoso e brincalhão. Ele adora receber atenção e está procurando um lar cheio de amor.</p>
              </div>
              
              <Button 
                className="mt-6 w-full" 
                onClick={handleAdoptionRequest}
              >
                Solicitar Adoção
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}