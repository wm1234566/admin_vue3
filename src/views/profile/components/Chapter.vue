<!--项目性能-->

<template>
	<el-timeline>
		<el-timeline-item v-for="item in project?.data" :key="item.id" :timestamp="item.timestamp" placement="top">
			<el-card>
				<h4>{{ item.content }}</h4>
			</el-card>
		</el-timeline-item>
	</el-timeline>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
	project: {
		type: Object,
		default: null,
	},
});
</script>

<style scoped lang="scss"></style>
