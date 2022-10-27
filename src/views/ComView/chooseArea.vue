<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-11 22:24:29
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 21:57:17
 * @FilePath: \element\ElementPlus\src\views\chooseArea.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 组件描述:  -->
<template>
	<div>
		<div :style="{ marginBottom: '30px' }">省市区选择</div>
		<my-choose-area @result="Result"></my-choose-area>

		<h1 v-if="result" :style="{ marginTop: '30px' }">
			你选择的地区是: {{ result.area.name }}----{{ result.city.name }}----{{ result.province.name }}----{{ result.town.name }}
		</h1>

		<huanqi></huanqi>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, onBeforeMount, onMounted } from 'vue';
// import huanqi from "../components/huanqi/src/index.vue";

let result = ref();
const Result = (value) => {
	console.log('执行了吗', value);

	result.value = value;
};
</script>
<style scoped lang="scss"></style>
