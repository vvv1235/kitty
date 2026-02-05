import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Cat, User, Mail, Save, Shield, Palette } from "lucide-react"

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-pink-100 rounded-full p-3 mr-4">
            <Cat className="h-6 w-6 text-pink-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Configurações da Conta</h1>
        </div>
        
        <div className="bg-white rounded-2xl p-6 card-kawaii">
          <form className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 mb-1">
                <User className="h-4 w-4 mr-2 text-pink-400" />
                <Label htmlFor="name" className="font-medium">Nome</Label>
              </div>
              <Input 
                id="name" 
                className="input-kawaii" 
                placeholder="Digite seu nome"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 mb-1">
                <Mail className="h-4 w-4 mr-2 text-pink-400" />
                <Label htmlFor="email" className="font-medium">Email</Label>
              </div>
              <Input 
                id="email" 
                type="email" 
                className="input-kawaii" 
                placeholder="seu.email@exemplo.com"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 mb-1">
                <Shield className="h-4 w-4 mr-2 text-pink-400" />
                <Label htmlFor="password" className="font-medium">Senha</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="input-kawaii" 
                placeholder="Digite sua nova senha"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 mb-1">
                <Palette className="h-4 w-4 mr-2 text-pink-400" />
                <Label htmlFor="theme" className="font-medium">Tema</Label>
              </div>
              <select 
                id="theme" 
                className="w-full p-2 border border-pink-200 rounded-lg input-kawaii bg-white"
              >
                <option value="light">Claro (Padrão)</option>
                <option value="kawaii">Kawaii Rosa</option>
                <option value="dark">Escuro</option>
              </select>
            </div>
            
            <Button 
              type="submit" 
              className="btn-kawaii w-full md:w-auto flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar alterações
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}