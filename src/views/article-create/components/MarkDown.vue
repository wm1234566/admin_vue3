<!-- 组件描述:  -->
<template>
	<div>
		<div id="markdown-box"></div>

		<div class="bottom">
			<el-button type="primary" @click="onSubmitClick">{{ $t('msg.article.commit') }}</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';

import MkEditor from '@toast-ui/editor';

import { useLanguageStore } from '../../../stores/language';

import { createArticle, updateArticle } from '../../../utilities/Request';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

let i18n = useI18n();

let Language = useLanguageStore();
// // Editor实例
let mkEditor;
// // 处理离开页面切换语言导致 dom 无法被获取

let el;

onMounted(() => {
	el = document.querySelector('#markdown-box');
	initEditor();
	// 如果是修改则添加上
});

let Props = defineProps({
	title: {
		type: String,
		required: true,
	},
	data: Object,
});

const initEditor = () => {
	mkEditor = new MkEditor({
		el,
		height: '500px',
		previewStyle: 'vertical',
		language: Language.language === 'zh' ? 'zh-CN' : 'en',
	});

	mkEditor.getMarkdown();
};
const emit = defineEmits(['clearTitle']);

const onSubmitClick = () => {
	// console.log('文章尼尔', mkEditor.getHTML(), Props.data);

	if (Props.title.length > 1 && mkEditor.getHTML().length > 10) {
		if (Props.data.content.length > 0 && Props.data.id) {
			// 是更新
			updateArticle({
				title: Props.title,
				content: mkEditor.getHTML(),
				id: Props.data.id,
			}).then(
				(data) => {
					if (data.success === true) {
						// mkEditor.setHTML("")
						// emit("clearTitle", true)
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
				content: mkEditor.getHTML(),
			}).then(
				(data) => {
					if (data.success === true) {
						mkEditor.setHTML('');

						emit('clearTitle', true);

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

//国际化处理

watch(
	() => Language.language,
	() => {
		if (!el) return;
		const htmlStr = mkEditor.getHTML();
		mkEditor.destroy();
		initEditor();
		mkEditor.setHTML(htmlStr);
	}
);

watch(
	() => Props.data,
	() => {
		initEditor();
		// 如果是修改则添加上
		if (Props.data.content) {
			mkEditor.setHTML(Props.data.content);
		}
	},
	{
		deep: true,
	}
);
</script>
<script>
export default {
	name: 'MarkDown',
};
</script>
<style scoped lang="scss">
.bottom {
	// float: right;
	margin-top: 20px;
	text-align: right;
}
</style>
