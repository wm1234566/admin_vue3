<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-02 21:05:46
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-23 09:27:32
 * @FilePath: \element\ElementPlus\src\views\ChooseiconView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
		<my-choose-icon v-model:visible="visible">
			选择你需要的图标
			<template #icon="{ IconName }">
				<!-- 传入一个图标 -->
				<!-- 点击后修改的图标名字 IconName -->
				<el-icon v-if="IconName"> <component :is="IconName"></component></el-icon>
				<el-icon v-else><Upload /></el-icon>
			</template>
		</my-choose-icon>
		<br />
		<br />
		<br />
		<br />
		<br />
		<my-clip-board></my-clip-board>
	</div>
</template>
<script setup>
import { ref } from 'vue';
//import ChooseIcon from "../components/chooseicon/src/index.vue";
//import Clipboard from "../components/Clipboard/src/index.vue";
let visible = ref(false);

// let count=reactive({num:1})
//   setInterval(()=>{
//    count.num++
//
//
// },2000)
</script>
<style></style>
