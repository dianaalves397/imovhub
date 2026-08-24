import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
export const metadata = { title: "Confirmar email" };
export default function ConfirmPage() { return <AuthShell eyebrow="Confirmação" title="Não recebeu o email?" description="Pode pedir uma nova mensagem. Verifique também a pasta de spam."><AuthForm kind="resend" /></AuthShell>; }
