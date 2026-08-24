import Link from "next/link";
import { Brand } from "./brand";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Navegação principal">
        <Link href="/clientes">Clientes</Link>
        <Link href="/agentes">Profissionais</Link>
        <Link className="button button-small" href="/clientes/comprar">Explorar imóveis</Link>
      </nav>
    </header>
  );
}
