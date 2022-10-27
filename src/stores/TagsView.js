import { defineStore } from 'pinia';
import { getItem, setItem } from '../utilities/Storage';
import { Tag } from '../utilities/Constant';

export const useTagsViewStore = defineStore({
	id: 'TagsView',
	state: () => ({
		CacheRoute: [],
	}),
	getters: {},
	actions: {
		// 固化
		async setTag() {
			// console.log("设置",JSON.stringify(this.CacheRoute))
			await setItem(Tag, JSON.stringify(this.CacheRoute)); //设置本地语言
		},

		getTag() {
			// console.log("获取",getItem(Tag))
			// this.CacheRoute= JSON.parse(getItem(Tag));
			//
		},
	},
});
