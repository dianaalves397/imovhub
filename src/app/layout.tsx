import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const serif = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: { default: "ImovHub", template: "%s · ImovHub" },
  description: "O ponto de encontro do imobiliário em Portugal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
