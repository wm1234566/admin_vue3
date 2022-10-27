<template>
	<el-tooltip class="box-item" :effect="effect" :content="$t('msg.theme.themeChange')" placement="bottom">
		<SvgIcon id="guide-full" :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" size="24px" @click="onToggle"></SvgIcon>
	</el-tooltip>
</template>

<script setup>
import screenfull from 'screenfull';

import { defineProps } from 'vue';

defineProps({
	effect: {
		type: String,
		default: 'dark',
		validator(value) {
			return ['dark', 'light', 'customized'].includes(value);
		},
	},
});

// 是否全屏
const isFullscreen = ref(false);

// 监听变化
const change = () => {
	isFullscreen.value = screenfull.isFullscreen;
};

// 切换事件
const onToggle = () => {
	screenfull.toggle();
};

// 设置侦听器
onMounted(() => {
	screenfull.on('change', change);
});

// 删除侦听器
onUnmounted(() => {
	screenfull.off('change', change);
});
</script>

<style scoped lang="scss">
.svg-name {
	//margin-top: 13px !important;
	display: inline-block;
}
</style>
