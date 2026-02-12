'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect, createContext, useContext } from 'react'

interface User {
  id: string
  email: string | null
  role?: 'adopter' | 'admin' | null
  created_at: string
}

interface AuthContextType {
  user: User | null
  signUp: (email: string, password: string, name: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    let isMounted = true

    checkUserSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user?.id) {
          const userData = await getUserData(session.user.id)
          if (userData && isMounted) {
            setUser(userData)
          }
        }
      } else if (event === 'SIGNED_OUT') {
        if (isMounted) {
          setUser(null)
        }
      }

      if (isLoading && isMounted) {
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const checkUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.user) {
      const userData = await getUserData(session.user.id)
      if (userData) {
        setUser(userData)
      }
    }

    setIsLoading(false)
  }

  const getUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, created_at')
      .eq('id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        const { data: authUser, error: authError } = await supabase.auth.getUser()
        if (!authError && authUser.user) {
          const userEmail = authUser.user.email
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: userId,
                email: userEmail || '',
                role: 'adopter',
                created_at: new Date().toISOString(),
              },
            ])
          if (insertError) {
            console.error('Error creating user profile:', insertError)
            return null
          }

          const { data: newData, error: newError } = await supabase
            .from('users')
            .select('id, email, role, created_at')
            .eq('id', userId)
            .single()

          if (newError) {
            console.error('Error fetching user data after creation:', newError)
            return null
          }

          return newData as User
        }
      } else {
        console.warn('Não foi possível carregar os dados do usuário (users). O usuário continuará como null.', error)
      }
      return null
    }

    return data as User
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'adopter',
        },
      },
    })

    if (error) throw error

    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email,
            role: 'adopter',
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (profileError && profileError.code !== '23505') {
        console.error('Error creating user profile:', profileError)
      }
    }

    return data
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    signUp,
    signIn,
    signOut,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
