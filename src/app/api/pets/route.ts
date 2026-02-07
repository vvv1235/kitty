import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Obter dados do corpo da requisição
    const petData = await request.json();
    
    // Configurar cliente do Supabase para servidor
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // O NextJs não permite setar cookies no server side
            }
          },
        },
      }
    );

    // Obter usuário autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' }, 
        { status: 401 }
      );
    }

    // Adicionar informações ao pet
    const newPet = {
      ...petData.formData,
      shelter_id: user.id,
      status: 'available',
      photos: petData.formData.photos || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Inserir pet no banco de dados
    const { data, error } = await supabase
      .from('pets')
      .insert([newPet])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar pet:', error);
      return NextResponse.json(
        { error: `Erro ao criar pet: ${error.message}` }, 
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na API de criação de pet:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}