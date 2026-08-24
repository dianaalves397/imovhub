"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/auth/url";
import { loginSchema, recoverySchema, safeNextPath, signupSchema, updatePasswordSchema } from "@/lib/auth/schemas";

export type AuthState = { status: "idle" | "error" | "success"; message?: string };
const invalid: AuthState = { status: "error", message: "Verifique os dados introduzidos." };

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { status: "error", message: "Email ou password incorretos, ou conta ainda não confirmada." };
  await supabase.from("security_events").insert({ event_type: "signed_in", metadata: {} });
  redirect(safeNextPath(formData.get("next")) as Parameters<typeof redirect>[0]);
}

export async function signup(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"), password: formData.get("password"),
    fullName: formData.get("fullName"), accountDomain: formData.get("accountDomain"),
  });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? invalid.message };
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=${parsed.data.accountDomain === "agent" ? "/agentes" : "/clientes"}`,
      data: { full_name: parsed.data.fullName, account_domain: parsed.data.accountDomain },
    },
  });
  if (error) return { status: "error", message: "Não foi possível criar a conta. Tente novamente dentro de alguns minutos." };
  return { status: "success", message: "Consulte o seu email para confirmar a conta." };
}

export async function requestPasswordReset(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = recoverySchema.safeParse(Object.fromEntries(formData));
  if (parsed.success) {
    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail(parsed.data.email, { redirectTo: `${getSiteUrl()}/auth/callback?next=/auth/atualizar-password` });
  }
  return { status: "success", message: "Se existir uma conta com esse email, receberá as instruções de recuperação." };
}

export async function updatePassword(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = updatePasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? invalid.message };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { status: "error", message: "A ligação expirou. Solicite uma nova recuperação." };
  await supabase.from("security_events").insert({ event_type: "password_changed", metadata: {} });
  return { status: "success", message: "Password alterada. Já pode continuar em segurança." };
}

export async function resendConfirmation(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = recoverySchema.safeParse(Object.fromEntries(formData));
  if (parsed.success) {
    const supabase = await createClient();
    await supabase.auth.resend({ type: "signup", email: parsed.data.email, options: { emailRedirectTo: `${getSiteUrl()}/auth/callback` } });
  }
  return { status: "success", message: "Se a conta estiver pendente, enviaremos uma nova confirmação." };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.from("security_events").insert({ event_type: "signed_out", metadata: {} });
  await supabase.auth.signOut();
  redirect("/auth/entrar");
}
