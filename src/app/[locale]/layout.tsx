import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HtmlLangDir } from "@/components/layout/HtmlLangDir";
import { AppLocale, DEFAULT_LOCALE, getMessages } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: AppLocale };
}) {
  const locale = params?.locale ?? DEFAULT_LOCALE;
  if (locale !== "fr" && locale !== "ar") notFound();
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HtmlLangDir />
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
  );
}


