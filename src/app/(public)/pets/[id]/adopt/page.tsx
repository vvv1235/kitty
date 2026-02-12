'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth/provider"
import { petService } from "@/services/petService"
import { adoptionService } from "@/services/adoptionService"
import { Pet } from "@/types/pet"

export default function AdoptPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const id = params.id as string

  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    async function fetchPet() {
      try {
        const p = await petService.getPetById(id)
        setPet(p)
      } catch (err) {
        console.error(err)
        setError("Falha ao carregar o pet. Tente novamente.")
      } finally {
        setLoading(false)
      }
    }
    fetchPet()
  }, [id])

  const handleSubmit = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    if (!pet) return

    setSubmitting(true)
    setError(null)
    try {
      await adoptionService.createAdoptionRequest({
        pet_id: pet.id,
        adopter_id: user.id,
        message,
      })
      alert('Solicitação de adoção enviada com sucesso!')
      router.push(`/pets/${pet.id}`)
    } catch (err: any) {
      console.error(err)
      setError('Falha ao enviar solicitação. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center p-6">
        <Card className="card-kawaii p-8 text-center">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pet não encontrado</h3>
            <Button onClick={() => router.push('/pets')} className="bg-gradient-to-r from-pink-400 to-orange-300 text-white">Voltar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="card-kawaii">
          <CardHeader>
            <CardTitle className="text-2xl text-pink-600">Solicitar adoção de {pet.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-pink-50 rounded-lg text-sm text-pink-700">
              <strong>Importante:</strong> Após enviar sua solicitação, o anunciante será notificado e poderá entrar em contato.
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensagem para o anunciante</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Conte sobre você, seu lar, rotina e por que quer adotar este pet."
                className="input-kawaii min-h-[140px]"
              />
            </div>
            {error && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>}
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50" onClick={() => router.push(`/pets/${pet.id}`)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={submitting} className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white">
                {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>) : (<><Heart className="mr-2 h-4 w-4" /> Enviar Solicitação</>)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
