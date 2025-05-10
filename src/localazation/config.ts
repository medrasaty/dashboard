import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en, ar } from "./translations";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: "en",
    resources: {
      en: en,
      ar: ar,
    },
  });
