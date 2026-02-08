import { createClient } from '@supabase/supabase-js';

// Script para verificar se o bucket de storage está configurado corretamente
async function checkStorageConfiguration() {
  console.log('🔍 Verificando configuração do Supabase Storage...');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Variáveis de ambiente do Supabase não configuradas');
    console.log('💡 Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Testar se o bucket existe e está acessível
    console.log('⏳ Testando acesso ao bucket "pet-photos"...');
    
    const { data, error } = await supabase
      .storage
      .from('pet-photos')
      .list('', { limit: 1 });

    if (error) {
      if (error.message.includes('Bucket not found')) {
        console.error('❌ Bucket "pet-photos" não encontrado');
        console.log('💡 Crie o bucket no painel do Supabase seguindo as instruções em SETUP_STORAGE.md');
      } else {
        console.error('❌ Erro ao acessar o bucket:', error.message);
        console.log('💡 Verifique as políticas de segurança do bucket');
      }
      return;
    }

    console.log('✅ Bucket "pet-photos" está acessível');
    console.log('✅ Configuração de storage está correta!');
    console.log('\n🚀 O sistema de upload de fotos está pronto para uso!');
  } catch (err: any) {
    console.error('❌ Erro inesperado:', err.message);
  }
}

// Executar a verificação
checkStorageConfiguration().catch(console.error);