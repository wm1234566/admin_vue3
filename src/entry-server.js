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

import { basename } from 'node:path';
import { renderToString } from 'vue/server-renderer';
// import { createApp } from './main'

export async function render(url, manifest) {
	const { app, router } = createApp();

	// set the router to the desired URL before rendering
	router.push(url);
	await router.isReady();

	// passing SSR context object which will be available via useSSRContext()
	// @vitejs/plugin-vue injects code into a component's setup() that registers
	// itself on ctx.modules. After the render, ctx.modules would contain all the
	// components that have been instantiated during this render call.
	const ctx = {};
	const html = await renderToString(app, ctx);

	// the SSR manifest generated by Vite contains module -> chunk/asset mapping
	// which we can then use to determine what files need to be preloaded for this
	// request.
	const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
	return [html, preloadLinks];
}

function renderPreloadLinks(modules, manifest) {
	let links = '';
	const seen = new Set();
	modules.forEach((id) => {
		const files = manifest[id];
		if (files) {
			files.forEach((file) => {
				if (!seen.has(file)) {
					seen.add(file);
					const filename = basename(file);
					if (manifest[filename]) {
						for (const depFile of manifest[filename]) {
							links += renderPreloadLink(depFile);
							seen.add(depFile);
						}
					}
					links += renderPreloadLink(file);
				}
			});
		}
	});
	return links;
}

function renderPreloadLink(file) {
	if (file.endsWith('.js')) {
		return `<link rel="modulepreload" crossorigin href="${file}">`;
	} else if (file.endsWith('.css')) {
		return `<link rel="stylesheet" href="${file}">`;
	} else if (file.endsWith('.woff')) {
		return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
	} else if (file.endsWith('.woff2')) {
		return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
	} else if (file.endsWith('.gif')) {
		return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
	} else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
		return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
	} else if (file.endsWith('.png')) {
		return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
	} else {
		// TODO
		return '';
	}
}