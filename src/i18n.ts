import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  // load translations from /public/locales
  .use(HttpBackend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    fallbackLng: "ar",
    supportedLngs: ["en", "ar"],
    ns: ["common"],
    defaultNS: "common",
    debug: process.env.NODE_ENV === "development",
    interpolation: { escapeValue: false },
    backend: {
      // the path where resources get loaded from
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      // read language from URL (/en/…, /de/…), then cookie, then header
      order: ["path", "cookie", "header"],
      caches: ["cookie"],
      lookupFromPathIndex: 0,
    },
  });

export default i18n;