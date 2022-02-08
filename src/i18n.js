import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import en from "@/locales/en.json"
import tr from "@/locales/tr.json"


export default new VueI18n({
  locale: localStorage.getItem('lang') || 'tr',
  fallbackLocale: 'en',
  messages: {
    en: en,
    tr: tr,
  }
})