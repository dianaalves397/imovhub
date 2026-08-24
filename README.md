# ImovHub

Marketplace imobiliário para Portugal com duas experiências principais:

- `/clientes` — compradores, arrendatários, vendedores e senhorios.
- `/agentes` — workspace profissional para agentes imobiliários.

Inclui ainda `/admin` para verificação, moderação, segurança e operação da plataforma.

## Estado
Projeto em construção. O backend existente usa Supabase e o deploy público atual está na Vercel. Este repositório deve tornar-se a fonte de verdade do código de produção.

## Stack alvo
- Next.js + TypeScript
- Supabase Auth + PostgreSQL + Storage + RLS
- Vercel
- Resend para email transacional quando houver domínio verificado
- Stripe numa fase posterior e sob feature flag até validação jurídica/fiscal

## Desenvolvimento
Ler `AGENTS.md` antes de alterar o projeto.

## Prioridades
1. Fundação Next.js e ambientes.
2. Auth e segurança.
3. Cliente: comprar/arrendar e vender/arrendar.
4. Workspace completo de agentes.
5. Backoffice.
6. Billing, emails e automações.
7. Testes, performance, acessibilidade e observabilidade.

## Arranque local

Requer Node.js 20.9 ou superior.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Preencha apenas a URL e a chave `anon`/publishable do projeto Supabase em `.env.local`. Nunca use a `service_role` no frontend. A aplicação valida estas variáveis quando cria um cliente Supabase.

## Comandos de qualidade

- `npm run lint` — análise estática.
- `npm run typecheck` — validação TypeScript estrita.
- `npm test` — testes unitários e de componentes.
- `npm run build` — build de produção Next.js.

## Estrutura inicial

- `src/app/clientes` contém a experiência de compradores, arrendatários e proprietários.
- `src/app/agentes` contém a entrada visualmente distinta para o workspace profissional.
- `src/app/admin` contém a entrada restrita do backoffice.
- `src/lib/supabase` centraliza os clientes Supabase; as próximas funcionalidades devem preservar Auth e RLS.

Os fluxos de transações financeiras ficam desligados através de `NEXT_PUBLIC_ENABLE_FINANCIAL_TRANSACTIONS=false` até existir validação jurídica e fiscal.

## Autenticação

Os fluxos Supabase Auth de registo para clientes/profissionais, confirmação de email, login, recuperação e alteração de password estão em `/auth`. A área `/conta/seguranca` requer sessão. `/admin` requer simultaneamente uma função administrativa atribuída fora do frontend e MFA `aal2`. Consulte `docs/auth-security.md` antes de configurar produção e aplique as migrations através do workflow Supabase aprovado.
