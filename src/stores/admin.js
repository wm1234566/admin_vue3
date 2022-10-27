//来处理所有的关于用户信息的操作，例如获取用户信息，登录等

import { defineStore } from 'pinia';
import { getUserInfo, login } from '../utilities/Request';
import { removeItem, clear } from '../utilities/Storage';
import { TOKEN } from '../utilities/Constant';

import router, { asyncRoutes } from '../router/index';

import md5 from 'md5';

export const useAdminStore = defineStore({
	id: 'admin',
	state: () => ({
		userData: {},
	}),
	actions: {
		// 登录
		async Login(FormData) {
			// console.log(FormData)
			// result
			return await login({ ...FormData, password: md5(FormData.password) }); ///!!result?.data.username
		},
		// 获取用户信息
		async GetUserInfo() {
			let result = await getUserInfo();
			// console.log('rs', result)
			if (result.code === 200) {
				this.userData = result;
				console.log('获取用户信息成功', this.userData.data.permission.menus, '路由=》', asyncRoutes);

				if (Array.isArray(result.data.permission.menus) && result.data.permission.menus.length > 0) {
					for (let i = 0; i < result.data.permission.menus.length; i++) {
						for (let j = 0; j < asyncRoutes.length; j++) {
							if (result.data.permission.menus[i] === asyncRoutes[j].name) {
								router.addRoute(asyncRoutes[j]);
							}
						}
					}

					router.addRoute(asyncRoutes[5]);

					router.addRoute({
						path: '/:catchAll(.*)',
						redirect: '/404',
					});
				}

				// console.log('路由', router.getRoutes(), router.currentRoute.path, route)
				// if (!this.userData) router.push({ path: router.currentRoute.path })
			} else {
				this.userData = 'null';
				removeItem(TOKEN);
			}
		},
		// 退出登录
		logOut(router) {
			//删除所有路由
			this.userData.data.permission.menus.forEach((item) => {
				router.removeRoute(item);
			});
			console.log('路由', router.getRoutes());
			clear();
			router.push({ name: 'login' });
		},
	},
});
