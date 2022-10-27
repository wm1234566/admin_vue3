// 路由跳转前钩子函数中 - 执行进度条开始加载
// 切换路由前，请求用户信息
import NProgress from './NProgress';
import { useAdminStore } from '@/stores/admin';
const withList = ['/login', '404.html', '/', '/favicon.ico', '/hash.js']; // 没登录也允许访问
import generateTitle from './i18n';
import { getItem } from '@/utilities/Storage';
export function routerGrund(router) {
	router.beforeEach(async (to, from, next) => {
		NProgress.start();

		let Admin = useAdminStore();

		// 每次路由切换看一下是存在用户信息，不存在则跳到登录页面
		// console.log('路由实例1:', to,"Admin++>",Admin.userData,"router",router.getRoutes())

		if (Admin.userData?.data?.username) {
			// console.log("路由实例2:",to,from)
			document.title = generateTitle(to.meta.title); // 设置标题

			// console.log('路由实例3:', to,"Admin++>",Admin.userData,"router",router.getRoutes())

			if (to.path === '/login') {
				next({ path: '/' });
			} else {
				// this.userData.data.permission.menus
				// if (
				//   Array.isArray(Admin.userData?.data?.permission.menus) &&
				//   Admin.userData?.data.permission.menus.length > 0
				// ) {
				//   for (let i = 0; i < Admin.userData?.data.permission.menus.length; i++) {
				//     for (let j = 0; j < asyncRoutes.length; j++) {
				//       if (Admin.userData?.data.permission.menus[i] === asyncRoutes[j].name) {
				//         router.addRoute(asyncRoutes[j])
				//       }
				//     }
				//   }
				//   router.addRoute({
				//     path: '/:catchAll(.*)',
				//     redirect: '/404'
				//   })

				//   // return next(to.path)
				// }

				next();
			}
		} else {
			if (getItem('token')) {
				await Admin.GetUserInfo();
			}

			// console.log('路由实例2:', to,"Admin++>",Admin.userData,"router:",router.getRoutes())

			if (Admin.userData?.data?.username) {
				next(to.path);
			} else {
				document.title = generateTitle(to.meta.title); // 设置标题
				// 没有登录
				if (withList.includes(to.path)) {
					next();
				} else {
					next({ path: '/login' });
				}
			}
		}
	});
	// 路由跳转后钩子函数中 - 执行进度条加载结束
	router.afterEach(() => {
		NProgress.done();
	});
}
