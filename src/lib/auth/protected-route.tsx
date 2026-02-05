'use client'

import { useAuth } from '@/lib/auth/provider'
import { redirect, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
  requiredRole?: 'adopter' | 'shelter' | 'admin'
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login', 
  requiredRole 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
      } else if (requiredRole && user.role !== requiredRole) {
        // Redirect to unauthorized page or home
        router.push('/')
      }
    }
  }, [user, isLoading, redirectTo, requiredRole, router])

  // Show loading state while checking authentication
  if (isLoading || (!user && !isLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Verificando autenticação...</div>
      </div>
    )
  }

  // Check role requirements
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Acesso negado. Permissões insuficientes.</div>
      </div>
    )
  }

  return <>{children}</>
}