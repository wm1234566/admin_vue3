<template>
	<div class="container" :class="[!CssVar.SidebarOpened ? 'openSidebar' : 'hideSidebar hidden']">
		<Sidebar class="sidebar-container" :style="{ backgroundColor: CssVar.$state.getCssVar.menuBg }"></Sidebar>

		<div class="main-container">
			<div class="fixed-header">
				<!--      顶部-->
				<Navbar></Navbar>
			</div>
			<!--         内容区-->
			<div class="content">
				<router-view v-slot="{ route, Component }">
					<transition :enter-active-class="`animate__animated animate__fadeInRight`">
						<keep-alive>
							<suspense>
								<template #default>
									<component :is="Component" :key="route.path" />
								</template>
								<template #fallback>
									<el-table
										v-loading="loading"
										element-loading-text="Loading..."
										:element-loading-spinner="svg"
										element-loading-svg-view-box="-10, -10, 50, 50"
										element-loading-background="rgba(122, 122, 122, 0.8)"
										style="width: 100%"
									>
									</el-table>
								</template>
							</suspense>
						</keep-alive>
					</transition>
				</router-view>
			</div>
		</div>
	</div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import 'animate.css';
import { ref } from 'vue';
import { useCssVarStore } from '../../stores/cssVar.js';

let CssVar = useCssVarStore();

const loading = ref(true);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
</script>

<style scoped lang="scss">
//scss中使用变量
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';
.container {
	@include clearfix;
	height: 100%;
}

.sidebar-container {
	position: fixed;
	width: #{$sideBarWidth};
	top: 0;
	left: 0;
	z-index: 10;
}
.fixed-header {
	transition: width 0.3s;
	position: fixed;
	width: calc(100% - #{$sideBarWidth});
	top: 0;
	right: 0;
	z-index: 10;
	//transition: all 0.3s;
}

.content {
	padding: 104px 20px 0 20px;
	box-sizing: border-box;
	background-color: white;
}

.main-container {
	margin-left: #{$sideBarWidth};
	width: auto !important;

	background-color: white;
}
.hidden {
	.main-container {
		margin-left: 54px;
	}
	.fixed-header {
		width: calc(100% - 54px);
	}
}

//loging
.example-showcase .el-loading-mask {
	z-index: 9;
}
</style>
