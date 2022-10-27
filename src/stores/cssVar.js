/// 用于存储css动态样式，更改他们来更改主题

import { defineStore } from 'pinia';
//导入样式

import variables from '../assets/styles/variables.module.scss';

export const useCssVarStore = defineStore({
	id: 'default',
	state: () => ({
		getCssVar: variables,
		SidebarOpened: false,
	}),
	getters: {},
	actions: {
		// 修改菜单状体
		triggerSidebarOpened() {
			this.SidebarOpened = !this.SidebarOpened;
		},
	},
});
