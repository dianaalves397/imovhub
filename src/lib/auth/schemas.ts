import { z } from "zod";

const email = z.email("Introduza um endereço de email válido.").trim().toLowerCase();
const password = z.string().min(10, "A password deve ter pelo menos 10 caracteres.").max(128);

export const loginSchema = z.object({ email, password: z.string().min(1, "Introduza a password.") });
export const signupSchema = z.object({
  email,
  password,
  fullName: z.string().trim().min(2, "Indique o seu nome.").max(100),
  accountDomain: z.enum(["client", "agent"]),
});
export const recoverySchema = z.object({ email });
export const updatePasswordSchema = z.object({ password });

export function safeNextPath(value: FormDataEntryValue | null, fallback = "/clientes") {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
