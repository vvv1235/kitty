'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pet, UpdatePetInput } from '@/types/pet';
import { useAuth } from '@/lib/auth/provider';
import { useRouter } from 'next/navigation';
import { Cat, Dog, Heart, MapPin, Calendar, Users, Save, X, Upload } from 'lucide-react';
import { petService } from '@/services/petService';
import { uploadPetPhotos } from '@/utils/file-upload';

export default function EditPet({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<UpdatePetInput>({
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
  const [status, setStatus] = useState<'available' | 'reserved' | 'adopted'>('available');
  const [photos, setPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPet() {
      try {
        const petData = await petService.getPetById(params.id);
        if (petData) {
          setPet(petData);
          setFormData({
            name: petData.name,
            species: petData.species,
            breed: petData.breed,
            age: petData.age,
            size: petData.size,
            gender: petData.gender,
            color: petData.color,
            description: petData.description,
            vaccinated: petData.vaccinated,
            dewormed: petData.dewormed,
            sterilized: petData.sterilized,
            location: petData.location,
          });
          setStatus(petData.status);
          setPhotos(petData.photos || []);
        } else {
          setError('Pet não encontrado');
        }
      } catch (err) {
        console.error('Error fetching pet:', err);
        setError('Falha ao carregar o pet. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    fetchPet();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: keyof UpdatePetInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (value: 'available' | 'reserved' | 'adopted') => {
    setStatus(value);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewPhotos(prev => [...prev, ...filesArray]);
      
      // Pré-visualização das imagens
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removePhoto = (index: number) => {
    // Remover pré-visualização
    const newPhotosArray = [...photos];
    newPhotosArray.splice(index, 1);
    setPhotos(newPhotosArray);
    
    // Se for uma imagem nova, remover do array de novas imagens
    if (index >= (photos.length - newPhotos.length) && index < photos.length) {
      const newNewPhotos = [...newPhotos];
      newNewPhotos.splice(index - (photos.length - newPhotos.length), 1);
      setNewPhotos(newNewPhotos);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Atualizar os dados do pet
      const updatedPet = await petService.updatePet(params.id, { ...formData, status });
      
      // Se houver novas fotos para upload
      if (newPhotos.length > 0 && user?.id) {
        // Fazer upload das novas fotos usando a função de utilitário
        const uploadResult = await uploadPetPhotos(newPhotos, params.id);
        
        if (uploadResult.success) {
          // Atualizar novamente com as novas URLs de fotos
          await petService.updatePet(params.id, { 
            ...formData, 
            status,
            photos: [...(updatedPet.photos || []), ...uploadResult.urls!]
          });
        } else {
          throw new Error(uploadResult.error || 'Falha no upload de fotos');
        }
      } else {
        // Se não houver novas fotos, apenas atualizar os dados
        await petService.updatePet(params.id, { ...formData, status });
      }
      
      alert('Pet atualizado com sucesso!');
      router.push('/my-pets');
    } catch (err: any) {
      console.error('Error updating pet:', err);
      alert(`Falha ao atualizar o pet. ${err.message || 'Por favor, tente novamente.'}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="card-kawaii text-center p-8">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar pet</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => router.back()}
              className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white"
            >
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="card-kawaii text-center p-8">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pet não encontrado</h3>
            <p className="text-gray-600 mb-4">O pet que você está tentando editar não existe ou você não tem permissão para editá-lo.</p>
            <Button 
              onClick={() => router.push('/pets')}
              className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white"
            >
              Voltar para Meus Pets
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-pink-100 rounded-full p-3 mr-4">
            <Cat className="h-6 w-6 text-pink-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Editar Pet</h1>
        </div>
        
        <Card className="card-kawaii">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Informações do Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <Cat className="h-4 w-4 mr-2 text-pink-400" />
                    Nome
                  </Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="input-kawaii" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="species" className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-pink-400" />
                    Espécie
                  </Label>
                  <Select 
                    value={formData.species || 'cat'} 
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
                    value={formData.breed || ''} 
                    onChange={handleChange} 
                    className="input-kawaii" 
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
                    min="0"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Porte</Label>
                  <Select 
                    value={formData.size || 'small'} 
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
                    value={formData.gender || 'male'} 
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
                    value={formData.color || ''} 
                    onChange={handleChange} 
                    className="input-kawaii" 
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
                    value={formData.location || ''} 
                    onChange={handleChange} 
                    className="input-kawaii" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={status} 
                    onValueChange={handleStatusChange as (value: string) => void}
                  >
                    <SelectTrigger className="input-kawaii">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponível</SelectItem>
                      <SelectItem value="reserved">Reservado</SelectItem>
                      <SelectItem value="adopted">Adotado</SelectItem>
                    </SelectContent>
                  </Select>
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
                  value={formData.description || ''} 
                  onChange={handleChange} 
                  className="input-kawaii" 
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
                
                {photos.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Fotos carregadas:</h4>
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
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.push('/my-pets')}
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
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </>
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