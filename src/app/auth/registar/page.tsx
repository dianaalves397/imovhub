import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
export const metadata = { title: "Criar conta" };
export default function SignupPage() { return <AuthShell eyebrow="Começar" title="Crie a sua conta." description="Uma conta por email. Os perfis profissionais necessitam de verificação antes de atuar no marketplace."><AuthForm kind="signup" /><p>Já tem conta? <Link href="/auth/entrar">Entrar</Link></p></AuthShell>; }
