import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // @ts-ignore - workaround for type issue
          return cookieStore.getAll ? cookieStore.getAll() : [];
        },
        setAll(cookiesToSet: any[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              // @ts-ignore - workaround for type issue
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            console.error('Error setting cookies:', error);
          }
        },
      },
    }
  );
};