<template>
	<el-tooltip class="box-item" :content="$t('msg.navBar.guide')" placement="bottom">
		<SvgIcon id="guide-start" icon="guide" size="24px" @click="onClick"></SvgIcon>
	</el-tooltip>
</template>

<script setup>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import steps from './steps';
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
let i18n = useI18n();
let driver = ref(null);

const onClick = () => {
	driver.value = new Driver({
		// 禁止点击蒙版
		allowClose: false,
		closeBtnText: i18n.t('msg.guide.close'),
		nextBtnText: i18n.t('msg.guide.next'),
		prevBtnText: i18n.t('msg.guide.prev'),
	});

	driver.value.defineSteps(steps(i18n));
	driver.value.start();
};
</script>

<style scoped lang="scss"></style>
