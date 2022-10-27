<!-- 国际化图标的组件-->

<template>
	<div class="language">
		<el-dropdown trigger="click">
			<span class="el-dropdown-link">
				<el-tooltip class="box-item" :effect="effect" :content="$t('msg.navBar.lang')" placement="bottom">
					<SvgIcon id="guide-lang" icon="language" size="24px"></SvgIcon>
				</el-tooltip>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item :disabled="language === 'zh'" @click="language === 'zh' ? 'null' : handleSetLanguage('zh')">中文</el-dropdown-item>
					<el-dropdown-item :disabled="language === 'en'" @click="language === 'en' ? 'null' : handleSetLanguage('en')">English</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { defineProps, computed, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import { useLanguageStore } from '../../stores/language';

defineProps({
	effect: {
		type: String,
		default: 'dark',
		validator(value) {
			return ['dark', 'light', 'customized'].includes(value);
		},
	},
});

let Language = useLanguageStore();
let language = computed(() => Language.language);
let Instance = getCurrentInstance();
// 切换语言的方法
const i18n = useI18n();
const handleSetLanguage = (lang) => {
	// 切换自定义语言
	i18n.locale.value = lang;

	// 切换element-plus语言
	Instance?.proxy?.$mitt?.emit('changLanguage', lang);

	// 修改本地语言
	Language.setLanguage(lang);

	ElMessage({
		showClose: true,
		message: i18n.t('msg.toast.switchLangSuccess'),
		type: 'success',
	});
	// location.reload();//
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
