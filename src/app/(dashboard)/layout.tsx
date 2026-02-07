'use client'

import ProtectedRoute from '@/lib/auth/protected-route'
import { ReactNode } from 'react'
import Link from 'next/link'
import { Cat, Home, PlusCircle, Settings, LogOut, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth/provider'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute requiredRole="shelter">
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
        {/* Header do Dashboard */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="bg-pink-100 rounded-full p-2 mr-3">
                <Cat className="h-6 w-6 text-pink-500" />
              </div>
              <h1 className="text-xl font-bold text-pink-600">Kitty Admin</h1>
            </Link>
            
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-pink-600 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors">
                    <Home className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/announce-pet" className="flex items-center text-gray-600 hover:text-pink-600 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors">
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Anunciar Pet
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/requests" className="flex items-center text-gray-600 hover:text-pink-600 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Solicitações
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/settings" className="flex items-center text-gray-600 hover:text-pink-600 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors">
                    <Settings className="h-4 w-4 mr-1" />
                    Configurações
                  </Link>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-pink-600 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sair
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}