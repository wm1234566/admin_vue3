import layout from '@/views/layout/index.vue';

export default {
	path: '/article',
	component: layout,
	redirect: '/article/ranking',
	name: 'articleCreate',
	meta: { title: 'article', icon: 'article' },
	children: [
		{
			path: '/article/create',
			component: () => import(/* webpackChunkName: "article-create" */ '@/views/article-create/index.vue'),
			meta: {
				title: 'articleCreate',
				icon: 'article-create',
			},
		},
		{
			path: '/article/editor/:id',
			component: () => import(/* webpackChunkName: "article-create" */ '@/views/article-create/index.vue'),
			meta: {
				title: 'articleEditor',
			},
		},
	],
};
