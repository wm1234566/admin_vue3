import { defineStore } from 'pinia';
import { getItem, setItem } from '../utilities/Storage';
import { LANG } from '../utilities/Constant';
import Lang from '../utilities/BrowserLang';
// import { useI18n } from 'vue-i18n'
// import { ElMessage } from 'element-plus'

export const useLanguageStore = defineStore({
	id: 'language',
	state: () => ({
		language: getItem(LANG) || Lang(),
	}),
	getters: {},
	actions: {
		// 修改语言的方法
		setLanguage(lang) {
			setItem(LANG, lang); //设置本地语言
			this.language = lang; // 设置
		},
	},
});
