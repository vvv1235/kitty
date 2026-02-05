# Guia Completo de Integração do Supabase no Projeto Kitty

Este guia irá te ajudar a configurar sua própria conta no Supabase e integrar ao projeto Kitty.

## Passo 1: Criar Conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com sua conta do Google ou crie uma conta com e-mail
4. Escolha um nome para seu projeto
5. Crie uma senha para o banco de dados
6. Selecione a região mais próxima de você
7. Clique em "Create new project"

## Passo 2: Obter Credenciais do Projeto

1. Após criar o projeto, espere alguns minutos enquanto o Supabase inicializa
2. Na página do seu projeto, clique em "Project Settings"
3. Copie as seguintes informações:
   - URL do projeto (PROJECT REF ou PROJECT URL)
   - Public Anonymous Key (começa com "eyJhb...")
4. Guarde essas credenciais em um lugar seguro

## Passo 3: Configurar Variáveis de Ambiente

1. No diretório raiz do seu projeto Kitty, crie ou edite o arquivo `.env.local`
2. Adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=cole_aqui_sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_aqui_seu_anon_key
```

Substitua pelos valores reais do seu projeto.

## Passo 4: Criar Tabelas no Banco de Dados

1. No painel do Supabase, clique em "Table Editor" no menu lateral
2. Clique em "New table" e crie as seguintes tabelas:

### Tabela: users
- id: UUID (Primary Key, default: gen_random_uuid())
- email: TEXT
- role: TEXT (Values: 'adopter', 'shelter', 'admin')
- created_at: TIMESTAMP WITH TIME ZONE (default: now())

### Tabela: pets
- id: UUID (Primary Key, default: gen_random_uuid())
- name: TEXT
- species: TEXT (Values: 'cat', 'dog', 'other')
- breed: TEXT
- age: INTEGER
- size: TEXT (Values: 'small', 'medium', 'large')
- gender: TEXT (Values: 'male', 'female')
- color: TEXT
- description: TEXT
- vaccinated: BOOLEAN
- dewormed: BOOLEAN
- sterilized: BOOLEAN
- photos: JSON
- shelter_id: UUID (Foreign Key para users.id)
- location: TEXT
- status: TEXT (Values: 'available', 'reserved', 'adopted')
- created_at: TIMESTAMP WITH TIME ZONE (default: now())
- updated_at: TIMESTAMP WITH TIME ZONE (default: now())

### Tabela: adoption_requests
- id: UUID (Primary Key, default: gen_random_uuid())
- pet_id: UUID (Foreign Key para pets.id)
- adopter_id: UUID (Foreign Key para users.id)
- status: TEXT (Values: 'pending', 'approved', 'rejected')
- message: TEXT
- created_at: TIMESTAMP WITH TIME ZONE (default: now())
- updated_at: TIMESTAMP WITH TIME ZONE (default: now())

## Passo 5: Configurar Policies de Segurança (RLS)

1. Para cada tabela, habilite Row Level Security (RLS):
   - Vá para "Table Editor"
   - Selecione a tabela
   - Clique em "Enable Row Level Security"

2. Crie as policies adequadas para cada tabela:
   - Para `users`: Usuários só podem ler/alterar seu próprio registro
   - Para `pets`: Abrigos só podem gerenciar seus próprios pets
   - Para `adoption_requests`: Adotantes só veem seus próprios pedidos, abrigos veem os pedidos para seus pets

## Passo 6: Configurar Storage (para fotos)

1. No painel do Supabase, vá para "Storage"
2. Crie um bucket chamado "pet-photos"
3. Configure as políticas de acesso para permitir uploads

## Passo 7: Testar a Conexão

1. Certifique-se de que o arquivo `.env.local` está configurado corretamente
2. Execute o projeto com `npm run dev`
3. Verifique se não há erros de conexão com o Supabase

## Passo 8: Popular com Dados de Exemplo (opcional)

Depois que tudo estiver configurado, você pode adicionar alguns dados de exemplo para testar o CRUD.

## Dicas Importantes:

- Sempre mantenha suas credenciais seguras e NUNCA as commite para o repositório público
- O Supabase oferece um plano gratuito que é suficiente para desenvolvimento
- Utilize o SQL Editor do Supabase para executar queries complexas se necessário
- Lembre-se de configurar autenticação se for usar a funcionalidade de login/logout

## Resolução de Problemas Comuns:

- Se aparecer erro de conexão, verifique se as variáveis de ambiente estão corretas
- Se não conseguir acessar os dados, verifique se as policies de RLS estão configuradas corretamente
- Para problemas com upload de fotos, verifique as configurações do Storage