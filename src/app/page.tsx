'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Cat, Heart, PawPrint } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Elementos decorativos kawaii */}
      <div className="absolute top-10 left-10 text-pink-300 text-3xl animate-bounce">🐾</div>
      <div className="absolute top-1/4 right-16 text-pink-300 text-4xl animate-pulse">🐱</div>
      <div className="absolute bottom-20 left-1/4 text-pink-300 text-2xl animate-bounce delay-150">💕</div>
      <div className="absolute bottom-1/3 right-1/3 text-pink-300 text-3xl animate-pulse delay-300">🐾</div>
      
      <div className="flex min-h-screen items-center justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-pink-100 rounded-full p-6 inline-block animate-bounce">
              <Cat className="h-16 w-16 text-pink-500" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent mb-4">
            Kitty - Plataforma de Adoção
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Conectando <span className="text-pink-500 font-semibold">pets adoráveis</span> com lares cheios de <Heart className="h-5 w-5 inline text-pink-500 fill-current" /> amor
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleNavigation} 
              className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Entrar ou Cadastrar
            </Button>
            
            <div className="mt-6 sm:mt-0 flex items-center text-pink-400">
              <PawPrint className="h-5 w-5 mr-2" />
              <span>Encontre seu companheiro perfeito</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elementos de fundo suaves */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-50 to-white"></div>
    </div>
  )
}