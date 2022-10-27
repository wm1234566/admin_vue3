<template>
	<div id="guide-tags" class="Tags-view-container">
		<el-scrollbar>
			<!--              <router-link to='#' class='tage-view-item' @contextmenu='rightClick'>角色管理</router-link>-->

			<router-link
				v-for="(item, index) in TagsView.CacheRoute"
				:id="'tage-item-' + index"
				:to="item.path"
				class="tage-view-item"
				:class="{ checked: item.isShow }"
				@click.stop.self.prevent="SelectItem(index)"
				@contextmenu="ContextMenu($event, { index: index, item: item })"
			>
				{{ generateTitle(item.title) }}

				<el-icon v-if="!item.isShow" size="12px" @click.prevent="DeletItme(index)">
					<CircleClose />
				</el-icon>
			</router-link>
		</el-scrollbar>

		<vue3-menus :open="open" :event="event" :menus="menus" :args="args"> </vue3-menus>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Vue3Menus } from 'vue3-menus';
import { CircleClose } from '@element-plus/icons-vue';
import { useCssVarStore } from '../../stores/cssVar.js';
import { useTagsViewStore } from '../../stores/TagsView';
import { useRoute, useRouter } from 'vue-router';
import { getItem } from '../../utilities/Storage';

// 国际化
import generateTitle from '../../utilities/i18n';

import { useI18n } from 'vue-i18n';

let i18n = useI18n();

let CssVar = useCssVarStore();

let menuBg = computed(() => {
	return CssVar.getCssVar.menuBg;
});

let Route = useRoute();
let Router = useRouter();
let TagsView = useTagsViewStore();

// 选择一个选项
const SelectItem = (index) => {
	if (TagsView.CacheRoute.length > 0) {
		// 清除其他样式
		TagsView.CacheRoute.map((item) => {
			item.isShow = false;
		});
	}
	TagsView.CacheRoute[index].isShow = true;
};
const DeletItme = (index) => {
	//删除一项
	TagsView.CacheRoute.splice(index, 1);
};

onBeforeMount(() => {
	// console.log('before')
	TagsView.CacheRoute = getItem('tag') || [];
});

// 监听
TagsView.$subscribe(
	(args, state) => {
		//存储一下
		// console.log('数据变动了', args, '====>', state, TagsView.CacheRoute)

		TagsView.setTag();
	},
	{
		detached: true,
	}
);

watch(
	Route,
	async () => {
		// console.log('当前路由', Route, Route.path, TagsView.CacheRoute, TagsView.CacheRoute.length)

		// 需要的数据是:[ {tiele:xxx,isSelect,component:xx,path}]
		// 文字，标记是否选中，组件

		// console.log('全局路由', Router.getRoutes(), Route.path)
		await TagsView.CacheRoute?.length;

		let exclude = ['/login', '/'];
		// console.log(
		//   'ddd',
		// //   exclude.includes(Route.path),
		//   /^(\/user\/info\/|\/article\/)/.test(Route.path)
		// )
		// 需要排除一些路由
		if (exclude.includes(Route.path)) {
		} else {
			if (TagsView.CacheRoute?.length > 0) {
				// 清除其他样式
				TagsView.CacheRoute.map((item) => {
					item.isShow = false;
				});

				let Index = 0;
				// 是否有重复
				let isRepetition = TagsView.CacheRoute.every((item, index) => {
					if (item.path === Route.path) {
						Index = index;
						return false;
					} else {
						return true;
					}
				});

				// 没有重复路由
				if (isRepetition === true) {
					// TagsView.CacheRoute.push({title:Route.meta.title,isShow:true,path:Route.path,Compoent:Route.matched[Route.matched.length-1].components})
					TagsView.CacheRoute.push({ title: Route.meta.title, isShow: true, path: Route.path });
				} else {
					// 重复的设为true
					TagsView.CacheRoute[Index].isShow = true;
				}
				// 有重复就不添加
			} else {
				//读取本地存储

				TagsView.CacheRoute.push({ title: Route.meta.title, isShow: true, path: Route.path });
				// console.log('当前路由2', Route, Route.path, TagsView.CacheRoute, TagsView.CacheRoute.length)
			}
		}
	},
	{
		immediate: true,
	}
);

