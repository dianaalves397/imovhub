# Autenticação e segurança

A aplicação usa Supabase Auth com PKCE/cookies através de `@supabase/ssr`. O projeto Supabase deve manter **Confirm email** ativo e definir:

- Site URL: o domínio canónico de produção;
- Redirect URLs: `https://<dominio>/auth/callback` e URLs de preview explicitamente aprovadas;
- proteção CAPTCHA/rate limits no painel Auth antes do lançamento;
- TOTP MFA ativo. O acesso `/admin` exige função `admin` em `user_roles` **e** assurance level `aal2`.

## Modelo de autorização

`profiles.account_domain` indica apenas a experiência pretendida e não concede elegibilidade profissional. Funções administrativas vivem em `user_roles`; não existem policies de escrita para utilizadores autenticados. Verificação profissional e AMI serão entidades separadas na Issue #5.

A migration cria um log append-only de eventos de segurança allowlisted. Eventos administrativos e IP/user-agent devem ser escritos por funções server-side/auditadas na implementação do backoffice, sem expor `service_role` ao browser.

## Operação

1. Aplicar migrations numa branch/ambiente Supabase antes de produção.
2. Configurar `NEXT_PUBLIC_SITE_URL` com HTTPS no Vercel.
3. Personalizar templates de confirmação e recuperação no Supabase.
4. Validar SMTP/domínio; Resend só deve ser ligado após verificação do domínio.
5. Criar o primeiro admin por processo operacional controlado, nunca pelo frontend.
