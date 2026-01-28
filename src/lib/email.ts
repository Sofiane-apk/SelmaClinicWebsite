import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendAppointmentEmails(params: {
  locale: string;
  patientEmail: string;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceLabel: string;
  referenceNumber: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not configured; skipping emails.");
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const isAr = params.locale === "ar";

  const subjectPatient = isAr
    ? "تأكيد موعدك - عيادة سيلما لطب الأسنان"
    : "Confirmation de votre rendez-vous - Clinique Dentaire Selma";

  const subjectAdmin = isAr
    ? "موعد جديد عبر الموقع"
    : "Nouveau rendez-vous via le site";

  const bodyPatient = isAr
    ? `مرحباً ${params.patientName},

تم تسجيل موعدك بنجاح في عيادة سيلما لطب الأسنان.

الخدمة: ${params.serviceLabel}
التاريخ: ${params.appointmentDate}
الوقت: ${params.appointmentTime}
رقم المرجع: ${params.referenceNumber}

في حال عدم تمكنك من الحضور، يرجى إبلاغنا مسبقاً.

مع تحيات،
عيادة سيلما لطب الأسنان
`
    : `Bonjour ${params.patientName},

Votre rendez-vous à la Clinique Dentaire Selma a bien été enregistré.

Soin : ${params.serviceLabel}
Date : ${params.appointmentDate}
Heure : ${params.appointmentTime}
Référence : ${params.referenceNumber}

En cas d'empêchement, merci de nous prévenir à l'avance.

Bien cordialement,
Clinique Dentaire Selma
`;

  const bodyAdmin = isAr
    ? `موعد جديد تم حجزه عبر الموقع:

الاسم: ${params.patientName}
الخدمة: ${params.serviceLabel}
التاريخ: ${params.appointmentDate}
الوقت: ${params.appointmentTime}
مرجع: ${params.referenceNumber}
`
    : `Nouveau rendez-vous réservé via le site :

Nom : ${params.patientName}
Soin : ${params.serviceLabel}
Date : ${params.appointmentDate}
Heure : ${params.appointmentTime}
Référence : ${params.referenceNumber}
`;

  await resend.emails.send({
    to: params.patientEmail,
    from: "no-reply@cliniqueselma.dz",
    subject: subjectPatient,
    text: bodyPatient,
  });

  if (adminEmail) {
    await resend.emails.send({
      to: adminEmail,
      from: "no-reply@cliniqueselma.dz",
      subject: subjectAdmin,
      text: bodyAdmin,
    });
  }
}

