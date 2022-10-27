<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-11 21:27:11
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-14 23:00:27
 * @FilePath: \element\ElementPlus\src\components\Clipboard\src\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 组件描述:  -->
<template>
	<span id="id">123123123</span>
	<el-button @click="WriteText('#id')">文本写入到剪切板</el-button>
	<br />
	<el-input v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="Please input" />

	<el-button @click="ReadText">粘贴到输入框</el-button>
</template>

<!-- 参数是传入组件的值，或者组件的 节点的class或者是组件的id -->
<script setup>
import { ref, toRefs, onBeforeMount, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

let textarea2 = ref('');

const ReadText = async () => {
	//是选择器

	try {
		let Text = await navigator.clipboard.readText();
		textarea2.value = Text;
		ElMessage({
			message: '写入文本成功！',
			grouping: true,
			type: 'success',
		});
	} catch (err) {
		ElMessage({
			message: '写入文本失败！',
			grouping: true,
			type: 'error',
		});
	}
};

const WriteText = async (Selector) => {
	if (Selector.startsWith('#') || Selector.startsWith('.')) {
		//是选择器
		let Dom = document.querySelector(Selector);
		if (Dom) {
			try {
				await navigator.clipboard.writeText(Dom.innerText);

				ElMessage({
					message: '复制文本成功！',
					grouping: true,
					type: 'success',
				});
			} catch (err) {
				ElMessage({
					message: '复制文本失败',
					grouping: true,
					type: 'error',
				});
			}
		}
	} else {
		try {
			await navigator.clipboard.writeText(Selector);

			ElMessage({
				message: '复制文本成功！',
				grouping: true,
				type: 'success',
			});
		} catch (err) {
			ElMessage({
				message: '复制文本失败！',
				grouping: true,
				type: 'error',
			});
		}
	}
};
</script>

<style scoped lang="scss"></style>
