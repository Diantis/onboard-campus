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
        language: "Changer la langue",
        lightMode: "Mode sombre",
        myAccount: "Mon Compte",
        securityPrivacy: "Sécurité et Confidentialité",
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
        language: "Change Language",
        lightMode: "Dark mode",
        myAccount: "My Account",
        securityPrivacy: "Security and Privacy",
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
