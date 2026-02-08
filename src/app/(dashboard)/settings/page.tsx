'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cat, User, Mail, Save, Shield, Palette, Bell, MapPin } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/lib/auth/provider'

export default function Settings() {
  const { user } = useAuth()

  // Estados locais apenas para UX; integrar com backend depois
  const [name, setName] = useState('')
  const [email, setEmail] = useState(user?.email ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [theme, setTheme] = useState<'light' | 'kawaii' | 'dark'>('kawaii')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [location, setLocation] = useState('')

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Configurações de perfil salvas (mock).')
  }

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Senha atualizada (mock).')
  }

  const handleSubmitPreferences = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Preferências salvas (mock).')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header igual ao /addpet */}
        <div className="flex items-center mb-8">
          <div className="bg-pink-100 rounded-full p-3 mr-4">
            <Cat className="h-6 w-6 text-pink-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Configurações da Conta</h1>
        </div>

        <Card className="card-kawaii">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <User className="h-5 w-5 mr-2 text-pink-400" />
              Dados da conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Bloco 1: Informações básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-pink-400" />
                    Nome
                  </Label>
                  <Input
                    id="name"
                    className="input-kawaii"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-pink-400" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="input-kawaii"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                    Localização
                  </Label>
                  <Input
                    id="location"
                    className="input-kawaii"
                    placeholder="Ex: Manaus, AM"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-pink-400" />
                    Tipo de conta
                  </Label>
                  <Input
                    readOnly
                    className="input-kawaii bg-gray-50"
                    value={user?.role === 'shelter' ? 'Abrigo / ONG' : user?.role === 'adopter' ? 'Adotante' : 'Admin'}
                  />
                </div>
              </div>

              {/* Bloco 2: Segurança (senha) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-pink-400" />
                    Senha atual
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="input-kawaii"
                    placeholder="Digite sua senha atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="input-kawaii"
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="input-kawaii"
                    placeholder="Confirme a nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Bloco 3: Preferências (tema, notificações) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="theme" className="flex items-center">
                    <Palette className="h-4 w-4 mr-2 text-pink-400" />
                    Tema
                  </Label>
                  <select
                    id="theme"
                    className="w-full p-2 border border-pink-200 rounded-lg input-kawaii bg-white"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as typeof theme)}
                  >
                    <option value="light">Claro (padrão)</option>
                    <option value="kawaii">Kawaii Rosa</option>
                    <option value="dark">Escuro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Bell className="h-4 w-4 mr-2 text-pink-400" />
                    Notificações por email
                  </Label>
                  <div className="flex items-center justify-between border border-pink-100 rounded-xl px-3 py-2 bg-pink-50/60">
                    <p className="text-sm text-gray-700 mr-4">
                      Receba alertas sobre novas solicitações de adoção.
                    </p>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                  onClick={() => {
                    // reset mock
                    setName('')
                    setEmail(user?.email ?? '')
                    setLocation('')
                    setCurrentPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white flex items-center"
                  onClick={() => {
                    handleSubmitProfile(new Event('submit') as any)
                    handleSubmitPassword(new Event('submit') as any)
                    handleSubmitPreferences(new Event('submit') as any)
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar alterações
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
