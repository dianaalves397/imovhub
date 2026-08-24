import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
export const metadata = { title: "Entrar" };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) { const { next } = await searchParams; return <AuthShell eyebrow="A sua conta" title="Bem-vindo de volta." description="Entre com a conta confirmada para aceder à sua área."><AuthForm kind="login" next={next} /><p>Ainda não tem conta? <Link href="/auth/registar">Criar conta</Link></p></AuthShell>; }
