/*
Definições de Tabelas para o Banco de Dados do Kitty

Esta documentação descreve a estrutura do banco de dados do Kitty para fins de referência.

1. Tabela: users
- id: uuid (PK)
- email: string
- role: enum ('adopter', 'shelter', 'admin')
- created_at: timestamp

2. Tabela: pets
- id: uuid (PK)
- name: string
- species: enum ('cat', 'dog', 'other')
- breed: string
- age: integer (em meses)
- size: enum ('small', 'medium', 'large')
- gender: enum ('male', 'female')
- color: string
- description: text
- vaccinated: boolean
- dewormed: boolean
- sterilized: boolean
- photos: json[] (URLs das fotos)
- shelter_id: uuid (FK para users)
- location: string
- status: enum ('available', 'reserved', 'adopted')
- created_at: timestamp
- updated_at: timestamp

3. Tabela: adoption_requests
- id: uuid (PK)
- pet_id: uuid (FK para pets)
- adopter_id: uuid (FK para users)
- status: enum ('pending', 'approved', 'rejected')
- message: text
- created_at: timestamp
- updated_at: timestamp

4. Tabela: pet_photos
- id: uuid (PK)
- pet_id: uuid (FK para pets)
- url: string
- is_primary: boolean
- created_at: timestamp

5. Policies de Segurança (RLS):
- users: cada usuário só pode ler/alterar seu próprio registro
- pets: abrigos só podem gerenciar seus próprios pets
- adoption_requests: adotantes só veem seus próprios pedidos, abrigos veem os pedidos para seus pets
*/

// Este arquivo serve apenas como documentação para as tabelas do banco de dados
// As tabelas reais devem ser criadas no painel do Supabase ou via migrations