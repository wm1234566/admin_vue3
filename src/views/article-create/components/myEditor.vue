<!-- 组件描述:  -->

<template>
	<div class="editor-container">
		<div id="editor-box">
			<div style="border: 1px solid #ccc; margin-top: 10px">
				<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" mode="default" />
				<Editor
					v-model="valueHtml"
					style="height: 500px; overflow-y: hidden"
					:default-config="editorConfig"
					mode="default"
					@onCreated="handleCreated"
				/>
			</div>
		</div>

		<div class="bottom">
			<el-button type="primary" @click="onSubmitClick">{{ $t('msg.article.commit') }}</el-button>
		</div>
	</div>
</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted, watch, defineEmits } from 'vue';

import { useLanguageStore } from '../../../stores/language';
import { i18nChangeLanguage } from '@wangeditor/editor';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

let Language = useLanguageStore();

let Props = defineProps({
	title: {
		type: String,
		required: true,
	},
	data: Object,
});

const emit = defineEmits(['onSuccess']);

// / 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});

const handleCreated = (editor) => {
	editorRef.value = editor; // 记录 editor 实例，重要！
};

// 编辑相关
watch(
	() => Props.data,
	(val) => {
		if (val && val.content) {
			valueHtml.value = val.content;
		}
	},
	{
		deep: true,
		// immediate: true
	}
);
i18nChangeLanguage(Language.language === 'zh' ? 'zh-CN' : 'en');

watch(
	() => Language.language,

	() => {
		i18nChangeLanguage(Language.language === 'zh' ? 'zh-CN' : 'en');
	}
);

const onSubmitClick = async () => {
	if (Props.title.length > 1 && valueHtml.value.length > 10) {
		if (Props.data.content.length > 0 && Props.data.id) {
			// 是更新
			updateArticle({
				title: Props.title,
				content: valueHtml.value,
				id: Props.data.id,
			}).then(
				(data) => {
					if (data.success === true) {
						// valueHtml.value = ""
						// emit("onSuccess", true)
						ElMessage.success(i18n.t('msg.article.editorSuccess'));
					} else {
						ElMessage.error(data.message);
					}
				},
				(err) => {
					ElMessage.error(i18n.t('msg.excel.failed'));
				}
			);
		} else {
			// 是创建
			createArticle({
				title: Props.title,
				content: valueHtml.value,
			}).then(
				(data) => {
					if (data.success === true) {
						valueHtml.value = '';

						emit('onSuccess', true);
						ElMessage.success(i18n.t('msg.article.createSuccess'));
					} else {
						ElMessage.error(data.message);
					}
				},
				(err) => {
					ElMessage.error(i18n.t('msg.excel.failed'));
				}
			);
		}
	} else {
		ElMessage.error('文章标题大于1个字符,并且文章内容大于10个字符');
	}
};
</script>

<script>
export default {
	name: 'MyEditor',
};
</script>

<style lang="scss" scoped>
.editor-container {
	.bottom {
		margin-top: 20px;
		text-align: right;
	}
}
</style>
