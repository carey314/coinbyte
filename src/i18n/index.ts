import { createI18n } from 'vue-i18n'
import enLocale from './config/en';
import zhLocale from './config/zh';
import { getStoredLanguage, saveStoredLanguage } from "../languageStorage";

// import { useUserInfoStore } from "../store/user";
// import { storeToRefs } from "pinia";
// const userInfoStore = useUserInfoStore();
// const { c } = storeToRefs(userInfoStore);
const messages = {
    简体中文: zhLocale,
    'English/USD': enLocale,
    '繁體中文': zhLocale, // 暂时使用简体中文的语言包
}

const defaultLocale = "English/USD";
const storedLocale = getStoredLanguage() || defaultLocale;

const i18n = createI18n({
    globalInjection: true, //全局生效$t
    fallbackLocale: 'English/USD',
    locale: storedLocale,
    legacy: false, // 解决legacy mode 报错
    messages
})


export default i18n;
