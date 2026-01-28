import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Clinique Dentaire Selma - Dentiste à Cheraga, Alger | Soins & Urgences",
  description:
    "Clinique dentaire moderne à Cheraga. Soins généraux, esthétique dentaire, chirurgie orale et urgences. Prenez rendez-vous en ligne.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // `lang`/`dir` will be updated per-locale by a client component inside `[locale]/layout`.
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen bg-[#F5F5F5] text-[#333333]">{children}</body>
    </html>
  );
}

