'use client'

import { useAuth } from '@/lib/auth/provider'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'adopter' | 'shelter' | 'admin'
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Usuário não está logado, redirecionar para login
        router.push('/login')
      } else if (requiredRole && user.role !== requiredRole) {
        // Usuário não tem papel necessário, redirecionar para página inicial
        router.push('/')
      }
    }
  }, [user, isLoading, requiredRole, router])

  // Mostrar carregamento enquanto verifica autenticação
  if (isLoading || (!user && !requiredRole) || (user && requiredRole && user.role !== requiredRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  // Se usuário está autenticado e tem o papel necessário (ou nenhum papel é necessário), mostrar conteúdo
  return <>{children}</>
}