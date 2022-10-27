<template>
	<el-dialog v-model="status" :title="$t('msg.theme.prompt')" width="30%">
		<div class="color-picker">
			<h1>{{ $t('msg.theme.themeColorChange') }}</h1>
			<el-color-picker v-model="color" show-alpha :predefine="predefineColors" />
		</div>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="status = false">{{ $t('msg.universal.cancel') }}</el-button>
				<el-button type="primary" @click="changeColor">{{ $t('msg.universal.confirm') }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, defineProps, getCurrentInstance } from 'vue';
import { useCssVarStore } from '../../stores/cssVar';
import { setItem, getItem } from '../../utilities/Storage';
import { BGCOLOR } from '../../utilities/Constant';
let CssVar = useCssVarStore();
let Instance = getCurrentInstance();
Instance?.proxy?.$mitt?.on('changLanguage', function () {});
let Props = defineProps({
	status: {
		type: Boolean,
		default: false,
		required: true,
	},
});
// console.log("xxx",status,"sdfsd",Props)
const changeColor = () => {
	// console.log("22",status,Props,)
	// Props.status = false;
	Instance?.proxy?.$mitt?.emit('changDialog', false);
	CssVar.getCssVar.menuBg = color.value;
	setItem(BGCOLOR, color.value);
};
import { ElMessageBox } from 'element-plus';

// const dialogVisible = ref(false)

// 1.窗口点击确认时，获取当前颜色的值，
/*
 *  2.修改全局背景颜色
 *  3.存储再本地
 *  4.读取默认的颜色
 *
 *
 * */

const color = ref(getItem(BGCOLOR) || CssVar.getCssVar.menuBg);

const predefineColors = ref([
	'#ff4500',
	'#ff8c00',
	'#ffd700',
	'#90ee90',
	'#00ced1',
	'#1e90ff',
	'#c71585',
	'rgba(255, 69, 0, 0.68)',
	'rgb(255, 120, 0)',
	'hsv(51, 100, 98)',
	'hsva(120, 40, 94, 0.5)',
	'hsl(181, 100%, 37%)',
	'hsla(209, 100%, 56%, 0.73)',
	'#c7158577',
]);
</script>
<style scoped lang="scss">
.dialog-footer button:first-child {
	margin-right: 10px;
}
.color-picker {
	text-align: center;
	h1 {
		font-size: 14px;
		margin-bottom: 10px;
	}
	:deep(.el-color-picker) {
		//margin: 10px auto !important;
	}
}
</style>
