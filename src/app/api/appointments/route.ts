import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validations";
import { supabaseAdmin } from "@/lib/supabase";
import { sendAppointmentEmails } from "@/lib/email";

function serviceLabel(value: string, locale: string) {
  const isAr = locale === "ar";
  switch (value) {
    case "general":
      return isAr ? "العلاج العام" : "Soins généraux";
    case "esthetic":
      return isAr ? "تجميل الأسنان" : "Dentisterie esthétique";
    case "surgery":
      return isAr ? "جراحة الفم" : "Chirurgie orale";
    case "emergency":
      return isAr ? "حالة طارئة" : "Urgence dentaire";
    default:
      return value;
  }
}

export async function POST(req: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { ok: false, message: "Supabase not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const parsedResult = appointmentSchema.safeParse(body);

    if (!parsedResult.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid data", errors: parsedResult.error.flatten() },
        { status: 400 }
      );
    }

    const parsed = parsedResult.data;

    // Basic availability checks
    // 1) Check blocked dates
    const { data: blockedDates, error: blockedError } = await supabaseAdmin
      .from("blocked_dates")
      .select("id")
      .eq("date", parsed.date)
      .limit(1);

    if (blockedError) {
      console.error("Error checking blocked dates", blockedError);
    }

    if (blockedDates && blockedDates.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Date non disponible (jour bloqué).",
        },
        { status: 409 }
      );
    }

    // 2) Check existing appointment at same date/time that is not cancelled
    const { data: existingAppointments, error: existingError } =
      await supabaseAdmin
        .from("appointments")
        .select("id")
        .eq("appointment_date", parsed.date)
        .eq("appointment_time", parsed.time)
        .neq("status", "cancelled")
        .limit(1);

    if (existingError) {
      console.error("Error checking existing appointments", existingError);
    }

    if (existingAppointments && existingAppointments.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Ce créneau est déjà réservé.",
        },
        { status: 409 }
      );
    }

    const referenceNumber = `SEL-${Date.now().toString(36).toUpperCase()}`;
    const fullName = `${parsed.firstName} ${parsed.lastName}`.trim();

    const { error: insertError } = await supabaseAdmin.from("appointments").insert({
      patient_name: fullName,
      patient_email: parsed.email,
      patient_phone: parsed.phone,
      patient_dob: parsed.dob,
      service_type: parsed.serviceType,
      appointment_date: parsed.date,
      appointment_time: parsed.time,
      reason: parsed.reason,
      medical_history: parsed.medicalHistory ?? [],
      status: "pending",
      is_emergency: parsed.isEmergency ?? false,
      reference_number: referenceNumber,
    });

    if (insertError) {
      console.error("Error inserting appointment", insertError);
      return NextResponse.json(
        { ok: false, message: "Erreur lors de l'enregistrement du rendez-vous." },
        { status: 500 }
      );
    }

    const locale = (body.locale as string) || "fr";
    const label = serviceLabel(parsed.serviceType, locale);

    // Fire-and-forget email sending (errors are logged but don't block response)
    sendAppointmentEmails({
      locale,
      patientEmail: parsed.email,
      patientName: fullName,
      appointmentDate: parsed.date,
      appointmentTime: parsed.time,
      serviceLabel: label,
      referenceNumber,
    }).catch((err) => {
      console.error("Error sending emails", err);
    });

    return NextResponse.json(
      {
        ok: true,
        referenceNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error in appointment POST", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}


