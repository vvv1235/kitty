# Configuração do Supabase Storage para Upload de Fotos

Para que o sistema de upload de fotos funcione corretamente, é necessário configurar o bucket de armazenamento no painel do Supabase.

## Passos Necessários:

### 1. Criar o bucket no Supabase Storage
1. Acesse o [painel do Supabase](https://supabase.com/dashboard)
2. Vá até a seção "Storage" no menu lateral
3. Clique em "Buckets"
4. Clique em "New bucket"
5. Preencha:
   - Name: `pet-photos`
   - Public: Marque como "true" (para permitir acesso público às imagens)
6. Clique em "Create bucket"

### 2. Configurar Policies de Segurança
Após criar o bucket, configure as políticas de acesso:

1. Na seção "Storage", clique em "Policies"
2. Clique em "Configure policies from scratch"
3. Adicione as seguintes policies:

```sql
-- Policy para upload de fotos (usuários autenticados)
CREATE POLICY "Allow authenticated users to upload pet photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'pet-photos');

-- Policy para leitura pública de fotos
CREATE POLICY "Allow public read access to pet photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'pet-photos');

-- Policy para atualização (usuários autenticados)
CREATE POLICY "Allow authenticated users to update pet photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'pet-photos');

-- Policy para exclusão (usuários autenticados)
CREATE POLICY "Allow authenticated users to delete pet photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'pet-photos');
```

### 3. Variáveis de Ambiente
Certifique-se de que as variáveis de ambiente estão configuradas corretamente no `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=seu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
```

## Testando o Funcionamento

Após configurar o bucket e as policies:

1. Faça login como abrigo
2. Vá para "Anunciar Pet"
3. Preencha os dados e adicione fotos
4. Publique o pet
5. Verifique se as fotos aparecem corretamente:
   - Na lista de "Meus Pets"
   - Na página de detalhes do pet
   - Na edição do pet

## Solução de Problemas

Se o upload ainda não funcionar:

1. Verifique os logs do navegador para erros de permissão
2. Confirme que o bucket `pet-photos` existe exatamente com esse nome
3. Verifique se as policies de segurança estão ativas
4. Teste manualmente a conexão com o storage usando o código de teste:
   ```bash
   npm run dev
   ```
   
   E tente fazer um upload de teste.