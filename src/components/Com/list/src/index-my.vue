<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-14 21:21:22
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-14 21:32:17
 * @FilePath: \element\ElementPlus\src\components\list\src\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 组件描述:  -->
<template>
	<el-tabs v-model="activeName" class="demo-tabs" stretch @tab-click="handleClick">
		<el-tab-pane label="通知" name="first">通知1</el-tab-pane>
		<el-tab-pane label="发布" name="second">发布1</el-tab-pane>
		<el-tab-pane label="代表" name="third">代办1</el-tab-pane>
	</el-tabs>
</template>

<script setup>
// import type { TabsPaneContext } from "element-plus";
import { ref } from 'vue';
const activeName = ref('first');
const handleClick = (tab, event) => {
	console.log(tab, event);
};
</script>
<style scoped lang="scss"></style>
