/*
 * @Author: wumeng 2100172067@qq.com
 * @Date: 2022-09-07 15:17:55
 * @LastEditors: wumeng 2100172067@qq.com
 * @LastEditTime: 2022-10-27 09:43:01
 * @FilePath: \admin_vue3\src\entry-client.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSSRApp } from 'vue';
// import { createPinia } from 'pinia'
import pinia from '../src/stores/store';
// import App from './App.vue'
// import router from './router'
// 导入全局样式表
// import '@/assets/styles/base.scss';
// 导入全局样式
import './styles/index.scss';

// 处理svg https://blog.csdn.net/weixin_53731501/article/details/125478380
import 'virtual:svg-icons-register';

// 引入axios
// import axios from "axios";
import instance from './utilities/Axios';

// 全局动画
import 'animate.css';

// const app = createApp(App)
import { Vue3Menus } from 'vue3-menus';

//app.config.globalProperties.$menusEvent = menusEvent; // 只绑定方法
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from './i18n/index.js';

import mitt from 'mitt';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import DayJs from './utilities/DayJs';

import permission from './directive/v-permissions';
import App from './App.vue';
import createRouter from './router';

// app.mount('#app')

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
function createApp() {
	const app = createSSRApp(App);
	const router = createRouter();
	app.use(router);

	window.$http = instance; // 将axios添加到全局
	app.component('Vue3Menus', Vue3Menus); //只使用组件

	app.use(ElementPlus, {
		locale: zhCn,
	});

	// 给一个背景的初始值

	// 挂在到全局
	app.config.globalProperties.$mitt = mitt();
	// app.use(createPinia())

	DayJs(app);
	app.directive('permission', permission);
	// app.use(router)
	app.use(i18n);
	app.use(pinia);
	// 安装权限指令

	return { app, router };
}

const { app, router } = createApp();

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
	app.mount('#app');
});
