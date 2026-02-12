# Kitty - Plataforma de Adoção de Pets

Kitty é uma plataforma web full-stack para adoção de pets, qualquer usuário logado pode anunciar pets e receber solicitações diretamente.

## Status do Projeto
- **Status Geral:** Em fase P2P estável (funcional). Recomenda-se testes manuais finais.
- **Histórico do status original:** 95% completo na fase com abrigos; agora focado em P2P simples.

## Funcionalidades (mescla do original + P2P)
- Páginas públicas: Home e listagem `/pets` com busca/filtros e cards.
- Detalhe do pet: fotos, descrição, status. Botão “Solicitar Adoção” leva à página dedicada `/pets/[id]/adopt` (fluxo direto com o anunciante).
- Fluxo de adoção em página (não modal): formulário com mensagem para o anunciante e envio via `adoptionService`.
- Anúncio de pet: `/addpet` (inicia público, exige login no fluxo) com fotos, status e campos completos.
- Meus Pets: `/my-pets` para listar/gerenciar anúncios e `/my-pets/[id]/edit` para edição.
- Header público enxuto: **Meus Pets | Anunciar Pet | Configurações | Sair** (sem “Abrigos”, sem “Pets” redundante).
- Dashboard legacy: `/dashboard` e subpáginas (announce/requests/settings) permanecem para compatibilidade, mas sem role de abrigo.
- Ratings/estrelas removidos do detalhe do pet (não há sistema de avaliação).
- Modal de adoção removido por instabilidade; substituído por rota dedicada.

## Tecnologias Utilizadas (do original, permanecem válidas)
- **Frontend/Full-stack:** Next.js 16 (App Router, RSC), React 19, TypeScript
- **Estilização:** Tailwind CSS com design kawaii
- **Componentes UI:** shadcn/ui customizados (button, card, dialog, input, textarea, badge, avatar, skeleton, dropdown-menu, sheet, table, toast, select, etc.)
- **Forms/Validação:** Zod + React Hook Form (@hookform/resolvers/zod)
- **Data fetching/cache:** TanStack Query (React Query)
- **Helpers:** clsx + tailwind-merge (cn)
- **Backend/Serviços:** Next.js + Supabase SDKs (@supabase/supabase-js, @supabase/ssr)
- **Auth:** Supabase Auth (RLS); role padrão `adopter` no fluxo atual
- **DB:** PostgreSQL (Supabase) — tabelas users, pets, adoption_requests
- **Storage:** Supabase Storage para fotos
- **Realtime:** Supabase Realtime
- **Ícones:** Lucide React
- **Deploy alvo:** Vercel (edge runtime)

## Estrutura de Pastas (atual)
```
src/
├── app/
│   ├── (auth)/{login, signup, layout.tsx}
│   ├── (dashboard)/{announce-pet, requests, settings, page.tsx, layout.tsx}
│   ├── (public)/
│   │   └── pets/
│   │       ├── [id]/page.tsx
│   │       └── [id]/adopt/page.tsx    # fluxo de adoção em página
│   ├── my-pets/
│   │   ├── page.tsx
│   │   └── [id]/edit/page.tsx
│   ├── addpet/page.tsx
│   ├── account-settings/page.tsx
│   ├── logout/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/ui
├── lib/
│   └── auth/provider.tsx
├── services/{petService.ts, adoptionService.ts}
├── types/
└── ...
```

## Serviços principais
- `petService.ts`: CRUD de pets. **Compatibilidade:** ainda usa coluna `shelter_id` no DB, aliada como `user_id` no código. Ao migrar o schema, criar `user_id`, copiar dados e usar `user_id` direto, removendo `shelter_id`.
- `adoptionService.ts`: criação/listagem/atualização de solicitações de adoção.
- `lib/auth/provider.tsx`: AuthContext simplificado, role padrão `adopter` (sem shelter/admin no fluxo atual).

## Dependências (originais, válidas)
Principais:
```
npm install next@16.1.6 react@19.2.3 react-dom@19.2.3 \
  @supabase/supabase-js@^2.48.1 @supabase/ssr@^0.5.2 \
  @tanstack/react-query@^5.66.0 zod@^3.24.1 \
  @hookform/resolvers@^3.10.0 clsx@^2.1.1 tailwind-merge@^3.4.0 \
  sonner@^1.7.4 react-hook-form@^7.54.2 \
  class-variance-authority@^0.7.1 lucide-react@^0.563.0 radix-ui@^1.4.3
```
Dev:
```
npm install -D @tailwindcss/postcss@^4 @types/node@^20 @types/react@^19 \
  @types/react-dom@^19 eslint@^9 eslint-config-next@16.1.6 \
  shadcn-ui@^0.2.3 tailwindcss@^4 typescript@^5 tw-animate-css@^1.4.0
```

## Variáveis de ambiente
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Scripts
- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run start` — produção
- `npm run lint` — lint

## Execução
```bash
npm install
npm run dev
# acessar http://localhost:3000 (ou porta alternativa se outro dev estiver rodando)
```

## Migração de schema recomendada
- Hoje: `pets.shelter_id` é usado como alias `user_id`.
- Migrar: adicionar `user_id` em `pets`, copiar dados de `shelter_id`, ajustar `petService` para usar `user_id`, remover `shelter_id`.

## Remoção da funcionalidade abrigo e outros extras
- Removidos: roles/flows de abrigos, página de shelters, rating/estrelas de pet, modal de adoção.
- Adicionados: fluxo de adoção em página `/pets/[id]/adopt`, header enxuto, Meus Pets como rota pública, alias `shelter_id`→`user_id` para compatibilidade.

## Próximos passos sugeridos
- Migrar schema para `user_id` definitivo.
- Opcional: campo “histórico/condição do resgate” e flag “urgente”.
- Validar contato do anunciante (email/telefone) para dar confiança.
- Testes manuais nos fluxos `/pets/[id]/adopt`, `/my-pets`, `/addpet` pós-migração.
- Avaliar remover/ocultar dashboard legacy ou adaptá-lo ao P2P.

## Observações finais
- Adoção direta entre usuários (P2P), sem burocracia e sem abrigos no fluxo principal.
- Modal de adoção substituído por página para evitar problemas de posicionamento.
- Design kawaii mantido, responsivo, com shadcn/ui.
