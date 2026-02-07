'use client'

import { useEffect } from 'react'
import { useAuth } from '@/lib/auth/provider'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const { signOut, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut()  // limpa sessão no client

        // Força refresh server-side para atualizar middleware
        router.refresh()

        // Redireciona com reload completo para limpar qualquer estado client-side travado
        window.location.href = '/login'
        // Alternativa: router.push('/login') + window.location.reload()
      } catch (err) {
        console.error('Erro no logout:', err)
        // Ainda redireciona mesmo com erro
        window.location.href = '/login'
      }
    }

    if (!isLoading) {
      performLogout()
    }
  }, [signOut, isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <div className="text-xl font-medium text-pink-600 animate-pulse">
        Saindo... Aguarde um momento 🐱
      </div>
    </div>
  )
}