import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// skip SSR env
if (typeof XMLHttpRequest !== 'undefined') {
  i18n.use(Backend)
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh-CN',

    // have a common namespace used around the full app
    ns: ['ui'],
    defaultNS: 'ui',

    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  })

export default i18n
