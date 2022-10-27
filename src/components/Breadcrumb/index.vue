<template>
	<div class="breadcrumb">
		<el-breadcrumb id="guide-breadcrumb" separator="/">
			<TransitionGroup
				name="list"
				tag="div"
				leave-active-class="animate__animated animate__backOutRight"
				enter-active-class="animate__animated animate__backInRight"
			>
				<el-breadcrumb-item
					v-for="item in routeList"
					:key="item.meta.title"
					:class="item !== routeList[routeList.length - 1] ? 'breadcrumbStyle' : 'null'"
					:to="{ path: item.path }"
					>{{ generateTitle(item.meta.title) }}</el-breadcrumb-item
				>
			</TransitionGroup>
		</el-breadcrumb>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import generateTitle from '../../utilities/i18n';
let route = useRoute();
let routeList = ref([]);

watch(
	() => route.matched,
	() => {
		// 注意route.mathced这个数组是不能修改的，删除后不能正确的访问对应路由的组件！！！！！！！！！！！！！！！！！！！！！！！！
		routeList.value = [];
		for (let i = 1; i < route.matched.length; i++) {
			if (route.matched?.[i]?.path !== route.matched?.[i - 1]?.path) {
				routeList.value.push(route.matched?.[i - 1]);
				routeList.value.push(route.matched?.[i]);
			} else {
				routeList.value.push(route.matched?.[i - 1]);
			}
		}
		// console.log("路由",route.matched,routeList)
		// routeList.value=list
	},
	{
		immediate: true,
		deep: true,
	}
);
</script>

<style scoped lang="scss">
.breadcrumb {
	margin-left: 8px;
}
.el-breadcrumb {
	line-height: 50px;
}
.breadcrumbStyle:hover {
	color: #45262b;
}
</style>
