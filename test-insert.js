// Script para testar a inserção de um pet no banco de dados
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  try {
    console.log('Testando inserção de pet...');
    
    // Testar com um ID de usuário conhecido (o que apareceu no teste anterior)
    const testUserId = 'cf970d96-8b74-426e-a03d-b32f77cc51fa'; // ID do usuário retornado no teste anterior
    
    // Dados de teste para inserção
    const newPet = {
      name: 'Test Pet',
      species: 'cat',
      breed: 'Test Breed',
      age: 12,
      size: 'small',
      gender: 'male',
      color: 'brown',
      description: 'This is a test pet for debugging purposes',
      vaccinated: true,
      dewormed: true,
      sterilized: false,
      photos: [],
      shelter_id: testUserId, // ID do usuário de teste
      location: 'Test Location',
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Inserindo dados:', newPet);
    
    const { data, error } = await supabase
      .from('pets')
      .insert([newPet])
      .select()
      .single();
    
    if (error) {
      console.log('Erro ao inserir pet:', error.message);
      console.log('Detalhes do erro:', error);
    } else {
      console.log('Pet inserido com sucesso!');
      console.log('Dados retornados:', data);
    }
  } catch (err) {
    console.error('Erro geral na inserção:', err);
  }
}

testInsert();