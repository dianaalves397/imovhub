import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ClientesPage from "./page";
vi.mock("next/link", () => ({ default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={String(href)} {...props}>{children}</a> }));
describe("entrada de clientes", () => { it("separa imediatamente comprar e vender", () => { render(<ClientesPage />); expect(screen.getByRole("link", { name: /pesquisar imóveis/i })).toHaveAttribute("href", "/clientes/comprar"); expect(screen.getByRole("link", { name: /apresentar imóvel/i })).toHaveAttribute("href", "/clientes/vender"); }); });
