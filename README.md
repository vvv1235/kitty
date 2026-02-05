# Kitty - Plataforma de Adoção de Animais

Kitty é uma plataforma web full-stack para adoção de gatos (e outros animais de estimação, como cães ou coelhos, mas com foco inicial em gatos). O objetivo principal é conectar adotantes com abrigos/ONGs, facilitando adoções responsáveis. O design é "kawaii" com fundo branco, detalhes rosas e animações de gatinhos para criar uma experiência fofa e acolhedora.

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
- **Estilização**: Tailwind CSS com design kawaii
- **Componentes UI**: shadcn/ui customizados (button, card, dialog, input, textarea, badge, avatar, skeleton, dropdown-menu, sheet, table, toast)
- **Validação e Forms**: Zod + React Hook Form (@hookform/resolvers/zod)
- **Fetching e Caching**: TanStack Query (React Query)
- **Helpers**: clsx + tailwind-merge (cn function para classes)
- **Backend e Serviços**: Next.js server-side + Supabase SDKs (@supabase/supabase-js e @supabase/ssr para SSR)
- **Autenticação**: Supabase Auth (com Row Level Security - RLS para multi-role)
- **Banco de Dados**: PostgreSQL (via Supabase, relacional para tabelas como pets, adoption_requests, users)
- **Storage**: Supabase Storage (upload e gerenciamento de fotos de pets)
- **Realtime**: Supabase Realtime (subscriptions para updates em tempo real)
- **Ícones**: Lucide React
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

### Design Kawaii
- **Paleta de cores rosa-laranja** para criar uma estética fofa e acolhedora
- **Elementos decorativos** como gatinhos (🐱), patinhas (🐾) e corações (💕) em posições estratégicas
- **Animações suaves** como bounce e float para elementos visuais
- **Cards com design arredondado** e sombras suaves
- **Botões com gradientes rosa-laranja** e efeitos hover
- **Elementos de fundo** com padrões delicados e cores pastel

### Autenticação
- Sistema de login e cadastro com Supabase Auth
- Proteção de rotas baseada em papéis (roles)
- Contexto de autenticação React

### Páginas
- **Página inicial**: Design kawaii com gradiente rosa, botões com efeitos hover e elementos decorativos de gatinhos
- **Página de login**: Estilo kawaii com gradiente rosa-laranja nos botões, elementos decorativos e design consistente com a identidade visual
- **Página de cadastro**: Estilo kawaii com gradiente rosa-laranja nos botões, elementos decorativos e design consistente com a identidade visual
- **Layout de autenticação**: Atualizado para combinar com as cores kawaii do projeto (rosa e laranja)
- **Dashboard para abrigos**: Design colorido com cards kawaii e ícones representativos
- **Página de detalhes do pet**: Layout organizado com destaque para o animal e botões com estilo kawaii
- **Página de configurações**: Interface amigável com elementos kawaii
- **Página para anunciar novo pet**: Formulário com design kawaii e elementos visuais fofos

### Componentes UI
- Componentes reutilizáveis seguindo os padrões shadcn/ui
- Design responsivo com Tailwind CSS
- Tipagem forte com TypeScript
- Estilos kawaii aplicados a botões, cards, inputs e outros elementos

## O que Falta Implementar

- **Sistema completo de upload de fotos**: Integração com Supabase Storage para upload de múltiplas fotos de pets
- **Formulário de solicitação de adoção**: Desenvolvimento do formulário completo com validações
- **Sistema de gerenciamento de pets no dashboard**: CRUD completo para gerenciamento de animais
- **Notificações em tempo real**: Implementação de sistema de notificações usando Supabase Realtime
- **Recursos de busca e filtros avançados**: Sistema completo de filtragem de pets
- **Sistema de avaliações e feedback**: Sistema para avaliações de adoções
- **Integração com mapas**: Visualização de localização de abrigos
- **Sistema de mensagens**: Comunicação entre adotantes e abrigos

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Basta fazer um fork, criar uma branch com sua feature e enviar um pull request.