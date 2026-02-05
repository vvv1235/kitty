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
    // Check active session
    checkUserSession();

    // Set up real-time authentication listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const userData = await getUserData(session?.user.id);
          if (userData) {
            setUser(userData);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
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
      console.error('Error fetching user data:', error);
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

    // Create user profile in the database
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
        ]);

      if (profileError) {
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

    const userData = await getUserData(data.user.id);
    if (userData) {
      setUser(userData);
    }

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