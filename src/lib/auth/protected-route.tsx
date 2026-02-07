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
    if (!isLoading && !user) {
      router.push(redirectTo)
    } else if (!isLoading && user && requiredRole && user.role !== requiredRole) {
      // Redirect to unauthorized page or home
      router.push('/')
    }
  }, [user, isLoading, redirectTo, requiredRole, router])

  // Show loading state only while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  // If not authenticated and not loading, redirect should have happened by now
  if (!user && !isLoading) {
    return null // The redirect effect should handle navigation
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