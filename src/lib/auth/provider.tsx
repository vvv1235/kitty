'use client'

import { createClient } from '@/lib/supabase/client';
import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string | null;
  role: 'adopter' | 'shelter' | 'admin';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, name: string, role: 'adopter' | 'shelter') => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true; // Flag para verificar se o componente ainda está montado

    // Check active session
    checkUserSession();

    // Set up real-time authentication listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return; // Previne atualizações após desmontagem
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user?.id) {
            const userData = await getUserData(session.user.id);
            if (userData && isMounted) {
              setUser(userData);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          if (isMounted) {
            setUser(null);
          }
        }
        // Só definimos isLoading como false se ainda estiver carregando
        if (isLoading && isMounted) {
          setIsLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const userData = await getUserData(session.user.id);
      if (userData) {
        setUser(userData);
      }
    }
    
    setIsLoading(false);
  };

  const getUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, created_at')
      .eq('id', userId)
      .single();

    if (error) {
      // Se o usuário não for encontrado, ele pode ser um usuário recém-criado
      // Vamos tentar buscar os dados básicos do auth e criar o perfil automaticamente
      if (error.code === 'PGRST116') { // Record not found
        console.warn('User profile not found in public.users, attempting to create...');
        
        // Buscar dados do usuário no auth
        const { data: authUser, error: authError } = await supabase.auth.getUser();
        if (!authError && authUser.user) {
          const userEmail = authUser.user.email;
          
          // Criar perfil de usuário com role padrão 'adopter'
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: userId,
                email: userEmail || '',
                role: 'adopter',
                created_at: new Date().toISOString()
              }
            ]);
            
          if (insertError) {
            console.error('Error creating user profile:', insertError);
            return null;
          }
          
          // Agora buscar novamente os dados recém-criados
          const { data: newData, error: newError } = await supabase
            .from('users')
            .select('id, email, role, created_at')
            .eq('id', userId)
            .single();
            
          if (newError) {
            console.error('Error fetching user data after creation:', newError);
            return null;
          }
          
          return newData as User;
        }
      } else {
        console.error('Error fetching user data:', error);
      }
      return null;
    }

    return data as User;
  };

  const signUp = async (email: string, password: string, name: string, role: 'adopter' | 'shelter') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    });

    if (error) {
      throw error;
    }

    // Create user profile in the database if it doesn't exist
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email,
            role,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single(); // Use .select().single() to avoid errors if user already exists

      if (profileError && profileError.code !== '23505') { // 23505 is unique violation
        console.error('Error creating user profile:', profileError);
      }
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    // O estado será atualizado pelo listener de autenticação
    // Não é necessário esperar aqui, pois o listener já cuida disso
    
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    setUser(null);
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}