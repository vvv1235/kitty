'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth/provider"
import { useRouter } from 'next/navigation'
import { Cat, Mail, Lock, Heart } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (loading) return

  setLoading(true)

  try {
    const { error } = await signIn(email, password)  // ou supabase.auth.signInWithPassword direto

    if (error) throw error

    // Força refresh server-side + redireciona
    router.refresh()  // ← CRUCIAL: atualiza middleware com sessão nova
    router.push('/pets')  // ou '/dashboard'
  } catch (error: any) {
    alert(error.message || 'Erro ao fazer login')
  } finally {
    setLoading(false)  // sempre desliga loading
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
          <CardTitle className="text-2xl font-bold text-pink-600">Login no Kitty</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white px-4 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-2" />
                  {loading ? 'Entrando...' : 'Entrar'}
                </div>
              )}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Não tem conta?{' '}
            <Link href="/signup" className="text-pink-500 hover:text-pink-700 font-medium underline">
              Cadastre-se
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}