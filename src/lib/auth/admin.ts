import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdminWithMfa() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/entrar?next=/admin");
  const [{ data: role }, { data: aal }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle(),
    supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
  ]);
  if (!role) redirect("/");
  if (aal?.currentLevel !== "aal2") redirect("/conta/seguranca?mfa=obrigatorio");
  return { user, supabase };
}
