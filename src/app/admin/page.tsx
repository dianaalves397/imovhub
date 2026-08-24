import { Brand } from "@/components/brand";
export const metadata = { title: "Administração", robots: { index: false, follow: false } };
export default function AdminPage() { return <main className="admin-page"><Brand /><section><div className="eyebrow">Acesso restrito</div><h1>Administração ImovHub</h1><p>Esta área requer autenticação, função administrativa atribuída no servidor e MFA. Nenhuma função privilegiada pode ser atribuída pelo frontend.</p><div className="notice">O controlo de acesso será ligado ao Supabase Auth antes da disponibilização do backoffice.</div></section></main>; }
