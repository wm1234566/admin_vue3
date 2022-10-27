/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-07-11 22:01:10
 * @LastEditors: wumeng 2100172067@qq.com
 * @LastEditTime: 2022-10-27 11:06:13
 * @FilePath: \mksz542\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
// import { createPinia } from 'pinia'
import pinia from '../src/stores/store';
import App from './App.vue';
import router from './router';
// 导入全局样式表
// import '@/assets/styles/base.scss';
// 导入全局样式
import './styles/index.scss';

// 处理svg https://blog.csdn.net/weixin_53731501/article/details/125478380
import 'virtual:svg-icons-register';

// 引入axios
// import axios from "axios";
import instance from './utilities/Axios';

window.$http = instance; // 将axios添加到全局

// 全局动画
import 'animate.css';

const app = createApp(App);

import { Vue3Menus } from 'vue3-menus';
app.component('Vue3Menus', Vue3Menus); //只使用组件
//app.config.globalProperties.$menusEvent = menusEvent; // 只绑定方法

// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from './i18n/index.js';

import mitt from 'mitt';

const Mitt = mitt();

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	// console.log("组件名字", key);

	//   app.component("el-icon-" + toLine(key), component);
	app.component(key, component);
}

app.use(ElementPlus, {
	locale: zhCn,
});

// 给一个背景的初始值

// 挂在到全局
app.config.globalProperties.$mitt = Mitt;
// app.use(createPinia())

import DayJs from './utilities/DayJs';
DayJs(app);

// 注册 vant全局组件
import { NavBar, Icon, Col, Row } from 'vant';
import { Image as VanImage } from 'vant';
import { Field, CellGroup } from 'vant';
import { Button } from 'vant';
import { Notify } from 'vant';

app.use(Notify);

app.use(Button);

app.use(Field);
app.use(CellGroup);

app.use(VanImage);

// const app = createApp();
app.use(Col);
app.use(Row);
app.use(NavBar);
app.use(Icon);

// 自己的组件库
import myComponent from './components/Com';

app.use(myComponent);
app.use(router);
app.use(i18n);
app.use(pinia);
// 安装权限指令
import permission from './directive/v-permissions';
app.directive('permission', permission);

app.mount('#app');
