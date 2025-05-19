import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      displayTheme: "Personnalise l'affichage et le thème de l'application.",
      language: "Langue",
      english: "Anglais",
      french: "Français",
      securityPrivacy:
        "Modifie les paramètres de sécurité et de confidentialité.",
      welcome: "Bienvenue sur l'application !",
      Agenda: {
        Today: "Aujourd'hui",
      },
    },
  },
  en: {
    translation: {
      displayTheme: "Customize the display and theme of the application.",
      language: "Language",
      english: "English",
      french: "French",
      securityPrivacy: "Modify security and privacy settings.",
      welcome: "Welcome to the app!",
      Agenda: {
        Today: "Today",
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
