import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Clinique Dentaire Selma - Dentiste à Cheraga, Alger | Soins & Urgences",
};

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale ?? "fr";
  const isAr = locale === "ar";

  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-selma-light">
            {isAr ? "عيادة سيلما لطب الأسنان" : "Clinique Dentaire Selma"}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-selma-purple md:text-5xl">
            {isAr ? "ابتسامتك، أولويتنا" : "Votre sourire, notre priorité"}
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            {isAr
              ? "عيادة أسنان حديثة في الشراقة، الجزائر. رعاية عامة، تجميل الأسنان، جراحة الفم وحالات طارئة على مدار الساعة."
              : "Clinique dentaire moderne à Cheraga, Alger. Soins généraux, dentisterie esthétique, chirurgie orale et urgences 24/7."}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`/${locale}/rendez-vous`} className="btn-primary">
              {isAr ? "حجز موعد" : "Prendre rendez-vous"}
            </a>
            <a href={`/${locale}/contact`} className="btn-emergency">
              {isAr ? "حالات طارئة" : "Urgences dentaires"}
            </a>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-4 text-xs text-gray-600 md:text-sm">
            <div>
              <dt className="font-semibold text-selma-purple">
                {isAr ? "سنوات الخبرة" : "Années d'expérience"}
              </dt>
              <dd>10+</dd>
            </div>
            <div>
              <dt className="font-semibold text-selma-purple">
                {isAr ? "مرضى مبتسمون" : "Patients satisfaits"}
              </dt>
              <dd>1500+</dd>
            </div>
            <div>
              <dt className="font-semibold text-selma-purple">
                {isAr ? "معدات حديثة" : "Équipement moderne"}
              </dt>
              <dd>{isAr ? "تقنيات متقدمة" : "Technologies avancées"}</dd>
            </div>
          </dl>
        </div>
        <div className="h-64 rounded-3xl bg-gradient-to-br from-selma-purple via-selma-light to-selma-accent shadow-xl md:h-80" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-selma-purple">
          {isAr ? "خدماتنا الرئيسية" : "Nos principaux services"}
        </h2>
        <p className="text-sm text-gray-600">
          {isAr
            ? "مجموعة كاملة من العلاجات للحفاظ على صحة ابتسامتك وجمالها."
            : "Une gamme complète de soins pour préserver la santé et l’esthétique de votre sourire."}
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              key: "general",
              frTitle: "Soins généraux",
              arTitle: "العلاج العام",
              frDesc: "Examens, détartrage, traitements des caries et plus.",
              arDesc: "فحوصات، تنظيف الجير، علاج التسوس والمزيد.",
            },
            {
              key: "esthetic",
              frTitle: "Dentisterie esthétique",
              arTitle: "تجميل الأسنان",
              frDesc: "Blanchiment, facettes, couronnes esthétiques.",
              arDesc: "تبييض الأسنان، الفينير، تيجان تجميلية.",
            },
            {
              key: "surgery",
              frTitle: "Chirurgie orale",
              arTitle: "جراحة الفم",
              frDesc: "Extractions, implants, greffes osseuses.",
              arDesc: "قلع الأسنان، الزرعات، ترقيع العظم.",
            },
            {
              key: "emergency",
              frTitle: "Urgences dentaires",
              arTitle: "حالات طارئة",
              frDesc: "Prise en charge rapide des douleurs et traumatismes.",
              arDesc: "تسيير سريع للألم والصدمات السنية.",
            },
          ].map((card) => (
            <div
              key={card.key}
              className="rounded-xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-sm font-semibold text-selma-purple md:text-base">
                {isAr ? card.arTitle : card.frTitle}
              </h3>
              <p className="mt-1 text-xs text-gray-600 md:text-sm">
                {isAr ? card.arDesc : card.frDesc}
              </p>
              <a
                href={`/${locale}/services`}
                className="mt-3 inline-flex text-xs font-medium text-selma-purple hover:underline"
              >
                {isAr ? "اكتشف المزيد" : "En savoir plus"}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

