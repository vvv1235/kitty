'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreatePetInput } from '@/types/pet';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/provider';
import { Cat, PawPrint, Calendar, Users, Heart, MapPin, Upload, Save, X } from "lucide-react"
import { petService } from '@/services/petService';

export default function AnnouncePet() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<CreatePetInput>({
    name: '',
    species: 'cat',
    breed: '',
    age: 0,
    size: 'small',
    gender: 'male',
    color: '',
    description: '',
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    location: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: keyof CreatePetInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...filesArray]);
      
      // Criar pré-visualizações das imagens
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removePhoto = (index: number) => {
    // Remover a pré-visualização
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
    
    // Revogar a URL de objeto para liberar memória
    URL.revokeObjectURL(previewUrls[index]);
    
    // Remover o arquivo do array
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    if (!user) {
      setError('Você precisa estar logado para anunciar um pet');
      setSaving(false);
      return;
    }
    
    try {
      // Primeiro criar o pet
      const newPet = await petService.createPet(formData, user.id);
      
      // Se houver fotos para upload, fazer o upload
      if (photos.length > 0) {
        const uploadedUrls = await petService.uploadPetPhotos(photos, newPet.id);
        
        // Atualizar o pet com as URLs das fotos
        await petService.updatePet(newPet.id, { 
          photos: uploadedUrls 
        });
      }
      
      alert('Pet anunciado com sucesso!');
      router.push('/dashboard/my-pets'); // Redireciona para a lista de pets
    } catch (err) {
      console.error('Error creating pet:', err);
      setError('Falha ao anunciar o pet. Por favor, tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-pink-100 rounded-full p-3 mr-4">
            <Cat className="h-6 w-6 text-pink-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Anunciar Novo Pet</h1>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        
        <Card className="card-kawaii">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Informações do Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <PawPrint className="h-4 w-4 mr-2 text-pink-400" />
                    Nome
                  </Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="input-kawaii" 
                    placeholder="Ex: Fluffy"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="species" className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-pink-400" />
                    Espécie
                  </Label>
                  <Select 
                    value={formData.species} 
                    onValueChange={(value: 'cat' | 'dog' | 'other') => handleSelectChange('species', value)}
                  >
                    <SelectTrigger className="input-kawaii">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cat">Gato</SelectItem>
                      <SelectItem value="dog">Cachorro</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="breed">Raça</Label>
                  <Input 
                    id="breed" 
                    name="breed" 
                    value={formData.breed} 
                    onChange={handleChange} 
                    className="input-kawaii" 
                    placeholder="Ex: Vira-lata"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-pink-400" />
                    Idade (meses)
                  </Label>
                  <Input 
                    id="age" 
                    name="age" 
                    type="number" 
                    value={formData.age} 
                    onChange={handleChange} 
                    className="input-kawaii" 
                    placeholder="Ex: 12"
                    min="0"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Porte</Label>
                  <Select 
                    value={formData.size} 
                    onValueChange={(value: 'small' | 'medium' | 'large') => handleSelectChange('size', value)}
                  >
                    <SelectTrigger className="input-kawaii">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequeno</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value: 'male' | 'female') => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger className="input-kawaii">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Macho</SelectItem>
                      <SelectItem value="female">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color">Cor</Label>
                  <Input 
                    id="color" 
                    name="color" 
                    value={formData.color} 
                    onChange={handleChange} 
                    className="input-kawaii" 
                    placeholder="Ex: Tricolor"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                    Localização
                  </Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    className="input-kawaii" 
                    placeholder="Ex: Manaus, AM"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-pink-400" />
                    Informações de Saúde
                  </Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="vaccinated"
                        name="vaccinated"
                        checked={formData.vaccinated}
                        onChange={handleChange}
                        className="checkbox-kawaii mr-2"
                      />
                      <Label htmlFor="vaccinated">Vacinado</Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dewormed"
                        name="dewormed"
                        checked={formData.dewormed}
                        onChange={handleChange}
                        className="checkbox-kawaii mr-2"
                      />
                      <Label htmlFor="dewormed">Vermifugado</Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sterilized"
                        name="sterilized"
                        checked={formData.sterilized}
                        onChange={handleChange}
                        className="checkbox-kawaii mr-2"
                      />
                      <Label htmlFor="sterilized">Esterilizado</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-pink-400" />
                  Descrição
                </Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  className="input-kawaii" 
                  placeholder="Descreva o pet, sua personalidade, hábitos, etc..."
                  rows={4}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Upload className="h-4 w-4 mr-2 text-pink-400" />
                  Fotos
                </Label>
                <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 text-center cursor-pointer bg-pink-50 hover:bg-pink-100 transition-colors">
                  <input 
                    id="photos" 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handlePhotoUpload}
                    className="hidden" 
                  />
                  <label htmlFor="photos" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-12 w-12 text-pink-400 mb-2" />
                      <p className="text-gray-600 mb-1">Clique para selecionar fotos ou arraste para cá</p>
                      <p className="text-sm text-gray-500">Suporte para JPG, PNG (máximo 5MB cada)</p>
                    </div>
                  </label>
                </div>
                
                {previewUrls.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Fotos selecionadas:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {previewUrls.map((previewUrl, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={previewUrl} 
                            alt={`Pré-visualização ${index + 1}`} 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.push('/dashboard/my-pets')}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white flex items-center"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Anunciando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Anunciar Pet
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}