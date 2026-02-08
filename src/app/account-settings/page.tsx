'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth/provider';
import { User, Mail, Lock, MapPin, Users, Heart, Save, Camera } from 'lucide-react';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'adopter',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.email?.split('@')[0] || '', // Usar parte do email como nome se não tiver
        email: user.email || '',
        role: user.role,
        location: '' // Poderia vir de um perfil complementar
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      // Simular atualização de perfil
      console.log('Dados atualizados:', formData);
      
      // Aqui você faria a chamada para o serviço de atualização de usuário
      // await userService.updateUserProfile(user.id, formData);
      
      setTimeout(() => {
        setSuccessMessage('Perfil atualizado com sucesso!');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Falha ao atualizar o perfil. Por favor, tente novamente.');
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="card-kawaii text-center p-8">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Acesso não autorizado</h3>
            <p className="text-gray-600 mb-4">Faça login para acessar as configurações</p>
            <Button 
              onClick={() => window.location.href = '/login'}
              className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white"
            >
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600 flex items-center">
            <User className="h-8 w-8 mr-3" />
            Configurações da Conta
          </h1>
          <p className="text-gray-600 mt-2">Gerencie suas informações pessoais e preferências</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}

        <Card className="card-kawaii">
          <CardHeader>
            <CardTitle className="text-xl text-pink-600">Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-pink-400" />
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="input-kawaii"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-pink-400" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu.email@example.com"
                    className="input-kawaii"
                    readOnly // Email geralmente não é editável diretamente
                  />
                </div>

                {/* Papel */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-pink-400" />
                    Tipo de Conta
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)} disabled>
                    <SelectTrigger className="input-kawaii">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adopter">Adotante</SelectItem>
                      <SelectItem value="shelter">Abrigo</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Localização */}
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
                    placeholder="Cidade, Estado"
                    className="input-kawaii"
                  />
                </div>
              </div>

              {/* Foto de Perfil */}
              <div className="space-y-3">
                <Label className="flex items-center">
                  <Camera className="h-4 w-4 mr-2 text-pink-400" />
                  Foto de Perfil
                </Label>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-pink-200 flex items-center justify-center">
                      <span className="text-pink-600 font-bold text-lg">
                        {formData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <label className="absolute bottom-0 right-0 bg-pink-500 text-white rounded-full p-1 cursor-pointer hover:bg-pink-600 transition-colors">
                      <Camera className="h-4 w-4" />
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Clique na câmera para alterar sua foto</p>
                    <p className="text-xs text-gray-500">JPG, PNG até 2MB</p>
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-pink-400" />
                  Senha
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Deixe em branco para manter a senha atual"
                  className="input-kawaii"
                />
                <p className="text-xs text-gray-500">Digite uma nova senha apenas se quiser alterar a atual</p>
              </div>

              {/* Botões */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => window.history.back()}
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
                      Salvando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Seção de Segurança */}
        <Card className="card-kawaii mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-pink-600">Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-medium text-gray-800">Autenticação de dois fatores</h3>
                  <p className="text-sm text-gray-600">Adicione uma camada extra de segurança à sua conta</p>
                </div>
                <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                  Configurar
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">Sair de todos os dispositivos</h3>
                  <p className="text-sm text-gray-600">Desconectar de todos os outros dispositivos</p>
                </div>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  Sair de todos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}