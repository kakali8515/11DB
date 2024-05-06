import { createI18n } from 'vue-i18n'
import en from '../locales/en.json';
import ko from '../locales/kr.json';

const messages = {
  en, 
  ko 
};

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
  warnHtmlInMessage: 'off'
});


export default i18n;