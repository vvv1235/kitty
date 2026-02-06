'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth/provider"
import { useRouter } from 'next/navigation'
import { Cat, User, Mail, Lock, Heart } from "lucide-react"

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'adopter' | 'shelter'>('adopter')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return; // Prevenir múltiplos cliques
    
    setLoading(true)
    
    try {
      await signUp(email, password, name, role)
      // Esperar um pouco para garantir que o usuário foi criado no banco de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirecionar para a página de pets após cadastro
      window.location.href = '/pets'; // Redirecionar via window.location para evitar possíveis loops com o router
    } catch (error: any) {
      alert(error.message || 'Erro ao criar conta')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <div className="kitten-corner tl">🐱</div>
      <div className="kitten-corner tr">🐾</div>
      <div className="kitten-corner bl">💕</div>
      <div className="kitten-corner br">🐾</div>
      
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-pink-600 hover:text-pink-800 font-bold text-lg">
          Kitty
        </Link>
      </div>
      
      <Card className="w-full max-w-md p-6 card-kawaii relative">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-2">
            <div className="bg-pink-100 rounded-full p-3 inline-block animate-bounce">
              <Cat className="h-8 w-8 text-pink-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-pink-600">Cadastro no Kitty</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <User className="h-4 w-4 mr-1 text-pink-400" />
                <Label htmlFor="name">Nome</Label>
              </div>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="input-kawaii"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Mail className="h-4 w-4 mr-1 text-pink-400" />
                <Label htmlFor="email">Email</Label>
              </div>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="input-kawaii"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Lock className="h-4 w-4 mr-1 text-pink-400" />
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="input-kawaii"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Heart className="h-4 w-4 mr-1 text-pink-400" />
                <Label htmlFor="role">Tipo de usuário</Label>
              </div>
              <Select value={role} onValueChange={(value: 'adopter' | 'shelter') => setRole(value)}>
                <SelectTrigger className="input-kawaii">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adopter">Adotante</SelectItem>
                  <SelectItem value="shelter">Abrigo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white px-4 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Criando conta...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Cadastrar
                </div>
              )}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Já tem conta?{' '}
            <Link href="/login" className="text-pink-500 hover:text-pink-700 font-medium underline">
              Entre
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}