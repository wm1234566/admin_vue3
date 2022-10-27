<!--项目依赖版本-->

<template>
	<div class="demo-collapse">
		<el-collapse v-model="activeName" accordion>
			<el-collapse-item v-for="(item, index) in project?.data" :key="item.id" :title="item.title" :name="index">
				<div v-html="item.content"></div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

defineProps({
	project: {
		type: Object,
		default: null,
	},
});
const activeName = ref('1');
</script>

<style scoped lang="scss">
.demo-collapse {
	:deep(.el-collapse-item__header) {
		font-weight: 700 !important;
	}
	:deep(.el-collapse-item__content a) {
		color: #2d62f7;
		margin: 0 4px;
	}
}
</style>
