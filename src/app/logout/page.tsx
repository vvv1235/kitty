'use client'

import { useEffect } from 'react'
import { useAuth } from '@/lib/auth/provider'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const { signOut, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await signOut()
      router.push('/login')
    }
    
    if (!isLoading) {
      logout()
    }
  }, [signOut, isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Saindo...</div>
    </div>
  )
}