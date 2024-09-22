import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des fichiers de traduction
const resources = {
  en: {
    translation: {
      "welcome": "Welcome to our financial management!",
      "profile": "Profile",
      "logout": "Logout"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue dans notre gestion financière !",
      "profile": "Profil",
      "logout": "Déconnexion"
    }
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'fr', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
