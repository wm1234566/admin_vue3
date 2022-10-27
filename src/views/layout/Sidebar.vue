<template>
	<div id="guide-sidebar">
		<div class="logo-container">
			<el-avatar :size="44" shape="square" :style="{ background: 'none' }" src="https://q1.qlogo.cn/g?b=qq&s=100&nk=2100173067" />
			<h1 v-if="!CssVar.SidebarOpened" class="logo-title">演示demo</h1>
		</div>

		<div class="menu-bottom">
			<el-menu
				:default-active="route.path"
				:active-text-color="CssVar.getCssVar.menuActiveText"
				:background-color="CssVar.getCssVar.menuBg"
				:text-color="CssVar.getCssVar.menuText"
				unique-opened
				:collapse="CssVar.SidebarOpened"
				router
			>
				<SidebarMenu v-for="item in routerlist" :key="item.path" :menu-item="item"></SidebarMenu>
			</el-menu>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { filterRouters, generateMenus } from '@/utilities/route';
import { useCssVarStore } from '@/stores/cssVar';

import SidebarMenu from './Sidebar/SidebarMenu.vue';

let CssVar = useCssVarStore();

const router = useRouter();
const route = useRoute(); //route.path,默认激活项，填入的参数是当前的路由，效果是默认打开当前项目

const filterRoutes = filterRouters(router.getRoutes());
// console.log(router.getRoutes())
// console.log(generateMenus(filterRoutes))

// console.log("颜色",CssVar.getCssVar.menuBg);
let menuBg = CssVar.getCssVar.menuBg;
// let routerlist = ref(filterRouter(router.getRoutes()))
let routerlist = ref(generateMenus(filterRoutes));
// const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
	height: 44px;
	padding: 10px 0 22px 0;
	display: flex;
	align-items: center;
	justify-content: center;

	.logo-title {
		margin-left: 10px;
		color: #fff;
		font-weight: 600;
		line-height: 50px;
		font-size: 16px;
		white-space: nowrap;
	}
}
</style>
