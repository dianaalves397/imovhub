# ImovHub — Instructions for Codex

## Objective
Build ImovHub as a production-grade Portuguese real-estate marketplace with three user domains: clients/buyers-tenants, owners/sellers-landlords, and real-estate agents/professionals. The agent workspace is a first-class product, not a secondary admin area.

## Product model
- Public marketplace for properties.
- Client entry must branch immediately into:
  - Comprar / Arrendar
  - Vender / Colocar para arrendar
- Separate professional workspace for agents.
- Separate admin/backoffice.
- Agents can create accounts before being associated with a mediator/AMI, but professional marketplace actions remain blocked until their professional status is verified.
- Provide a Portugal onboarding path for agents who:
  - are already associated with a licensed mediator;
  - are not yet associated with one;
  - intend to obtain their own mediation licence.
- Do not describe ImovHub as the licensed mediator unless the legal structure is explicitly changed later.

## Commercial model — feature-flagged until legal/fiscal validation
- Base: €0/month + 15% platform fee.
- Pro: €39/month + 10% platform fee.
- Elite: €99/month + 5% platform fee.
- Professionals retain the majority of revenue attributable to their work.
- Referrals and team overrides must be transparent and recorded before settlement.
- No MLM/downline logic.
- Do not activate real transaction-money flows until legally validated.

## Required product areas
### Clients / buyers / tenants
- Search, filters, property detail, favorites, saved searches, alerts.
- Contact / viewing requests.
- Account area.

### Owners / sellers / landlords
- Submit property/request.
- Receive and compare proposals from eligible agents.
- Select an agent.
- Track activity and status.
- Reviews after eligible completed interactions.

### Agents
- Dashboard.
- CRM and leads.
- Properties and media/document uploads.
- Pipeline / deals.
- Tasks and calendar/viewings.
- Owner opportunities and proposals.
- Referrals and co-brokerage.
- Teams.
- Financial dashboard / ledger.
- Reputation and public profile.
- Account security.
- Professional verification / AMI onboarding.

### Admin
- Agent and organisation verification.
- Listing moderation.
- Reviews, reports and disputes.
- Users and permissions.
- Plans/fees configuration.
- Security and audit logs.
- Analytics.

## Architecture
- Next.js + TypeScript.
- PostgreSQL via the existing Supabase project.
- Supabase Auth and RLS.
- Object storage for property media and private documents.
- Resend for transactional email once a verified domain is available.
- Vercel for production hosting.
- Prefer a modular monolith. Do not introduce Redis, microservices, Firebase or a separate Express backend until there is a measured need.

## Security requirements
- Never expose service-role keys or secrets to the browser or repository.
- Use environment variables for all credentials.
- Preserve and extend RLS; never bypass it from browser code.
- Email/password authentication with email confirmation.
- One account per email via Supabase Auth.
- Password recovery and resend-confirmation flows.
- MFA required for admins; support for agents before commercial launch.
- Users may not self-assign admin roles, verification status, ratings, AMI approval, privileged plans, fee overrides or marketplace permissions.
- Server-side validation for all writes.
- Rate limiting / anti-abuse where relevant.
- Audit events for privileged operations.
- Private documents must not be publicly addressable.

## UX requirements
- Two clearly distinct product experiences: `/clientes` and `/agentes`.
- `/clientes` must branch to `/clientes/comprar` and `/clientes/vender` immediately.
- Agent workspace should feel like professional operating software, not a consumer site with extra menu items.
- Portuguese (pt-PT) is the primary locale.
- Mobile responsive and WCAG-aware.
- Visual direction: Portuguese architecture/azulejo influence; avoid generic fintech SaaS aesthetic.

## Development rules
- Do not replace real backend integration with mocks when the backend exists.
- Do not seed production with misleading fake properties unless explicitly marked demo/test.
- Use migrations for schema changes.
- Add tests with every material flow.
- Run lint, typecheck and tests before completing a task.
- Use feature flags for legally or financially sensitive features.
- Keep implementation docs current.

## Definition of done
A task is not complete until:
1. functionality works end-to-end;
2. authorization/RLS is considered;
3. error and empty states exist;
4. mobile layout works;
5. tests cover the critical path;
6. no secrets are committed;
7. production build succeeds.
