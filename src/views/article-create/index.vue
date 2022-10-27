<template>
	<el-card class="box-card">
		<el-input v-model="title" class="inputTitle" :placeholder="$t('msg.article.titlePlaceholder')" maxlength="20" clearable autofocus />
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane :label="$t('msg.article.markdown')" name="first">
				<MarkDown :title="title" :data="Data" @clearTitle="clearTitle"></MarkDown>
			</el-tab-pane>
			<el-tab-pane :label="$t('msg.article.richText')" name="second">
				<myEditor :title="title" :data="Data" @onSuccess="clearTitle"></myEditor>
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script setup>
import { ref } from 'vue';
import myEditor from './components/myEditor.vue';
import MarkDown from './components/MarkDown.vue';

import { updateArticle, Article } from '../../utilities/Request';
import { useRoute } from 'vue-router';

// let { title, id, content, activeName, handleClick, clearTitle } = useIndex()
// let Route = useRoute()

const title = ref('');
const Data = ref({ id: '', content: '' });

const activeName = ref('first');

let Route = useRoute();

// console.log('Route1', Route.params.id);

if (Route.params?.id) {
	Article(Route.params.id).then(
		(data) => {
			if (data.success === true) {
				// console.log('Route2', Route.params.id);
				title.value = data.data.title;
				Data.value = { content: data.data.content, id: Route.params.id };
			} else {
				ElMessage.error('失败');
			}
		},
		(err) => {}
	);
}

const handleClick = (tab, event) => {
	console.log(tab, event);
};

const clearTitle = () => {
	title.value = '';
	Data.value.content = '';
};
</script>

<style lang="scss" scoped>
.box-card {
	:deep(.inputTitle) {
		margin-bottom: 20px;

		.el-input__wrapper {
			box-shadow: none;
		}
	}
}
</style>
