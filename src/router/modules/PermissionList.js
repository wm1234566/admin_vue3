import layout from '@/views/layout/index.vue';

export default {
	path: '/user',
	component: layout,
	redirect: '/user/manage',
	name: 'permissionList',
	meta: { title: 'user', icon: 'personnel' },
	children: [
		{
			path: '/user/permission',
			component: () => import(/* webpackChunkName: "permission-list" */ '@/views/permission-list/index.vue'),
			meta: {
				title: 'permissionList',
				icon: 'permission',
			},
		},
	],
};
