<template>
	<div class="profile-container">
		<el-row :gutter="20">
			<el-col :span="6">
				<ProjectCard :project="data?.[0]?.[0] || null" />
			</el-col>

			<el-col :span="18">
				<el-card class="box-card">
					<el-tabs v-model="activeName" class="demo-tabs">
						<!--            <el-tab-pane :label="$t('msg.profile.feature')" name="first"-->
						<!--              ><Feature :project="data?.[0]?.[0]"></Feature-->
						<!--            ></el-tab-pane>-->
						<!--            <el-tab-pane :label="$t('msg.profile.chapter')" name="second"-->
						<!--              ><Chapter :project="data?.[0]?.[1]"></Chapter-->
						<!--            ></el-tab-pane>-->
						<el-tab-pane label="浏览器信息" name="third">
							<Author></Author>
						</el-tab-pane>

						<el-tab-pane label="项目依赖版本" name="fire">
							<DandV></DandV>
						</el-tab-pane>

						<el-tab-pane label="项目性能指标" name="san">
							<Performance></Performance>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue';
import Feature from './components/Feature.vue';
import Author from './components/Author.vue';
import Chapter from './components/Chapter.vue';

import ProjectCard from './components/ProjectCard.vue';

import { getFeature, getChapter } from '@/utilities/Request';

//监听语言切换变化
import { useLanguageStore } from '@/stores/language';
import pinia from '../../stores/store';
import { ElMessage } from 'element-plus';
const Language = useLanguageStore(pinia); // 这里一定要把 pinia传入进去
import { useI18n } from 'vue-i18n';

import DandV from './components/DandV.vue';
import Performance from './components/Performance.vue';
let i18n = useI18n();

let data = ref([[], []]);

// await  data.value=

function getData() {
	Promise.all([getFeature(), getChapter()]).then(
		(...arg) => {
			data.value = arg;
			// console.log("数据",data.value)
		},
		(err) => {
			ElMessage.error(i18n.t('msg.excel.failed'));
		}
	);
}
getData();

watch(
	() => Language.language,
	() => {
		getData();
	}
);

const activeName = ref('third');

// const handleClick = (tab, event) => {
//   console.log(tab, event)
// }
</script>

<style lang="scss" scoped></style>