let checked = ref(false);

// 改变背景
const ContextMenu = ($event, arg) => {
	menus.value = [
		{
			label: i18n.t('msg.tagsView.refresh'), //i18n.t('msg.tagsView.refresh'),
			click: () => {
				window.location.reload();
			},
		},
		{
			label: i18n.t('msg.tagsView.closeRight'),
			click: (e, arg) => {
				// 如果右侧没有则啥都不做
				if (arg.index > 0) {
					// 如果右侧是当前页面，删除后跳转到，第一个页面
					if (TagsView.CacheRoute[arg.index - 1].isShow === true) {
						// 条到第一页
						Router.push({ path: TagsView.CacheRoute[0].path });
					}

					TagsView.CacheRoute.splice(arg.index - 1, 1);
				}

				open.value = false;
				// return false
			},
		},
		{
			label: i18n.t('msg.tagsView.closeOther'),
			click: (e, arg) => {
				TagsView.CacheRoute = [];
				if (arg.item.isShow === true) {
					// 如果是当前页
					TagsView.CacheRoute.push(arg.item);
				} else {
					Router.push({ path: arg.item.path });
				}
				open.value = false;
				// return false
			},
		},
	];

	rightClick($event, arg);
};

const open = ref(false);
const event = ref({});
let args = ref({});

const menus = ref([
	{
		label: i18n.t('msg.tagsView.refresh'), //i18n.t('msg.tagsView.refresh'),
		click: () => {
			window.location.reload();
		},
	},
	{
		label: i18n.t('msg.tagsView.closeRight'),
		click: (e, arg) => {
			// 如果右侧没有则啥都不做
			if (arg.index > 0) {
				// 如果右侧是当前页面，删除后跳转到，第一个页面
				if (TagsView.CacheRoute[arg.index - 1].isShow === true) {
					// 条到第一页
					Router.push({ path: TagsView.CacheRoute[0].path });
				}

				TagsView.CacheRoute.splice(arg.index - 1, 1);
			}

			open.value = false;
			// return false
		},
	},
	{
		label: i18n.t('msg.tagsView.closeOther'),
		click: (e, arg) => {
			TagsView.CacheRoute = [];
			if (arg.item.isShow === true) {
				// 如果是当前页
				TagsView.CacheRoute.push(arg.item);
			} else {
				Router.push({ path: arg.item.path });
			}

			open.value = false;
			// return false
		},
	},
]); // 对应下面菜单数据

function rightClick(e, arg) {
	open.value = false;

	nextTick(() => {
		args.value = arg;
		event.value = e;
		open.value = true;
	});
	e.preventDefault();
}
</script>

<style scoped lang="scss">
.Tags-view-container {
	min-width: 530px;
	height: 34px;
	width: 100%;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
	overflow: hidden;
	padding-left: 16px;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	.tage-view-item {
		display: inline-block;
		//position: relative;
		//background-color: ;
		cursor: pointer;
		height: 26px;
		line-height: 26px;
		font-size: 12px;
		border: 1px solid #d8dce5;
		color: #495060;
		background: #fff;
		padding: 0 8px;

		margin-right: 5px;
		margin-top: 4px;

		.el-icon {
			vertical-align: -0.15em;
		}
	}
}

//修改全局样式
:global(.v3-menus) {
	z-index: 12 !important;
	font-size: 12px !important;
}

.checked {
	background-color: v-bind(menuBg) !important;
	color: white !important;

	&::before {
		display: inline-block;
		content: '';
		background-color: white;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin: 0 2px 0 0;
	}
}
</style>
