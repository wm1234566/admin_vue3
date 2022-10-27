<template>
	<el-sub-menu v-if="menuItem?.children?.length > 0" :index="menuItem.path">
		<template #title>
			<el-icon><SvgIcon :icon="menuItem.meta.icon" size="iconSize"></SvgIcon></el-icon>
			<span>{{ generateTitle(menuItem.meta.title) }}</span>
		</template>
		<SidebarMenu v-for="(item1, index) in menuItem.children" :key="item1.path" :menu-item="item1"></SidebarMenu>
	</el-sub-menu>

	<el-menu-item v-else :index="menuItem.path">
		<el-icon><SvgIcon :icon="menuItem.meta.icon" size="iconSize"></SvgIcon></el-icon>
		<template #title>{{ generateTitle(menuItem.meta.title) }}</template>
	</el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue';
import generateTitle from '../../../utilities/i18n';
defineProps({
	menuItem: {
		type: Object,
		required: true,
	},
});

let iconSize = ref('14px');
</script>

<script>
export default {
	name: 'SidebarMenu',
};
</script>
<style scoped lang="scss">
.el-icon {
	width: v-bind(iconSize) !important;
}
</style>
