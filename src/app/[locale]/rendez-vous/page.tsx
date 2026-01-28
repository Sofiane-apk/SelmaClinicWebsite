import { BookingForm } from "@/components/booking/BookingForm";

export default function BookingPage({
  params,
}: {
  params: { locale: string };
}) {
  const isAr = params.locale === "ar";

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-selma-purple">
          {isAr ? "حجز موعد" : "Prendre rendez-vous"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {isAr
            ? "اختر الخدمة المناسبة وأكمل خطوات الحجز لتأكيد موعدك."
            : "Choisissez votre type de soin et complétez les étapes pour confirmer votre rendez-vous."}
        </p>
      </header>

      <BookingForm locale={params.locale} />
    </div>
  );
}


