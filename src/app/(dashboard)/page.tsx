import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth/provider"

export default function Dashboard() {
  const { user, signOut } = useAuth()
  
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard do Abrigo</h1>
        <Button variant="outline" onClick={handleLogout}>Sair</Button>
      </div>
      
      <p className="mt-4">Bem-vindo, {user?.email}!</p>
      <p className="mt-2">Gerencie seus pets e solicitações de adoção.</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/announce-pet">
          <div className="border rounded-lg p-6 hover:bg-gray-100 cursor-pointer">
            <h3 className="font-bold">Anunciar Novo Pet</h3>
            <p className="text-sm text-gray-600 mt-2">Adicione um novo pet para adoção</p>
          </div>
        </Link>
        
        <Link href="#">
          <div className="border rounded-lg p-6 hover:bg-gray-100 cursor-pointer">
            <h3 className="font-bold">Solicitações de Adoção</h3>
            <p className="text-sm text-gray-600 mt-2">Visualize e gerencie solicitações</p>
          </div>
        </Link>
        
        <Link href="/dashboard/settings">
          <div className="border rounded-lg p-6 hover:bg-gray-100 cursor-pointer">
            <h3 className="font-bold">Configurações</h3>
            <p className="text-sm text-gray-600 mt-2">Gerencie seu perfil</p>
          </div>
        </Link>
      </div>
    </div>
  )
}