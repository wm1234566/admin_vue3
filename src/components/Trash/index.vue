<template>
	<el-tooltip class="box-item" :content="$t('msg.navBar.trash')" placement="bottom">
		<div id="trash" :class="sty ? 'trash' : ''" @click="Dark_modle">
			<!-- <SvgIcon icon="user" size="24px"></SvgIcon> -->
			<img src="../../assets/trash.png" width="24" height="24" />

			<!-- <image :src = require('@/assets/ljt.jpeg') /> -->
		</div>
	</el-tooltip>
</template>
<script setup>
import { ref, onMounted } from 'vue';

let sty = ref(false);

let DrakeState = ref(false);
// 暗夜模式
const Dark_modle = () => {
	if (DrakeState.value === true) {
		document.documentElement.setAttribute('theme', 'dark-mode');
		DrakeState.value = false;
	} else {
		document.documentElement.setAttribute('theme', '');
		DrakeState.value = true;
	}
};

onMounted(() => {
	let Trash = document.querySelector('#trash');

	//   // 丢弃到垃圾桶
	Trash.ondrop = function (e) {
		// 第二张方法  取出ID删除掉
		// var dom=document.getElementById(e.dataTransfer.getData("dom"))
		//  e.dataTransfer.files
		console.log('拖动的目标', e, e.dataTransfer, e.dataTransfer.files);
		window.dom.remove();
		sty.value = false;
		// document.body.removeChild(window.dom)
	};
	// 让这个元素可以被放置
	Trash.ondragover = function (e) {
		e.preventDefault();
	};
	Trash.ondragenter = function (e) {
		e.dataTransfer.dropEffect = 'copy';
		sty.value = true;
		e.preventDefault();
	};
});
</script>

<style lang="scss" scoped>
.trash {
	background-color: aqua;
}
</style>
