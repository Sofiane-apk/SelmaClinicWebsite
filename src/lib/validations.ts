import { z } from "zod";

export const appointmentSchema = z.object({
  serviceType: z.string().min(1, "Service requis"),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
  isEmergency: z.boolean().optional().default(false),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  phone: z
    .string()
    .min(6)
    .regex(/^\+213[0-9]{8,9}$/, "Format de téléphone algérien (+213)"),
  email: z.string().email("Email invalide"),
  dob: z.string().min(1, "Date de naissance requise"),
  isNewPatient: z.boolean(),
  reason: z.string().min(5, "Merci de préciser le motif"),
  medicalHistory: z.array(z.string()).optional(),
  acceptTerms: z
    .boolean()
    .refine((v) => v === true, "Vous devez accepter les conditions"),
  acceptPrivacy: z
    .boolean()
    .refine((v) => v === true, "Vous devez accepter la politique RGPD"),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

