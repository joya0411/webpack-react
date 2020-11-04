import Cookies from 'cookies-js';
import {LANG} from 'app/cookieTypes';
import en from './en';
import zh from './zh';

const language = {
  'zh-cn': zh,
  'zh-hans-cn': zh,
  'en-us': en,
  en,
};

export const getLangMsg = (curLang = 'en-US') => {
  return language[curLang];
};

// 获得语言
export const t = (text) => {
  const curLang = Cookies.get(LANG) || navigator.language;
  const allMsg = language[curLang.toLowerCase()];
  return allMsg ? allMsg.custom[text] : text;
};
