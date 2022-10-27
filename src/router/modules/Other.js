/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-17 08:50:27
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-18 20:14:08
 * @FilePath: \mksz542\src\router\modules\Other.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import layout from '@/views/layout/index.vue';

export default {
	path: '/other',
	component: layout,
	redirect: '/other/chooseicon',
	name: 'Other',
	meta: { title: 'other', icon: 'article' },
	children: [
		{
			path: '/other/chooseicon',
			name: 'chooseicon',
			component: () => import(/* webpackChunkName: "ChooseiconView" */ '@/views/ComView/ChooseiconView.vue'),
			meta: { title: 'chooseicon', icon: 'article' },
		},
		{
			path: '/other/choosearea',
			name: 'choosearea',
			component: () => import('@/views/ComView/chooseArea.vue'),
			meta: { title: 'choosearea', icon: 'article' },
		},
		{
			path: '/other/notification',
			name: 'notification',
			component: () => import('@/views/ComView/Notificatin.vue'),
			meta: { title: 'notification', icon: 'article' },
		},
		{
			path: '/other/table',
			name: 'table',
			component: () => import('@/views/ComView/table/index.vue'),
			meta: { title: 'table', icon: 'article' },
		},
		{
			path: '/other/chooseTime',
			name: 'chooseTime',
			component: () => import('@/views/ComView/chooseTime/index.vue'),
			meta: { title: 'chooseTime', icon: 'article' },
		},

		{
			path: '/other/calendar',
			name: 'calendar',
			component: () => import('@/views/ComView/calendar/index.vue'),
			meta: { title: 'calendar', icon: 'article' },
		},

		{
			path: '/other/uploadfiles',
			name: 'uploadfiles',
			component: () => import('@/views/ComView/uploadFiles/app.vue'),
			meta: { title: 'uploadfiles', icon: 'article' },
		},
		{
			path: '/other/qrcode',
			name: 'qrcode',
			component: () => import('@/views/ComView/qrcode/index.vue'),
			meta: { title: 'qrcode', icon: 'article' },
		},
		{
			path: '/other/filespreview',
			name: 'filespreview',
			component: () => import('@/views/ComView/filesPreview/index.vue'),
			meta: { title: 'filespreview', icon: 'article' },
		},
		{
			path: '/other/websocket',
			name: 'websocket',
			component: () => import('@/views/ComView/websocket/index.vue'),
			meta: { title: 'websocket', icon: 'article' },
		},
	],
};
