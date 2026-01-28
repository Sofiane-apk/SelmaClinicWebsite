export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  const isAr = params.locale === "ar";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-selma-purple">
          {isAr ? "خدماتنا" : "Nos services"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {isAr
            ? "اكتشف مجموعة العلاجات المتوفرة في عيادة سيلما لطب الأسنان."
            : "Découvrez l’ensemble des soins proposés à la Clinique Dentaire Selma."}
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Soins généraux */}
        <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-selma-purple">
            {isAr ? "العلاج العام" : "Soins généraux"}
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>{isAr ? "فحوصات وتشخيصات" : "Examens et diagnostics"}</li>
            <li>{isAr ? "إزالة الجير والتنظيف" : "Détartrage et nettoyage"}</li>
            <li>{isAr ? "علاج التسوس" : "Traitement des caries"}</li>
            <li>{isAr ? "معالجة العصب" : "Dévitalisation"}</li>
            <li>{isAr ? "علاج اللثة" : "Soins de gencives"}</li>
          </ul>
          <a href={`/${params.locale}/rendez-vous`} className="btn-primary text-xs">
            {isAr ? "حجز موعد" : "Réserver"}
          </a>
        </section>

        {/* Dentisterie esthétique */}
        <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-selma-purple">
            {isAr ? "تجميل الأسنان" : "Dentisterie esthétique"}
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>{isAr ? "تبييض الأسنان" : "Blanchiment dentaire"}</li>
            <li>{isAr ? "الفينير" : "Facettes dentaires"}</li>
            <li>{isAr ? "تيجان تجميلية" : "Couronnes esthétiques"}</li>
            <li>{isAr ? "تقويم شفاف" : "Orthodontie invisible"}</li>
          </ul>
          <a href={`/${params.locale}/rendez-vous`} className="btn-primary text-xs">
            {isAr ? "حجز موعد" : "Réserver"}
          </a>
        </section>

        {/* Chirurgie orale */}
        <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-selma-purple">
            {isAr ? "جراحة الفم" : "Chirurgie orale"}
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>{isAr ? "قلع الأسنان" : "Extraction dentaire"}</li>
            <li>
              {isAr
                ? "قلع ضروس العقل"
                : "Extraction des dents de sagesse"}
            </li>
            <li>{isAr ? "زرع الأسنان" : "Implants dentaires"}</li>
            <li>{isAr ? "ترقيع العظم" : "Greffe osseuse"}</li>
          </ul>
          <a href={`/${params.locale}/rendez-vous`} className="btn-primary text-xs">
            {isAr ? "حجز موعد" : "Réserver"}
          </a>
        </section>

        {/* Urgences */}
        <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm border-l-4 border-error">
          <h2 className="text-xl font-semibold text-error">
            {isAr ? "حالات طارئة" : "Urgences dentaires"}
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>
              {isAr
                ? "آلام حادة في الأسنان"
                : "Douleurs dentaires aiguës"}
            </li>
            <li>
              {isAr
                ? "إصابات وصدمات سنية"
                : "Traumatismes dentaires"}
            </li>
            <li>{isAr ? "التهابات" : "Infections"}</li>
            <li>{isAr ? "توفر على مدار الساعة" : "Disponibilité 24/7"}</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <a href={`/${params.locale}/rendez-vous`} className="btn-emergency text-xs">
              {isAr ? "موعد مستعجل" : "Rendez-vous d'urgence"}
            </a>
            <a href="tel:0561779999" className="text-xs font-semibold text-error underline">
              {isAr ? "اتصل بـ 0561 77 99 99" : "Appeler le 0561 77 99 99"}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

