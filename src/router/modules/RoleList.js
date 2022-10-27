import layout from '@/views/layout/index.vue';

export default {
	path: '/user',
	component: layout,
	redirect: '/user/manage',
	name: 'roleList',
	meta: {
		title: 'user',
		icon: 'personnel',
	},
	children: [
		{
			path: '/user/role',
			component: () => import(/* webpackChunkName: "role-list" */ '@/views/role-list/index.vue'),
			meta: {
				title: 'roleList',
				icon: 'role',
			},
		},
	],
};
