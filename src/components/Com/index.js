/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-13 20:30:13
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-17 08:36:51
 * @FilePath: \element\ElementPlus\src\components\index.ts
 * @Description: q
 */

// import type { App } from "vue";

import chooseArea from './chooseArea';
import chooseicon from './chooseicon';
import clipboard from './Clipboard';
import menu from './menu';
import notificatin from './notificatin';
import list from './list';
import table from './table';
import chooseTime from './chooseTime';
import calendar from './calendar';
import Myhuanqi from './huanqi';
// 全部引入

let componets = [chooseArea, chooseicon, clipboard, menu, notificatin, list, table, chooseTime, calendar, Myhuanqi];
export default {
	install(app) {
		componets.forEach((item) => {
			app.use(item);
		});
	},
};
