import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      english: "Anglais",
      french: "Français",
      Agenda: {
        Today: "Aujourd'hui",
      },
      Settings: {
        helpCenter: "Centre d'aide",
        language: "Changer la langue",
        lightMode: "Mode sombre",
        myAccount: "Mon compte",
        notifications: "Notifications",
        securityPrivacy: "Sécurité et confidentialité",
      },
    },
  },
  en: {
    translation: {
      displayTheme: "Customize the display and theme of the application.",
      english: "English",
      french: "French",
      Agenda: {
        Today: "Today",
      },
      Settings: {
        helpCenter: "Help center",
        language: "Change language",
        lightMode: "Dark mode",
        myAccount: "My account",
        notifications: "Notifications",
        securityPrivacy: "Security and privacy",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
