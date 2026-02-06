'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Cat, Dog, Heart, MapPin, Calendar, Users, Upload, X } from 'lucide-react';

export default function AddPetPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    species: 'cat',
    breed: '',
    age: '',
    gender: 'male',
    location: '',
    description: '',
    vaccinated: false,
    dewormed: false,
    sterilized: false,
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      // Simular upload de fotos
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos(prev => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular envio do formulário
      console.log('Dados do pet:', formData);
      console.log('Fotos:', photos);
      
      // Aqui você faria a chamada para o serviço de criação de pet
      // await petService.createPet(formData, photos);
      
      alert('Pet anunciado com sucesso!');
      router.push('/pets'); // Redirecionar para a lista de pets
    } catch (error) {
      console.error('Erro ao anunciar pet:', error);
      alert('Falha ao anunciar o pet. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600 flex items-center">
            <Cat className="h-8 w-8 mr-3" />
            Anunciar Novo Pet
          </h1>
          <p className="text-gray-600 mt-2">Ajude um pet a encontrar um lar cheio de amor</p>
        </div>

        <Card className="card-kawaii">
          <CardHeader>
            <CardTitle className="text-xl text-pink-600">Informações do Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Pet *</Label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Mia"
                      className="pl-10 input-kawaii"
                      required
                    />
                  </div>
                </div>

                {/* Espécie */}
                <div className="space-y-2">
                  <Label>Animal *</Label>
                  <Select value={formData.species} onValueChange={(value) => handleSelectChange('species', value)}>
                    <SelectTrigger className="input-kawaii">
                      <SelectValue placeholder="Selecione a espécie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cat">Gato</SelectItem>
                      <SelectItem value="dog">Cachorro</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Raça */}
                <div className="space-y-2">
                  <Label htmlFor="breed">Raça</Label>
                  <Input
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="Ex: Siamês, Vira-lata"
                    className="input-kawaii"
                  />
                </div>

                {/* Idade */}
                <div className="space-y-2">
                  <Label htmlFor="age">Idade (meses) *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Ex: 6"
                      className="pl-10 input-kawaii"
                      required
                    />
                  </div>
                </div>

                {/* Gênero */}
                <div className="space-y-2">
                  <Label>Gênero *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                    <SelectTrigger className="input-kawaii">
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Macho</SelectItem>
                      <SelectItem value="female">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Localização */}
                <div className="space-y-2">
                  <Label htmlFor="location">Localização *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-pink-400" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Ex: São Paulo, SP"
                      className="pl-10 input-kawaii"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre o pet, sua personalidade, hábitos, etc."
                  className="input-kawaii min-h-[120px]"
                  required
                />
              </div>

              {/* Status de saúde */}
              <div className="space-y-3">
                <Label>Status de Saúde</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* Fotos */}
              <div className="space-y-3">
                <Label>Fotos do Pet</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-pink-300 rounded-xl cursor-pointer bg-pink-50 hover:bg-pink-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-pink-400 mb-2" />
                        <p className="text-sm text-gray-500">Clique para enviar fotos</p>
                        <p className="text-xs text-gray-400">PNG, JPG até 5MB</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        multiple 
                        onChange={handleFileUpload} 
                      />
                    </label>
                  </div>

                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={photo} 
                            alt={`Foto ${index + 1}`} 
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
                  )}
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleCancel}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white px-6"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Anunciar Pet
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}