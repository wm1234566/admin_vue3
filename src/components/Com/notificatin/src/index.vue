<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-14 20:11:44
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-23 20:12:18
 * @FilePath: \element\ElementPlus\src\components\notificatin\src\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 组件描述:  -->
<template>
	<el-popover ref="popover" placement="bottom" :width="width" :trigger="trigger">
		<template #reference>
			<!-- 点击的按钮 -->
			<el-badge :value="value" class="item" :max="max" :is-dot="isDot" :type="type">
				<!-- <el-button>comments</el-button> -->
				<el-icon v-if="!$slots.icon"><Bell /></el-icon>
				<slot v-else name="icon"></slot>
			</el-badge>
		</template>
		<!-- 默认插槽展示点击后的内容 -->
		<template #default>
			<slot v-if="$slots.content" name="content"> </slot>
			<div v-else>没有使用内容插槽</div>
		</template>
	</el-popover>
</template>

<script setup>
import { useSlots } from 'vue';

let solt = useSlots();
console.log(solt);

let props = defineProps({
	value: { type: Number, default: 3 },
	max: { type: Number, default: 10 },
	isDot: { type: Boolean, default: false },

	type: { type: String, default: 'warning' },
	trigger: { type: String, default: 'click' },
	width: { type: Number, default: 200 },
});

// {
//   value: "",
//   max: 10, // 大于默认99
//   isDot: false, // 默认不显示小圆点
//   type: "danger", // 默认的的类型
//
//   trigger: "click", //默认触发方式是点击
//   width: 200, //默认宽度
// }
</script>
<style scoped lang="scss"></style>
