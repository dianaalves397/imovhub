import { SiteHeader } from "@/components/site-header";
export const metadata = { title: "Comprar ou arrendar" };
export default function ComprarPage() { return <><SiteHeader /><main className="section-page"><div className="eyebrow">Comprar · Arrendar</div><h1>Encontre o seu lugar.</h1><div className="empty-state"><h2>A oferta está a chegar</h2><p>A pesquisa apresentará apenas imóveis reais publicados através do Supabase. Não usamos anúncios fictícios.</p></div></main></>; }
