# Kitty - Plataforma de Adoção de Animais

Kitty é uma plataforma web full-stack para adoção de gatos (e outros animais de estimação, como cães ou coelhos, mas com foco inicial em gatos). O objetivo principal é conectar adotantes com abrigos/ONGs, facilitando adoções responsáveis.

## Funcionalidades

### MVP Features
- **Páginas públicas**: Home com busca/filtros de pets disponíveis (espécie, porte, idade, cidade), grid de cards de pets com fotos e detalhes
- **Página de detalhe do pet**: Galeria de fotos, descrição, botão para solicitar adoção
- **Formulário de adoção**: Envia solicitação ao abrigo com dados do adotante
- **Dashboard do abrigo** (protegido): Gerenciar pets (adicionar, editar, deletar), ver e aprovar/rejeitar solicitações de adoção
- **Autenticação**: Multi-role (adotante, abrigo/shelter, admin opcional)
- **Outros**: Realtime updates (ex.: nova solicitação aparece no dashboard), upload de múltiplas fotos, PWA (instalável no celular), notificações básicas (toast de sucesso/erro)

## Tecnologias Utilizadas

### Stack Principal
- **Frontend e Full-Stack Framework**: Next.js 16 (App Router, React Server Components, Server Actions para forms e mutações)
- **Biblioteca base**: React 19
- **Tipagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes UI**: shadcn/ui (button, card, dialog, input, textarea, badge, avatar, skeleton, dropdown-menu, sheet, table, toast)
- **Validação e Forms**: Zod + React Hook Form (@hookform/resolvers/zod)
- **Fetching e Caching**: TanStack Query (React Query)
- **Helpers**: clsx + tailwind-merge (cn function para classes)
- **Backend e Serviços**: Next.js server-side + Supabase SDKs (@supabase/supabase-js e @supabase/ssr para SSR)
- **Autenticação**: Supabase Auth (com Row Level Security - RLS para multi-role)
- **Banco de Dados**: PostgreSQL (via Supabase, relacional para tabelas como pets, adoption_requests, users)
- **Storage**: Supabase Storage (upload e gerenciamento de fotos de pets)
- **Realtime**: Supabase Realtime (subscriptions para updates em tempo real)
- **Deploy**: Vercel (1-click, edge runtime, integração nativa com Supabase)

## Estrutura de Pastas

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── settings/
│   │   ├── announce-pet/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── (public)/
│   │   ├── pets/[id]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── logout/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
│   ├── auth/
│   ├── supabase/
│   └── utils.ts
├── types/
└── actions/
```

## Dependências Necessárias

### Dependências Principais
```bash
npm install next@16.1.6 react@19.2.3 react-dom@19.2.3 @supabase/supabase-js@^2.48.1 @supabase/ssr@^0.5.2 @tanstack/react-query@^5.66.0 zod@^3.24.1 @hookform/resolvers@^3.10.0 clsx@^2.1.1 tailwind-merge@^3.4.0 sonner@^1.7.4 react-hook-form@^7.54.2 class-variance-authority@^0.7.1 lucide-react@^0.563.0 radix-ui@^1.4.3
```

### Dependências de Desenvolvimento
```bash
npm install -D @tailwindcss/postcss@^4 @types/node@^20 @types/react@^19 @types/react-dom@^19 eslint@^9 eslint-config-next@16.1.6 shadcn-ui@^0.2.3 tailwindcss@^4 typescript@^5 tw-animate-css@^1.4.0
```

## Configurações Necessárias

### Variáveis de Ambiente (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Configurações do Supabase
Você precisará criar uma conta no Supabase e configurar:
- Tabelas para usuários, pets e solicitações de adoção
- Configurações de autenticação
- Políticas de segurança (RLS)
- Storage para imagens de pets

### Configuração do shadcn/ui
O projeto já está configurado com os componentes shadcn/ui:
- button
- card
- input
- label
- textarea
- dialog
- badge
- avatar
- skeleton
- dropdown-menu
- sheet
- table
- separator
- toast
- select

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria uma build de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter

## Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente no arquivo `.env.local`
4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
5. Acesse http://localhost:3000 no seu navegador

## Funcionalidades Implementadas

### Autenticação
- Sistema de login e cadastro com Supabase Auth
- Proteção de rotas baseada em papéis (roles)
- Contexto de autenticação React

### Páginas
- Página inicial com apresentação da plataforma
- Página de login com validação
- Página de cadastro com seleção de papel (adotante ou abrigo)
- Dashboard para abrigos
- Página de detalhes do pet
- Página de configurações
- Página para anunciar novo pet

### Componentes UI
- Componentes reutilizáveis seguindo os padrões shadcn/ui
- Design responsivo com Tailwind CSS
- Tipagem forte com TypeScript

## Próximos Passos

- Implementar o sistema completo de upload de fotos
- Desenvolver o formulário de solicitação de adoção
- Criar o sistema de gerenciamento de pets no dashboard
- Implementar notificações em tempo real
- Adicionar recursos de busca e filtros avançados
- Implementar sistema de avaliações e feedback

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Basta fazer um fork, criar uma branch com sua feature e enviar um pull request.