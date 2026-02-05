import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cat, PawPrint, Image, Calendar, Users, Heart, Home } from "lucide-react"

export default function AnnouncePet() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-pink-100 rounded-full p-3 mr-4">
            <Cat className="h-6 w-6 text-pink-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Anunciar Novo Pet</h1>
        </div>
        
        <div className="bg-white rounded-2xl p-6 card-kawaii">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-gray-700 mb-1">
                  <PawPrint className="h-4 w-4 mr-2 text-pink-400" />
                  <Label htmlFor="name" className="font-medium">Nome do pet</Label>
                </div>
                <Input 
                  id="name" 
                  className="input-kawaii" 
                  placeholder="Ex: Fluffy"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-700 mb-1">
                  <Heart className="h-4 w-4 mr-2 text-pink-400" />
                  <Label htmlFor="species" className="font-medium">Espécie</Label>
                </div>
                <Select>
                  <SelectTrigger className="input-kawaii">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="dog">Cão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-gray-700 mb-1">
                  <Calendar className="h-4 w-4 mr-2 text-pink-400" />
                  <Label htmlFor="age" className="font-medium">Idade</Label>
                </div>
                <Input 
                  id="age" 
                  type="number"
                  className="input-kawaii" 
                  placeholder="Ex: 2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-700 mb-1">
                  <Users className="h-4 w-4 mr-2 text-pink-400" />
                  <Label htmlFor="size" className="font-medium">Porte</Label>
                </div>
                <Select>
                  <SelectTrigger className="input-kawaii">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 mb-1">
                <Heart className="h-4 w-4 mr-2 text-pink-400" />
                <Label htmlFor="description" className="font-medium">Descrição</Label>
              </div>
              <Textarea 
                id="description" 
                className="input-kawaii" 
                placeholder="Descreva o pet, sua personalidade, hábitos, etc..."
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 mb-1">
                <Image className="h-4 w-4 mr-2 text-pink-400" />
                <Label htmlFor="photos" className="font-medium">Fotos</Label>
              </div>
              <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center cursor-pointer bg-pink-50 hover:bg-pink-100 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Image className="h-12 w-12 text-pink-400 mb-2" />
                  <p className="text-gray-600 mb-1">Arraste fotos aqui ou clique para selecionar</p>
                  <p className="text-sm text-gray-500">Suporte para JPG, PNG (máximo 5MB)</p>
                </div>
                <Input 
                  id="photos" 
                  type="file" 
                  multiple 
                  className="hidden" 
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="btn-kawaii w-full md:w-auto flex items-center justify-center"
            >
              <Home className="h-4 w-4 mr-2" />
              Anunciar pet
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}