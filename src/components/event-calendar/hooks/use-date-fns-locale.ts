// hooks/use-date-fns-locale.ts
import { useTranslation } from "react-i18next";
import { fr, enUS } from "date-fns/locale";
import type { Locale } from "date-fns";

export const useDateFnsLocale = () => {
  const { i18n } = useTranslation();

  const localeMap: Record<string, Locale> = {
    fr,
    en: enUS,
  };

  return localeMap[i18n.language] ?? enUS;
};
