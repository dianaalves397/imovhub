import Link from "next/link";
import { Brand } from "@/components/brand";
export function AuthShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <main className="auth-page"><header><Brand /><Link href="/">Voltar ao início</Link></header><section><div className="auth-intro"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{children}</section></main>;
}
