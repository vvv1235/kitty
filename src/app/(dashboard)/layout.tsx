import ProtectedRoute from '@/lib/auth/protected-route'
import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute requiredRole="shelter">
      <div className="min-h-screen bg-gray-50">
        {/* Header do Dashboard */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-indigo-600">Kitty Admin</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</a></li>
                <li><a href="/dashboard/announce-pet" className="text-gray-600 hover:text-indigo-600">Anunciar Pet</a></li>
                <li><a href="/dashboard/settings" className="text-gray-600 hover:text-indigo-600">Configurações</a></li>
                <li><a href="/logout" className="text-gray-600 hover:text-indigo-600">Sair</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}