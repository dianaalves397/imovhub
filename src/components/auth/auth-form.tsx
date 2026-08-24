"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, requestPasswordReset, resendConfirmation, signup, updatePassword, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = { status: "idle" };
type Kind = "login" | "signup" | "recovery" | "resend" | "update";
const actions = { login, signup, recovery: requestPasswordReset, resend: resendConfirmation, update: updatePassword };

export function AuthForm({ kind, next }: { kind: Kind; next?: string }) {
  const [state, action, pending] = useActionState(actions[kind], initialState);
  return <form action={action} className="auth-form">
    {next && <input type="hidden" name="next" value={next} />}
    {kind === "signup" && <label>Nome completo<input name="fullName" autoComplete="name" required minLength={2} /></label>}
    {kind === "signup" && <fieldset><legend>Quero usar a ImovHub como</legend><label><input type="radio" name="accountDomain" value="client" defaultChecked /> Cliente ou proprietário</label><label><input type="radio" name="accountDomain" value="agent" /> Profissional</label></fieldset>}
    {kind !== "update" && <label>Email<input name="email" type="email" autoComplete="email" required /></label>}
    {(kind === "login" || kind === "signup" || kind === "update") && <label>{kind === "update" ? "Nova password" : "Password"}<input name="password" type="password" autoComplete={kind === "login" ? "current-password" : "new-password"} required minLength={kind === "login" ? 1 : 10} /></label>}
    {state.message && <p className={`form-message ${state.status}`} role="status">{state.message}</p>}
    <button className="button" disabled={pending}>{pending ? "A processar…" : labels[kind]}</button>
    {kind === "login" && <div className="form-links"><Link href="/auth/recuperar-password">Recuperar password</Link><Link href="/auth/confirmar-email">Reenviar confirmação</Link></div>}
  </form>;
}
const labels: Record<Kind, string> = { login: "Entrar", signup: "Criar conta", recovery: "Enviar instruções", resend: "Reenviar confirmação", update: "Alterar password" };
