'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Kitty - Plataforma de Adoção</h1>
        <p className="mt-4">Conectando pets com lares amorosos.</p>
        <div className="mt-4">
          <Button onClick={handleNavigation}>Entrar ou Cadastrar</Button>
        </div>
      </div>
    </div>
  )
}