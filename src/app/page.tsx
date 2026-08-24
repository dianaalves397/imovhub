import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return <><SiteHeader /><main>
    <section className="hero">
      <div className="eyebrow">Imobiliário, com raízes portuguesas</div>
      <h1>Uma casa para cada <em>história.</em></h1>
      <p>Encontre o lugar certo, apresente o seu imóvel ou faça crescer a sua atividade profissional — numa plataforma transparente e próxima.</p>
      <div className="actions"><Link className="button" href="/clientes">Sou cliente</Link><Link className="button button-outline" href="/agentes">Sou profissional</Link></div>
      <div className="tile-strip" aria-hidden="true"><span>✦</span><span>◇</span><span>✦</span><span>◇</span><span>✦</span></div>
    </section>
    <section className="domain-grid" aria-label="Escolha a sua área">
      <article><span className="number">01</span><h2>Comprar ou arrendar</h2><p>Pesquise imóveis em Portugal e acompanhe os seus favoritos.</p><Link href="/clientes/comprar">Começar a procurar <span aria-hidden="true">→</span></Link></article>
      <article><span className="number">02</span><h2>Vender ou arrendar</h2><p>Apresente o seu imóvel e compare propostas de profissionais elegíveis.</p><Link href="/clientes/vender">Apresentar imóvel <span aria-hidden="true">→</span></Link></article>
      <article className="dark"><span className="number">03</span><h2>Espaço profissional</h2><p>CRM, carteira, negócio e colaboração num workspace criado para agentes.</p><Link href="/agentes">Conhecer o workspace <span aria-hidden="true">→</span></Link></article>
    </section>
  </main><footer><BrandFooter /></footer></>;
}
function BrandFooter() { return <><strong>ImovHub</strong><span>Marketplace imobiliário independente · Portugal</span></>; }
