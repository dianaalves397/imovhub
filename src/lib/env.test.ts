import { describe, expect, it } from "vitest";
import { getPublicEnv } from "./env";
describe("variáveis públicas", () => { it("aceita apenas uma configuração Supabase válida", () => { expect(getPublicEnv({ NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co", NEXT_PUBLIC_SUPABASE_ANON_KEY: "a".repeat(20) })).toBeTruthy(); }); it("rejeita configuração insegura ou incompleta", () => { expect(() => getPublicEnv({ NEXT_PUBLIC_SUPABASE_URL: "http://example.test", NEXT_PUBLIC_SUPABASE_ANON_KEY: "short" })).toThrow(); }); });
