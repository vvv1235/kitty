import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth/provider"
import { Cat, Heart, PawPrint, Settings, LogOut, Users, PlusCircle } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function Dashboard() {
  const { user, signOut } = useAuth()
  
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute requiredRole="shelter">
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="bg-pink-100 rounded-full p-2 mr-3">
                <Cat className="h-6 w-6 text-pink-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Dashboard do Abrigo</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="btn-kawaii flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 mb-8 card-kawaii shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Bem-vindx, <span className="text-pink-500">{user?.email}</span>! 🐱</h2>
                <p className="text-gray-600 mt-1">Gerencie seus pets e solicitações de adoção com muito carinho</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center text-pink-500 bg-pink-50 px-4 py-2 rounded-full">
                <Heart className="h-4 w-4 mr-1" />
                <span>Amor por animais</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/dashboard/announce-pet" className="block">
              <div className="bg-white rounded-2xl p-6 card-kawaii hover:shadow-lg transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-pink-100 rounded-full p-3 mb-4">
                    <PlusCircle className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Anunciar Novo Pet</h3>
                  <p className="text-gray-600 text-sm">Adicione um novo pet para adoção</p>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/pets" className="block">
              <div className="bg-white rounded-2xl p-6 card-kawaii hover:shadow-lg transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-pink-100 rounded-full p-3 mb-4">
                    <Users className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Meus Pets</h3>
                  <p className="text-gray-600 text-sm">Visualize e gerencie seus pets</p>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/settings" className="block">
              <div className="bg-white rounded-2xl p-6 card-kawaii hover:shadow-lg transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-pink-100 rounded-full p-3 mb-4">
                    <Settings className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Configurações</h3>
                  <p className="text-gray-600 text-sm">Gerencie seu perfil</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}