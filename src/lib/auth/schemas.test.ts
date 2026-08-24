import { describe, expect, it } from "vitest";
import { recoverySchema, safeNextPath, signupSchema } from "./schemas";
describe("contratos de autenticação", () => {
  it("aceita registo cliente ou agente sem campos privilegiados", () => { expect(signupSchema.parse({ email: "AGENTE@example.pt", password: "uma-password-segura", fullName: "Ana Silva", accountDomain: "agent" })).toMatchObject({ email: "agente@example.pt", accountDomain: "agent" }); });
  it("rejeita passwords fracas", () => { expect(() => signupSchema.parse({ email: "a@example.pt", password: "curta", fullName: "Ana Silva", accountDomain: "client" })).toThrow(); });
  it("valida recuperação sem revelar existência da conta", () => { expect(recoverySchema.safeParse({ email: "cliente@example.pt" }).success).toBe(true); });
  it.each([["/agentes", "/agentes"], ["https://evil.test", "/clientes"], ["//evil.test", "/clientes"], [null, "/clientes"]])("impede open redirects: %s", (input, output) => { expect(safeNextPath(input)).toBe(output); });
});
