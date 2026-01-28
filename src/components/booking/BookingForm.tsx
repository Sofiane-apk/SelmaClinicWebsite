"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema, type AppointmentInput } from "@/lib/validations";

type Step = 1 | 2 | 3 | 4;

interface BookingFormProps {
  locale: string;
}

export function BookingForm({ locale }: BookingFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      isNewPatient: true,
      isEmergency: false,
      medicalHistory: [],
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const isAr = locale === "ar";

  const onSubmit = async (data: AppointmentInput) => {
    setSubmitting(true);
    setError(null);
    setSuccessRef(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, ...data }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const json = await res.json();
      setSuccessRef(json.referenceNumber ?? null);
      setStep(4);
    } catch {
      setError(
        isAr
          ? "حدث خطأ أثناء تأكيد الموعد. يرجى المحاولة مرة أخرى."
          : "Une erreur est survenue lors de la confirmation du rendez-vous. Veuillez réessayer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService = watch("serviceType");
  const date = watch("date");
  const time = watch("time");

  return (
    <form
      className="space-y-6 rounded-xl bg-white p-5 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader step={step} isAr={isAr} />

      {step === 1 && (
        <Step1Service register={register} errors={errors} isAr={isAr} />
      )}
      {step === 2 && (
        <Step2DateTime
          register={register}
          errors={errors}
          isAr={isAr}
          isEmergency={watch("isEmergency")}
        />
      )}
      {step === 3 && (
        <Step3Patient register={register} errors={errors} isAr={isAr} />
      )}
      {step === 4 && (
        <Step4Confirm
          isAr={isAr}
          selectedService={selectedService}
          date={date}
          time={time}
          reference={successRef}
        />
      )}

      {error && (
        <p className="text-xs text-error">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-gray-500">
          {step < 4 &&
            (isAr ? "الخطوة " : "Étape ") + step + (isAr ? " من 3" : " sur 3")}
          {step === 4 && (isAr ? "تم تأكيد الموعد" : "Rendez-vous confirmé")}
        </div>
        <div className="flex gap-2">
          {step > 1 && step < 4 && (
            <button
              type="button"
              className="btn-secondary text-xs"
              onClick={() => setStep((s) => ((s - 1) as Step))}
            >
              {isAr ? "رجوع" : "Retour"}
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              className="btn-primary text-xs"
              onClick={() => setStep((s) => ((s + 1) as Step))}
            >
              {isAr ? "التالي" : "Suivant"}
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="btn-primary text-xs disabled:opacity-60"
              disabled={submitting}
            >
              {submitting
                ? isAr
                  ? "جارٍ التأكيد..."
                  : "Confirmation..."
                : isAr
                ? "تأكيد الموعد"
                : "Confirmer le rendez-vous"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function StepHeader({ step, isAr }: { step: Step; isAr: boolean }) {
  return (
    <div className="space-y-1 border-b pb-3">
      <h1 className="text-2xl font-semibold text-selma-purple">
        {isAr ? "حجز موعد" : "Prendre rendez-vous"}
      </h1>
      <p className="text-xs text-gray-600">
        {isAr
          ? "املأ الخطوات الثلاث لحجز موعدك في عيادة سيلما لطب الأسنان."
          : "Complétez les trois étapes pour réserver votre rendez-vous à la Clinique Dentaire Selma."}
      </p>
    </div>
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-error">{message}</p>;
}

function Step1Service({
  register,
  errors,
  isAr,
}: {
  register: any;
  errors: any;
  isAr: boolean;
}) {
  const services = [
    {
      value: "general",
      fr: "Soins généraux",
      ar: "العلاج العام",
      frDesc: "Examens, détartrage, caries...",
      arDesc: "فحوصات، تنظيف، تسوس...",
    },
    {
      value: "esthetic",
      fr: "Dentisterie esthétique",
      ar: "تجميل الأسنان",
      frDesc: "Blanchiment, facettes, couronnes...",
      arDesc: "تبييض، فينير، تيجان...",
    },
    {
      value: "surgery",
      fr: "Chirurgie orale",
      ar: "جراحة الفم",
      frDesc: "Extractions, implants, greffes...",
      arDesc: "قلع، زرع، ترقيع عظم...",
    },
    {
      value: "emergency",
      fr: "Urgence dentaire",
      ar: "حالة طارئة",
      frDesc: "Douleur aiguë, traumatisme, infection.",
      arDesc: "ألم حاد، صدمة، التهاب.",
    },
  ];

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-800">
        {isAr ? "اختر نوع الخدمة" : "Choisissez le type de soin"}
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {services.map((s) => (
          <label
            key={s.value}
            className="flex cursor-pointer flex-col rounded-lg border p-3 text-xs hover:border-selma-purple"
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value={s.value}
                {...register("serviceType")}
              />
              <span className="font-semibold text-gray-800">
                {isAr ? s.ar : s.fr}
              </span>
            </div>
            <p className="mt-1 text-gray-600">
              {isAr ? s.arDesc : s.frDesc}
            </p>
          </label>
        ))}
      </div>
      <ErrorText message={errors.serviceType?.message} />
    </section>
  );
}

function Step2DateTime({
  register,
  errors,
  isAr,
  isEmergency,
}: {
  register: any;
  errors: any;
  isAr: boolean;
  isEmergency: boolean;
}) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-800">
        {isAr ? "اختر التاريخ والوقت" : "Sélectionnez la date et l’horaire"}
      </h2>
      <p className="text-xs text-gray-500">
        {isAr
          ? "المواعيد من الإثنين إلى السبت من 9:00 إلى 18:00. سيتم لاحقاً إضافة منطق التوفر في الوقت الحقيقي."
          : "Rendez-vous du lundi au samedi de 9h00 à 18h00. La logique de disponibilité en temps réel sera ajoutée ensuite."}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            {isAr ? "التاريخ" : "Date"}
          </label>
          <input
            type="date"
            min={today}
            className="w-full rounded-md border px-3 py-2 text-sm"
            {...register("date")}
          />
          <ErrorText message={errors.date?.message} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            {isAr ? "الوقت المفضل" : "Horaire souhaité"}
          </label>
          <input
            type="time"
            min="09:00"
            max="18:00"
            step={30 * 60}
            className="w-full rounded-md border px-3 py-2 text-sm"
            {...register("time")}
          />
          <ErrorText message={errors.time?.message} />
        </div>
      </div>
      <label className="mt-2 flex items-center gap-2 text-xs text-error">
        <input type="checkbox" {...register("isEmergency")} />
        <span className="font-semibold">
          {isAr ? "موعد مستعجل" : "Rendez-vous en urgence"}
        </span>
      </label>
      {isEmergency && (
        <p className="text-xs text-error">
          {isAr
            ? "في حالة الألم الشديد، ننصحك أيضًا بالاتصال مباشرة على 0561 77 99 99."
            : "En cas de douleur intense, nous vous recommandons également d’appeler directement le 0561 77 99 99."}
        </p>
      )}
    </section>
  );
}

function Step3Patient({
  register,
  errors,
  isAr,
}: {
  register: any;
  errors: any;
  isAr: boolean;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-800">
        {isAr ? "معلومات المريض" : "Informations du patient"}
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            {isAr ? "الاسم" : "Prénom"}
          </label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2 text-sm"
            {...register("firstName")}
          />
          <ErrorText message={errors.firstName?.message} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            {isAr ? "اللقب" : "Nom"}
          </label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2 text-sm"
            {...register("lastName")}
          />
          <ErrorText message={errors.lastName?.message} />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border px-3 py-2 text-sm"
            {...register("email")}
          />
          <ErrorText message={errors.email?.message} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            {isAr ? "رقم الهاتف (+213)" : "Téléphone (+213)"}
          </label>
          <input
            type="tel"
            placeholder="+2135XXXXXXXX"
            className="w-full rounded-md border px-3 py-2 text-sm"
            {...register("phone")}
          />
          <ErrorText message={errors.phone?.message} />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            {isAr ? "تاريخ الميلاد" : "Date de naissance"}
          </label>
          <input
            type="date"
            className="w-full rounded-md border px-3 py-2 text-sm"
            {...register("dob")}
          />
          <ErrorText message={errors.dob?.message} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            {isAr ? "مريض جديد أم متابع؟" : "Nouveau patient ou suivi ?"}
          </label>
          <div className="flex gap-4 text-xs">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("isNewPatient", {
                  setValueAs: (v: string) => v === "true",
                })}
              />
              {isAr ? "مريض جديد" : "Nouveau patient"}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("isNewPatient", {
                  setValueAs: (v: string) => v === "true",
                })}
              />
              {isAr ? "متابعة" : "Suivi"}
            </label>
          </div>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700">
          {isAr ? "سبب الزيارة" : "Motif de la visite"}
        </label>
        <textarea
          rows={3}
          className="w-full rounded-md border px-3 py-2 text-sm"
          {...register("reason")}
        />
        <ErrorText message={errors.reason?.message} />
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-gray-700">
          {isAr ? "سوابق طبية" : "Antécédents médicaux"}
        </p>
        <div className="grid gap-2 text-xs md:grid-cols-2">
          {[
            { value: "diabetes", fr: "Diabète", ar: "سكري" },
            { value: "hypertension", fr: "Hypertension", ar: "ضغط دم" },
            { value: "allergies", fr: "Allergies", ar: "حساسيات" },
            { value: "anticoagulants", fr: "Anticoagulants", ar: "مضادات تخثر" },
          ].map((m) => (
            <label key={m.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={m.value}
                {...register("medicalHistory")}
              />
              <span>{isAr ? m.ar : m.fr}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2 text-xs">
        <label className="flex items-start gap-2 text-gray-700">
          <input type="checkbox" {...register("acceptTerms")} />
          <span>
            {isAr
              ? "أوافق على شروط الحجز وسياسة الإلغاء الخاصة بالعيادة."
              : "J’accepte les conditions de réservation et la politique d’annulation de la clinique."}
          </span>
        </label>
        <ErrorText message={errors.acceptTerms?.message} />
        <label className="flex items-start gap-2 text-gray-700">
          <input type="checkbox" {...register("acceptPrivacy")} />
          <span>
            {isAr
              ? "أوافق على معالجة بياناتي الشخصية وفقاً لقانون حماية البيانات."
              : "J’accepte le traitement de mes données personnelles conformément au RGPD."}
          </span>
        </label>
        <ErrorText message={errors.acceptPrivacy?.message} />
      </div>
    </section>
  );
}

function Step4Confirm({
  isAr,
  selectedService,
  date,
  time,
  reference,
}: {
  isAr: boolean;
  selectedService?: string;
  date?: string;
  time?: string;
  reference: string | null;
}) {
  const serviceLabel = (() => {
    switch (selectedService) {
      case "general":
        return isAr ? "العلاج العام" : "Soins généraux";
      case "esthetic":
        return isAr ? "تجميل الأسنان" : "Dentisterie esthétique";
      case "surgery":
        return isAr ? "جراحة الفم" : "Chirurgie orale";
      case "emergency":
        return isAr ? "حالة طارئة" : "Urgence dentaire";
      default:
        return "";
    }
  })();

  return (
    <section className="space-y-3 text-sm text-gray-700">
      <h2 className="text-base font-semibold text-selma-purple">
        {isAr ? "تم حجز موعدك بنجاح" : "Votre rendez-vous est enregistré"}
      </h2>
      <p className="text-xs text-gray-600">
        {isAr
          ? "ستصلك رسالة تأكيد عبر البريد الإلكتروني. يمكن للعيادة الاتصال بك في حال الحاجة لتعديل الموعد."
          : "Un e-mail de confirmation vous sera envoyé. La clinique pourra vous contacter en cas d’ajustement nécessaire."}
      </p>
      <div className="rounded-lg bg-[#F5F5F5] p-3 text-xs">
        <p>
          <span className="font-semibold">
            {isAr ? "الخدمة: " : "Soin : "}
          </span>
          {serviceLabel}
        </p>
        <p>
          <span className="font-semibold">
            {isAr ? "التاريخ: " : "Date : "}
          </span>
          {date}
        </p>
        <p>
          <span className="font-semibold">
            {isAr ? "الوقت: " : "Heure : "}
          </span>
          {time}
        </p>
        {reference && (
          <p>
            <span className="font-semibold">
              {isAr ? "رقم المرجع: " : "Référence : "}
            </span>
            {reference}
          </p>
        )}
      </div>
      <p className="text-xs text-gray-600">
        {isAr
          ? "يمكنك إضافة الموعد إلى تقويمك أو إرسال التفاصيل عبر واتساب (سيتم إضافة الأزرار لاحقاً)."
          : "Vous pourrez ajouter ce rendez-vous à votre agenda ou envoyer les détails par WhatsApp (boutons à venir)."}
      </p>
    </section>
  );
}

