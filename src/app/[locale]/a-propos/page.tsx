export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const isAr = params.locale === "ar";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-selma-purple">
          {isAr ? "من نحن" : "À propos de la clinique"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {isAr
            ? "عيادة سيلما لطب الأسنان في الشراقة، الجزائر، مكرسة لتقديم رعاية عالية الجودة في جو دافئ ومطمئن."
            : "La Clinique Dentaire Selma à Cheraga, Alger, est dédiée à offrir des soins de haute qualité dans une atmosphère chaleureuse et rassurante."}
        </p>
      </header>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-selma-purple">
          {isAr ? "رسالتنا" : "Notre mission"}
        </h2>
        <p className="text-sm text-gray-700">
          {isAr
            ? "نرافقك في كل مرحلة من مراحل علاجك لنضمن لك ابتسامة صحية وجميلة على المدى الطويل."
            : "Nous vous accompagnons à chaque étape de votre parcours de soins pour garantir un sourire sain et harmonieux sur le long terme."}
        </p>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-selma-purple">
          {isAr ? "قيمنا" : "Nos valeurs"}
        </h2>
        <ul className="grid gap-3 text-sm text-gray-700 md:grid-cols-2">
          <li>• {isAr ? "الاستماع والثقة" : "Écoute et confiance"}</li>
          <li>
            •{" "}
            {isAr
              ? "الاحترافية والصرامة الطبية"
              : "Professionnalisme et rigueur médicale"}
          </li>
          <li>
            •{" "}
            {isAr
              ? "معدات حديثة وتقنيات متقدمة"
              : "Équipements modernes et techniques avancées"}
          </li>
          <li>
            •{" "}
            {isAr
              ? "متابعة شخصية لكل مريض"
              : "Suivi personnalisé pour chaque patient"}
          </li>
        </ul>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-selma-purple">
          {isAr ? "الفريق الطبي" : "L'équipe"}
        </h2>
        <p className="text-sm text-gray-700">
          {isAr
            ? "فريق من أطباء الأسنان المؤهلين وذوي الخبرة، مع صور وسير ذاتية سيتم إضافتها لاحقاً."
            : "Une équipe de chirurgiens-dentistes qualifiés et expérimentés, avec photos et biographies (contenu à compléter ultérieurement)."}
        </p>
      </section>
    </div>
  );
}

