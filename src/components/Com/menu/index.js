/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-13 20:56:07
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 20:57:36
 * @FilePath: \element\ElementPlus\src\components\menu\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import type { App } from "vue";
import menu from './src/index.vue';
import infiniteMenu from './src/menu.jsx';

// 让这个组件可以通过use的形式使用
export default {
	install(app) {
		app.component('MMenu', menu);
		app.component('MInfiniteMenu', infiniteMenu);
	},
};
