\"use client\";

import Link from \"next/link\";
import { useParams } from \"next/navigation\";
import { useState } from \"react\";

const navItems = [
  { href: \"\", key: \"home\" },
  { href: \"/services\", key: \"services\" },
  { href: \"/a-propos\", key: \"about\" },
  { href: \"/rendez-vous\", key: \"booking\" },
  { href: \"/contact\", key: \"contact\" }
];

export function Header() {
  const params = useParams();
  const locale = (params?.locale as string) || \"fr\";
  const [open, setOpen] = useState(false);
  const otherLocale = locale === \"fr\" ? \"ar\" : \"fr\";

  return (
    <header className=\"border-b bg-white/80 backdrop-blur\">
      <div className=\"mx-auto flex max-w-content items-center justify-between px-4 py-4 md:px-6\">
        <Link href={`/${locale}`} className=\"flex items-center gap-2\">
          <div className=\"flex h-9 w-9 items-center justify-center rounded-2xl bg-selma-purple text-white font-bold\">
            S
          </div>
          <div className=\"flex flex-col leading-tight\">
            <span className=\"text-sm font-semibold text-selma-purple\">
              Clinique Dentaire Selma
            </span>
            <span className=\"text-xs text-gray-500\">
              Votre sourire, notre priorité
            </span>
          </div>
        </Link>

        <nav className=\"hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex\">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className=\"transition hover:text-selma-purple\"
            >
              {labelFor(item.key, locale)}
            </Link>
          ))}
          <Link
            href={`/${otherLocale}`}
            className=\"rounded-pill border border-selma-purple px-3 py-1 text-xs font-semibold text-selma-purple hover:bg-selma-purple hover:text-white transition\"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/rendez-vous`}
            className=\"btn-primary text-xs\"
          >
            {locale === \"ar\" ? \"حجز موعد\" : \"Prendre rendez-vous\"}
          </Link>
        </nav>

        <button
          className=\"inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-gray-700 md:hidden\"
          onClick={() => setOpen((prev) => !prev)}
          aria-label=\"Toggle navigation\"
        >
          <span className=\"sr-only\">Menu</span>
          <div className=\"space-y-1.5\">
            <span className=\"block h-0.5 w-4 bg-current\" />
            <span className=\"block h-0.5 w-4 bg-current\" />
            <span className=\"block h-0.5 w-4 bg-current\" />
          </div>
        </button>
      </div>

      {open && (
        <div className=\"border-t bg-white md:hidden\">
          <div className=\"mx-auto flex max-w-content flex-col gap-2 px-4 py-3 text-sm\">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className=\"py-1\"
                onClick={() => setOpen(false)}
              >
                {labelFor(item.key, locale)}
              </Link>
            ))}
            <div className=\"mt-2 flex items-center gap-3\">
              <Link
                href={`/${otherLocale}`}
                className=\"rounded-pill border border-selma-purple px-3 py-1 text-xs font-semibold text-selma-purple hover:bg-selma-purple hover:text-white transition\"
                onClick={() => setOpen(false)}
              >
                {otherLocale.toUpperCase()}
              </Link>
              <Link
                href={`/${locale}/rendez-vous`}
                className=\"btn-primary flex-1 text-xs text-center\"
                onClick={() => setOpen(false)}
              >
                {locale === \"ar\" ? \"حجز موعد\" : \"Prendre rendez-vous\"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function labelFor(key: string, locale: string) {
  const fr: Record<string, string> = {
    home: \"Accueil\",
    services: \"Services\",
    about: \"À propos\",
    booking: \"Rendez-vous\",
    contact: \"Contact\"
  };

  const ar: Record<string, string> = {
    home: \"الرئيسية\",
    services: \"الخدمات\",
    about: \"من نحن\",
    booking: \"حجز موعد\",
    contact: \"اتصال\"
  };

  return locale === \"ar\" ? ar[key] ?? key : fr[key] ?? key;
}

