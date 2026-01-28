export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const isAr = params.locale === "ar";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-selma-purple">
          {isAr ? "اتصل بنا" : "Contact"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {isAr
            ? "لحجز موعد أو طرح أي سؤال، يمكنك التواصل معنا عبر الهاتف أو النموذج أدناه."
            : "Pour toute prise de rendez-vous ou question, contactez-nous par téléphone ou via le formulaire ci-dessous."}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm text-sm text-gray-700">
          <h2 className="text-xl font-semibold text-selma-purple">
            {isAr ? "معلومات العيادة" : "Informations de la clinique"}
          </h2>
          <p>
            {isAr
              ? "حي عليوة فوضيل، الشراقة، الجزائر"
              : "Cité Alioua Fodil, Cheraga, Alger, Algérie"}
          </p>
          <p>
            {isAr ? "الهاتف" : "Téléphone"} :{" "}
            <a href="tel:0561779999" className="text-selma-purple">
              0561 779 999
            </a>{" "}
            ·{" "}
            <a href="tel:0670635684" className="text-selma-purple">
              0670 635 684
            </a>
          </p>
          <p>
            Instagram :{" "}
            <a
              href="https://instagram.com/clinique.dentaire.selma"
              target="_blank"
              rel="noreferrer"
              className="text-selma-purple hover:underline"
            >
              @clinique.dentaire.selma
            </a>
          </p>
          <p className="mt-2">
            {isAr
              ? "ساعات العمل: من الإثنين إلى السبت، من 9:00 إلى 18:00"
              : "Horaires : du lundi au samedi, de 9h00 à 18h00"}
          </p>
        </section>

        <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-selma-purple">
            {isAr ? "نموذج الاتصال" : "Formulaire de contact"}
          </h2>
          <p className="text-xs text-gray-500">
            {isAr
              ? "نموذج الاتصال الوظيفي (مع إرسال بريد إلكتروني) سيتم إعداده لاحقاً."
              : "Le formulaire fonctionnel (avec envoi d’e-mail) sera mis en place ultérieurement."}
          </p>
          <form className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  {isAr ? "الاسم الكامل" : "Nom complet"}
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder={isAr ? "الاسم واللقب" : "Nom et prénom"}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="vous@example.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                {isAr ? "رقم الهاتف" : "Téléphone"}
              </label>
              <input
                type="tel"
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="+213 5XX XX XX XX"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                {isAr ? "رسالتك" : "Votre message"}
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder={
                  isAr
                    ? "صف طلبك أو سؤالك..."
                    : "Décrivez votre demande ou votre question..."
                }
              />
            </div>
            <button type="button" className="btn-primary text-xs">
              {isAr ? "إرسال" : "Envoyer"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

