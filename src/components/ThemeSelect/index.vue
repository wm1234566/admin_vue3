<!-- 国际化图标的组件-->

<template>
	<div class="language">
		<el-dropdown trigger="click">
			<span class="el-dropdown-link">
				<el-tooltip class="box-item" :effect="effect" :content="$t('msg.theme.themeChange')" placement="bottom">
					<SvgIcon id="guide-theme" icon="change-theme" size="24px"></SvgIcon>
				</el-tooltip>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item @click="handleSetTheme">{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>

		<SelectColor :status="status"></SelectColor>
	</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { defineProps, computed, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import { useLanguageStore } from '../../stores/language';
import SelectColor from '../SelectColor/index.vue';

let Instance = getCurrentInstance();
defineProps({
	effect: {
		type: String,
		default: 'dark',
		validator(value) {
			return ['dark', 'light', 'customized'].includes(value);
		},
	},
});

let status = ref(false);

Instance?.proxy?.$mitt?.on('changDialog', function (para) {
	// console.log('status结果是1', status.value)
	status.value = para;
	// console.log('status结果是2', status.value)
});
const handleSetTheme = (lang) => {
	// status.value=false
	// console.log('status结果是3', status.value)
	status.value = !status.value;
	// console.log('status结果是4', status.value)
};
</script>

<style scoped lang="scss">
// 第五个图标
.language {
	:deep(span) {
		display: inline-block;
	}

	:deep(svg) {
		//margin-top: 8px !important;
		display: inline-block;
		margin: 0 auto;
	}
}
</style>
