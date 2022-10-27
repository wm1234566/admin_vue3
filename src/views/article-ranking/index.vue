<template>
	<div class="user-manage">
		<el-card class="box-card">
			<div class="header">
				<span>{{ $t('msg.article.dynamicTitle') }}</span>
				<el-checkbox-group v-model="selectDynamicLabel">
					<el-checkbox v-for="(item, index) in dynamicData" :key="item.label" :label="item.label" />
				</el-checkbox-group>
			</div>
		</el-card>

		<el-card class="box-card2">
			<el-table ref="toRefTable" v-loading="loading" :data="tableData" border style="width: 100%">
				<!--
         这里导致拖动和 :with :fixed 都不生效
        <el-table-column v-for="(item, index) in tableColumn" :key="item.label" :label="item.label" :prop="item.prop"
        :fixed="item.prop === 'action' ? 'right' : ''" :with="item.prop === 'action' ? '200' : ''"
        > -->

				<el-table-column v-for="(item, index) in tableColumn" :key="item.label" :label="item.label" :prop="item.prop">
					<template v-if="item.prop === 'publicDate'" #default="{ row }">
						{{ relativeTime(row.publicDate) }}
					</template>
					<template v-if="item.prop === 'author'" #default="{ row }"> 站长 </template>

					<template v-else-if="item.prop === 'action'" #default="scope">
						<!-- @click="handleDetail(scope.$index, scope.row)" -->
						<el-button size="small" type="primary">
							<router-link :to="{ path: '/article/' + scope.row._id }">{{ $t('msg.excel.show') }}</router-link>
						</el-button>

						<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
							{{ $t('msg.excel.remove') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页-->
			<el-pagination
				v-model:currentPage="currentPage4"
				v-model:page-size="pageSize4"
				:page-sizes="[2, 5, 10, 20]"
				:small="small"
				:disabled="disabled"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</el-card>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getArticleList, ArticleDelete } from '../../utilities/Request';
// 单独引入样式
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import { dynamicData, selectDynamicLabel, tableColumn } from './index';
import { toRefTable, initSortable } from './sortable';
import { relativeTime } from '@/utilities/DayJs';
import { useI18n } from 'vue-i18n';

onMounted(() => {
	initSortable(currentPage4, pageSize4, tableData, getData);
});

let i18n = useI18n();

// 监听语言变化
import { useLanguageStore } from '../../stores/language';

// 处理日期的函数
import { timestampToTime } from '../../utilities/DateTransform';

// 这个人的角色数据
const role = ref([]);
// 全部角色数据
const RoleList = ref([]);

// 分页的变量
const currentPage4 = ref(1); // 当前页码

const pageSize4 = ref(10); // 初始数量和这个10无关
const small = ref(false);

const disabled = ref(false);
const total = ref(0);

// 表格数据
const tableData = ref([]);

const Language = useLanguageStore();

// 页面加载
const loading = ref(true);

// 语言变化重新请求 数据

Language.$subscribe(
	() => {
		// 数据变得重新请求
		getData({ page: currentPage4.value, size: pageSize4.value });
	},
	{
		detached: true,
	}
);

// 获取表格数据
function getData(object = { page: 1, size: 10 }) {
	getArticleList(object).then(
		(data) => {
			if (data.success === true) {
				total.value = data.data.total;
				tableData.value = data.data.list;

				// 展示数据
				loading.value = false;
			} else {
				ElMessage.error(data.message);
			}
			// console.log(data)
		},
		(err) => {
			ElMessage.error(i18n.t('msg.excel.failed'));
		}
	);
}

// 获取数据
getData();

// 修改页面数量
const handleSizeChange = (val) => {
	// console.log(`${val} items per page`)
	pageSize4.value = val;
	getData({ page: currentPage4.value, size: val });
};
// 修改页数
const handleCurrentChange = (val) => {
	// console.log(`current page: ${val}`)
	currentPage4.value = val;
	getData({ page: val, size: pageSize4.value });
};

// 三个点击事件

// const handleDetail = ($index, row) => {
//   console.log('查看', $index, row)
// }

const handleDelete = ($index, row) => {
	// console.log("删除",$index,row)

	ElMessageBox.confirm(
		i18n.t('msg.article.dialogTitle1') + ':' + `${row?.title ? row.title : '无标题'}` + i18n.t('msg.article.dialogTitle2'),

		{
			confirmButtonText: i18n.t('msg.universal.confirm'),
			cancelButtonText: i18n.t('msg.excel.close'),
			type: 'warning',
		}
	)
		.then(() => {
			ArticleDelete(row._id).then(
				(data) => {
					// console.log("data",data)
					if (data.code === 200 && data.success === false) {
						// 不能删除的用户
						ElMessage.error(data.message);
					} else {
						// 删除成功重新获取表格数据
						getData({ page: currentPage4.value, size: pageSize4.value });
						ElMessage.success(data.message);
					}
				},
				(err) => {
					ElMessage.error(i18n.t('msg.excel.failed'));
				}
			);
		})
		.catch(() => {
			// 放弃删除
		});
};

// 点击导出按钮，谈起对话框

///
</script>

<style lang="scss" scoped>
:deep(.box-card) {
	margin-bottom: 22px;

	.card-header {
		text-align: right;

		.is-focus {
			box-shadow: none !important;

			.el-input__wrapper {
				box-shadow: none !important;
			}
		}
	}

	.header {
		display: flex;

		align-items: center;

		> span {
			margin-right: 20px;
			font-size: 14px;
			font-weight: 700;
		}
	}
}

:deep(.box-card2) {
	//  被拖拽的样式
	.sortable-ghost {
		background-color: #409eff !important;
		// // font-size: 18px !important;
		font-weight: 600;
	}

	.sortable-chosen {
		background-color: blueviolet;
	}

	.sortable-drag {
		background-color: cadetblue;
	}
}

:deep(.el-pagination) {
	margin-top: 20px;
}

:deep(.external_img) {
	border-radius: 50%;
	background-color: transparent;
	display: block;
	margin: 0 auto;
}
</style>
