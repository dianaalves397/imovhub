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
