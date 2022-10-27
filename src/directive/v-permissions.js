/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-08-16 22:47:32
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-16 20:26:00
 * @FilePath: \mksz542\src\directive\v-permissions.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import pinia from '../stores/store';
import { useAdminStore } from '../stores/admin';

const Admin = useAdminStore(pinia); // 这里一定要把 pinia传入进去

function checkPermissions(el, binding) {
	console.log('打印');
	let { value } = binding;
	if (Array.isArray(value)) {
		let flags = Admin.userData.data.permission.points.some((item) => {
			return value.includes(item);
		});
		if (!flags) {
			el.parentNode.removeChild(el);
		}
	} else {
		new Error('参数必须是数组');
	}
}

export default {
	mounted(el, binding, vnode, prevVnode) {
		checkPermissions(el, binding);
	},
	onUpdated(el, binding) {
		checkPermissions(el, binding);
	},
};
