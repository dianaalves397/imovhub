import { redirect } from "next/navigation";
import { logout } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { AuthForm } from "@/components/auth/auth-form";
import { SiteHeader } from "@/components/site-header";
export const metadata = { title: "Segurança da conta" };
export default async function SecurityPage() { const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/auth/entrar?next=/conta/seguranca"); return <><SiteHeader /><main className="section-page security-page"><div className="eyebrow">Conta e segurança</div><h1>Proteja a sua conta.</h1><section><h2>Email confirmado</h2><p>{user.email}</p></section><section><h2>Alterar password</h2><AuthForm kind="update" /></section><section><h2>Sessão</h2><form action={logout}><button className="button button-outline">Terminar sessão</button></form></section><section><h2>Autenticação multifator</h2><p>A arquitetura Supabase MFA está preparada. A configuração será obrigatória para administradores antes do acesso ao backoffice.</p></section></main></>; }
