<!--
  文件描述：
  创建时间：2022/9/7 上午 10:22
-->

<template>
	<el-card>
		<h1>dependencies</h1>
		<el-table ref="table" :data="Data1" border style="width: 100%">
			<el-table-column type="index" :index="indexMethod" label="#" />
			<el-table-column prop="key" label="依赖" />
			<el-table-column prop="value" label="版本" />
		</el-table>

		<h1>devDependencies</h1>
		<el-table ref="table" :data="Data2" border style="width: 100%">
			<el-table-column type="index" :index="indexMethod" label="#" />
			<el-table-column prop="key" label="依赖" />
			<el-table-column prop="value" label="版本" />
		</el-table>
	</el-card>
</template>

<script setup>
import { ref } from 'vue';
import { dependencies, devDependencies } from '../../../../package.json';

const Data1 = ref([]);
const Data2 = ref([]);
for (let key in dependencies) {
	Data1.value.push({ key: key, value: dependencies[key] });
}
for (let key in devDependencies) {
	Data2.value.push({ key: key, value: devDependencies[key] });
}

const indexMethod = (index) => {
	return index + 1;
};
</script>

<script>
export default {
	name: 'DandV',
};
</script>

<style scoped lang="scss"></style>
