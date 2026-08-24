import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl } from "./url";
const original = { ...process.env };
afterEach(() => { process.env = { ...original }; });
describe("URL canónica", () => { it("remove barra final da URL configurada", () => { process.env.NEXT_PUBLIC_SITE_URL = "https://imovhub.pt/"; expect(getSiteUrl()).toBe("https://imovhub.pt"); }); it("usa URL de produção Vercel quando aplicável", () => { delete process.env.NEXT_PUBLIC_SITE_URL; process.env.VERCEL_PROJECT_PRODUCTION_URL = "imovhub.pt"; expect(getSiteUrl()).toBe("https://imovhub.pt"); }); });
