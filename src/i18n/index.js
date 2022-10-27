// 使用自定义语言包

import mZhLocale from './lang/zh';
import mEnLocale from './lang/en';
import getLang from '../utilities/BrowserLang';
import { getItem } from '../utilities/Storage';
import { LANG } from '../utilities/Constant';
import { useLanguageStore } from '../stores/language';
import pinia from '../stores/store';

const store = useLanguageStore(pinia); // 这里一定要把 pinia传入进去

const messages = {
	en: {
		msg: {
			// test:"hello word!"
			...mEnLocale,
		},
	},
	zh: {
		msg: {
			...mZhLocale,
			// test:"世界你好"
		},
	},
};
// 使用
//  <div class=""> {{ $t('msg.test') }}</div>

let locale = 'zh';
function getLocale() {
	if (getItem(LANG)) {
		locale = getItem(LANG);
	} else if (getLang()) {
		locale = getLang();
	}
	return locale;
}
//1.组件的模板中使用 $t()
//2.组件的js使用 i18n.t
//3.非组件中使用i18n.global.t
//4.切换组件还是要

import { createI18n } from 'vue-i18n';

const i18n = createI18n({
	// 使用 Composition API 模式，则需要将其设置为false
	legacy: false,
	// 全局注入 $t 函数
	globalInjection: true,
	locale: getLocale(),
	messages,
	// 防止使用v-html=“$t(“”)”的xss警告
	warnHtmlMessage: false,
});

export default i18n;
