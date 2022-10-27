/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-18 20:30:46
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-20 15:30:13
 * @FilePath: \mksz542\src\views\ComView\uploadFiles\utils\localstorage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function saveObjArr(name, data) {
	// localStorage 存储数组对象的方法
	localStorage.setItem(name, JSON.stringify(data));
}

export function getObjArr(name) {
	// localStorage 获取数组对象的方法
	const res = window.localStorage.getItem(name);
	if (res && res !== 'undefined') {
		return JSON.parse(res);
	}
	return false;
}

export function clearLocalStorage(name) {
	localStorage.removeItem(name);
}
