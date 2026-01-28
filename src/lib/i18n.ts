import fr from "@/messages/fr.json";
import ar from "@/messages/ar.json";

export type AppLocale = "fr" | "ar";

export const DEFAULT_LOCALE: AppLocale = "fr";

export async function getMessages(locale: AppLocale) {
  switch (locale) {
    case "ar":
      return ar;
    case "fr":
    default:
      return fr;
  }
}

