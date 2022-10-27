import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Profile from '@/views/profile/index.vue';
import { routerGrund } from '../utilities/Permission';
// 添加页面加载进度条
import layout from '@/views/layout/index.vue';

// 导入非组件中使用要是有导入的index

// import i18n from '../i18n/index'

/**
 * 私有路由表
 */
import ArticleCreaterRouter from './modules/ArticleCreate';
import ArticleRouter from './modules/Article';
import PermissionListRouter from './modules/PermissionList';
import RoleListRouter from './modules/RoleList';
import UserManageRouter from './modules/UserManage';
import Other from './modules/Other.js';

export const asyncRoutes = [RoleListRouter, UserManageRouter, PermissionListRouter, ArticleCreaterRouter, ArticleRouter, Other];

// const privateRoutes = [
//   {
//     path: '/user',
//     component: layout,
//     redirect: '/user/manage',
//     meta: {
//       title: 'user',
//       icon: 'personnel'
//     },
//     children: [
//       {
//         path: '/user/manage',
//         component: () => import('@/views/user-manage/index.vue'),
//         meta: {
//           title: 'userManage',
//           icon: 'personnel-manage'
//         }
//       },
//       {
//         path: '/user/role',
//         component: () => import('@/views/role-list/index.vue'),
//         meta: {
//           title: 'roleList',
//           icon: 'role'
//         }
//       },
//       {
//         path: '/user/permission',
//         component: () => import('@/views/permission-list/index.vue'),
//         meta: {
//           title: 'permissionList',
//           icon: 'permission'
//         }
//       },
//       {
//         path: '/user/info/:id',
//         name: 'userInfo',
//         // 将:id当props传递给组件
//         props: true,
//         component: () => import('@/views/user-info/index.vue'),
//         meta: {
//           title: 'userInfo'
//         }
//       },
//       {
//         path: '/user/import',
//         name: 'import',
//         component: () => import('@/views/import/index.vue'),
//         meta: {
//           title: 'excelImport'
//         }
//       }
//     ]
//   },
//   {
//     path: '/article',
//     component: layout,
//     redirect: '/article/ranking',
//     meta: {
//       title: 'article',
//       icon: 'article'
//     },
//     children: [
//       {
//         path: '/article/ranking',
//         component: () => import('@/views/article-ranking/index.vue'),
//         meta: {
//           title: 'articleRanking',
//           icon: 'article-ranking'
//         }
//       },
//       {
//         path: '/article/:id',
//         component: () => import('@/views/article-detail/index.vue'),
//         meta: {
//           title: 'articleDetail'
//         }
//       },
//       {
//         path: '/article/create',
//         component: () => import('@/views/article-create/index.vue'),
//         meta: {
//           title: 'articleCreate',
//           icon: 'article-create'
//         }
//       },
//       {
//         path: '/article/editor/:id',
//         component: () => import('@/views/article-create/index.vue'),
//         meta: {
//           title: 'articleEditor'
//         }
//       }
//     ]
//   }
// ]

// 公共路由
let publicRouter = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: {
			title: 'home',
		},
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			title: 'title',
		},
		component: () => import('../views/login/index.vue'),
	},
	{
		path: '/profile',
		name: 'profile',
		meta: {
			title: 'profile',
			icon: 'user1',
		},
		component: layout,

		children: [
			{
				path: '',
				name: 'prods',
				component: Profile,
			},
		],
	},
	{
		// 所用人都可以看到
		path: '/echarts',
		name: 'echarts',
		meta: {
			title: 'echarts',
			icon: 'chart',
		},
		component: layout,
		children: [
			{
				path: '',
				name: 'chart',
				component: () => import('../views/echarts/index.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	// history:
	//     process.env.NODE_ENV === 'production'
	//       ? createWebHistory()
	//       : createWebHashHistory(),
	routes: publicRouter,
});

routerGrund(router);

export default router;
