import { Brand } from "@/components/brand";
import { requireAdminWithMfa } from "@/lib/auth/admin";
export const metadata = { title: "Administração", robots: { index: false, follow: false } };
export default async function AdminPage() { const { user } = await requireAdminWithMfa(); return <main className="admin-page"><Brand /><section><div className="eyebrow">Acesso restrito · MFA ativo</div><h1>Administração ImovHub</h1><p>Sessão administrativa validada para {user.email}. O backoffice operacional será disponibilizado na Issue #6; todas as mutações privilegiadas serão autorizadas no servidor e auditadas.</p></section></main>; }
