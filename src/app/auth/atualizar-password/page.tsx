import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
export const metadata = { title: "Alterar password" };
export default function UpdatePasswordPage() { return <AuthShell eyebrow="Segurança" title="Escolha uma nova password." description="Use pelo menos 10 caracteres e evite reutilizar passwords de outros serviços."><AuthForm kind="update" /></AuthShell>; }
