<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-14 20:14:01
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-14 21:45:42
 * @FilePath: \element\ElementPlus\src\views\Notificatin.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 组件描述:  -->
<template>
	<div>
		<h1>通知菜单组件</h1>

		<my-notificatin :value="10" :max="5" :width="300">
			<!-- <template #icon
        ><el-icon></template> -->
			<template #content>
				<my-list :list="list" :actions="actions" @clickItem="clickItem" @clickAction="clickAction"></my-list>
			</template>
		</my-notificatin>
	</div>
</template>

<script setup>
import { ref, toRefs, onBeforeMount, onMounted } from 'vue';
import { list, actions } from './Notificatin';

let clickItem = (val) => {
	console.log('click', val);
};
let clickAction = (val) => {
	console.log(val);
};
</script>
<style scoped lang="scss"></style>
