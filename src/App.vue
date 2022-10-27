<script setup>
import { ref, onBeforeMount } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import { useCssVarStore } from './stores/cssVar';
import { getItem } from './utilities/Storage';
import { BGCOLOR } from './utilities/Constant';

let CssVar = useCssVarStore();

const locale = ref(zhCn);

import { LANG } from './utilities/Constant';
import getlang from './utilities/BrowserLang';

// 没载入都 读取默认elementplus的语言包  注意自定义的语言包可以动态切换
let language = getItem(LANG) || getlang();

if (language === 'zh') {
	locale.value = zhCn;
}
if (language === 'en') {
	locale.value = en;
}

import { getCurrentInstance } from 'vue';
let Instance = getCurrentInstance();

// Instance?.proxy?.$mitt?.emit("my-event","A传递的值")
// 给顶级组件设置语言
Instance?.proxy?.$mitt.on('changLanguage', (para) => {
	// console.log("穿过来的值",para)
	if (para === 'zh') {
		locale.value = zhCn;
	}
	if (para === 'en') {
		locale.value = en;
	}
});
//设置默认背景色
onBeforeMount(() => {
	// 存在就修改为默认颜色
	if (getItem(BGCOLOR)) CssVar.getCssVar.menuBg = getItem(BGCOLOR);
});

//全局拖动
document.body.ondragstart = function (e) {
	if (e.path[0].nodeType === 3) {
		window.dom = e.path[1];
	} else {
		window.dom = e.path[0];
	}
	//   dom = e.target;
	console.log('全局拖动拖动', e, e.target);
};
</script>

<template>
	<el-config-provider :locale="locale">
		<router-view></router-view>
	</el-config-provider>
</template>

<style lang="scss" scoped>
:global(div#driver-highlighted-element-stage) {
	background: transparent !important;
	outline: 5000px solid rgba(0, 0, 0, 0.75);
}
:global(div#driver-page-overlay) {
	background: none !important;
}
</style>
