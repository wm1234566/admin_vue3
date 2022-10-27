import layout from '@/views/layout/index.vue';

export default {
	path: '/user',
	component: layout,
	redirect: '/user/manage',
	name: 'userManage',
	meta: {
		title: 'user',
		icon: 'personnel',
	},
	children: [
		{
			path: '/user/manage',
			component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-manage/index.vue'),
			meta: {
				title: 'userManage',
				icon: 'personnel-manage',
			},
		},
		{
			path: '/user/info/:id',
			name: 'userInfo',
			component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-info/index.vue'),
			props: true,
			meta: {
				title: 'userInfo',
			},
		},
		{
			path: '/user/import',
			name: 'import',
			component: () => import(/* webpackChunkName: "user-manage" */ '@/views/import/index.vue'),
			meta: {
				title: 'excelImport',
			},
		},
	],
};
