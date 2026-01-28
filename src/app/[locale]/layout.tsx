import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppLocale, DEFAULT_LOCALE, getMessages } from "@/lib/i18n";

export const metadata: Metadata = {
  title:
    "Clinique Dentaire Selma - Dentiste à Cheraga, Alger | Soins & Urgences",
  description:
    "Clinique dentaire moderne à Cheraga. Soins généraux, esthétique dentaire, chirurgie orale et urgences. Prenez rendez-vous en ligne.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: AppLocale };
}) {
  const locale = params?.locale ?? DEFAULT_LOCALE;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen bg-[#F5F5F5] text-[#333333]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <div className="mx-auto max-w-content px-4 py-10 md:px-6">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


