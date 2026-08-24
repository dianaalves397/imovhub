import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
export const metadata = { title: "Recuperar password" };
export default function RecoveryPage() { return <AuthShell eyebrow="Segurança" title="Recupere o acesso." description="Enviaremos instruções se o email estiver associado a uma conta. Por segurança, nunca confirmamos se um endereço está registado."><AuthForm kind="recovery" /></AuthShell>; }
