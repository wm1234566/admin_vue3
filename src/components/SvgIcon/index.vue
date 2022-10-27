<template>
	<img v-if="external" class="external_img" :src="props.icon" />

	<svg
		v-else
		class="svg-name"
		:class="className"
		style="
			 {
				&quot;width&quot;:&quot;50px&quot;,&quot;height&quot;: '50px';
			}
		"
		aria-hidden="true"
	>
		<use class="svg-use" :href="iconName" />
	</svg>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { isExternal } from '../../utilities/isExternal';
let props = defineProps({
	icon: {
		// 图标的地址
		type: String,
		required: true,
	},
	// 图标需要添加的类型
	className: {
		type: String,
		default: '',
	},
	// 图标的大小，在下面css中使用
	size: {
		type: String,
		default: '100%',
	},
});

const external = computed(() => isExternal(props.icon));

// const img_url=computed(()=>props.icon)
// console.log("结果是",styleExternal.value)
const iconName = computed(() => `#${props.icon}`);
</script>

<style scoped lang="scss">
.svg-icon {
	vertical-align: -0.1em;
	/* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 *
  /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */

	//width: 50px !important;
	//height: 50px !important;
}
.svg-name {
	width: v-bind(size) !important;
	height: v-bind(size) !important;
	overflow: hidden;
	cursor: pointer;
}
.external_img {
	background: url('https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png');
	width: v-bind(size) !important;
	height: v-bind(size) !important;
}
</style>
