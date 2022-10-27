import layout from '@/views/layout/index.vue';

export default {
	path: '/article',
	component: layout,
	redirect: '/article/ranking',
	name: 'articleRanking',
	meta: { title: 'article', icon: 'article' },
	children: [
		{
			path: '/article/ranking',
			component: () => import(/* webpackChunkName: "article-ranking" */ '@/views/article-ranking/index.vue'),
			meta: {
				title: 'articleRanking',
				icon: 'article-ranking',
			},
		},
		{
			path: '/article/:id',
			component: () => import(/* webpackChunkName: "article-ranking" */ '@/views/article-detail/index.vue'),
			meta: {
				title: 'articleDetail',
			},
		},
	],
};
