<template>
	<div class="user-manage">
		<el-card class="box-card">
			<div class="card-header">
				<el-button v-permission="['importUser']" type="primary">
					<router-link :to="{ name: 'import' }">{{ $t('msg.excel.importExcel') }}</router-link>
				</el-button>
				<!-- 导出 -->
				<el-button type="success" @click="handleExport">{{ $t('msg.excel.exportExcel') }}</el-button>
			</div>
		</el-card>

		<el-card class="box-card">
			<el-table v-loading="loading" :data="tableData" border style="width: 100%">
				<el-table-column type="index" :index="indexMethod" label="#" />

				<el-table-column prop="username" :label="$t('msg.excel.name')" />
				<el-table-column prop="mobile" :label="$t('msg.excel.mobile')" />
				<el-table-column prop="avatar" :label="$t('msg.excel.avatar')">
					<template #default="scope">
						<!--            <SvgIcon :icon="scope.row.avatar" size="60px"></SvgIcon>-->

						<SvgIcon icon="https://q1.qlogo.cn/g?b=qq&s=100&nk=2100173067" size="60px"></SvgIcon>
					</template>
				</el-table-column>

				<el-table-column :label="$t('msg.excel.role')">
					<template #default="scope">
						<div v-if="scope?.row?.role?.length > 0">
							<el-tag v-for="itemR in scope.row?.role" :key="itemR.title" class="ml-2" type="success">
								{{ itemR.title }}
							</el-tag>
						</div>

						<el-tag v-else class="ml-2" type="success">{{ $t('msg.excel.defaultRole') }}</el-tag>
					</template>
				</el-table-column>

				<el-table-column :label="$t('msg.excel.openTime')">
					<template #default="scope">
						{{ timestampToTime(scope.row?.openTime) }}
					</template>
				</el-table-column>

				<el-table-column fixed="right" :label="$t('msg.excel.action')" width="220">
					<template #default="scope">
						<!-- 查看 -->

						<el-button size="small" type="primary" @click="handleDetail(scope.$index, scope.row)">
							<!-- <router-link :to="{ path: '/user/info/' + scope.row._id }">{{   }}</router-link>-->
							{{ $t('msg.excel.show') }}
						</el-button>

						<!-- 角色 -->
						<el-button v-permission="['distributeRole']" size="small" type="info" @click="handleRole(scope.$index, scope.row)">
							{{ $t('msg.excel.showRole') }}
						</el-button>

						<!-- 删除用户 -->
						<el-button v-permission="['removeUser']" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
				@prev-click="handlePrev"
				@next-click="handleNext"
			/>
		</el-card>
		<!-- 角色按钮展示的  -->
		<Role ref="RoleListRef" :role-list="RoleList" @onDialogFormVisible="closeDialogFormVisible"></Role>

		<Export ref="ExportRef" @onDialogVisible="onDialogVisible"></Export>
	</div>
</template>

<script setup>
import { ref, watch, defineExpose } from 'vue';
import { getRoleList, getManageList, deleteUser } from '@/utilities/Request';
// 单独引入样式
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import { useI18n } from 'vue-i18n';
let i18n = useI18n();

import { useRouter } from 'vue-router';

const Router = useRouter();

// 监听语言变化
import { useLanguageStore } from '@/stores/language';
import Role from './components/Role.vue';

import Export from './components/Export.vue';

// 处理日期的函数
import { timestampToTime } from '@/utilities/DateTransform';
import { ElMessage, ElMessageBox } from 'element-plus';

// 角色按钮开关
const dialogFormVisible = ref(false);

const RoleListRef = ref(null);

const ExportRef = ref(null);

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
		getListData();
	},
	{
		detached: true,
	}
);

// 获取表格数据
function getData(object = { page: 1, size: 10 }) {
	getManageList(object).then(
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
		() => {
			ElMessage.error(i18n.t('msg.excel.failed'));
		}
	);
}

function getListData() {
	// 获取角色数据
	getRoleList().then(
		(data) => {
			// console.log("roleList",data)
			if (data.success === true) {
				RoleList.value = data.data;
			} else {
				ElMessage.error(data.message);
			}
		},
		() => {
			ElMessage.error(i18n.t('msg.excel.failed'));
		}
	);
}

// 获取员工数据
getData();
getListData();

// 根据页码和页数量计算编号
let Index = computed(() => {
	return pageSize4.value * (currentPage4.value - 1);
});

// 生成用户编号
const indexMethod = (index) => {
	// console.log("编号",index,Index)

	return index + 1 + Index.value;
};

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

const handlePrev = (...index) => {
	console.log('上一页', index);
	// currentPage4.value = index
	// getData({ page: index - 1, size: pageSize4.value })
};
const handleNext = (...index) => {
	console.log('下一页', index);
	// currentPage4.value=index+1
	// getData({ page: index[0] + 1, size: pageSize4.value })
};

// 三个点击事件
//查看
const handleDetail = ($index, row) => {
	// console.log('查看', $index, row)
	Router.push({ path: '/user/info/' + row._id });
};
// 删除

const handleDelete = ($index, row) => {
	// console.log("删除",$index,row)

	ElMessageBox.confirm(
		i18n.t('msg.excel.dialogTitle1') + ':' + `${row?.username ? row.username : '这个无名者'}` + i18n.t('msg.excel.dialogTitle2'),

		{
			confirmButtonText: i18n.t('msg.universal.confirm'),
			cancelButtonText: i18n.t('msg.excel.close'),
			type: 'warning',
		}
	)
		.then(() => {
			deleteUser(row._id).then(
				async (data) => {
					// console.log("data",data)
					if (data.success === true) {
						// 删除成功重新获取表格数据
						await getData({ page: currentPage4.value, size: pageSize4.value });
						ElMessage.success(data.message);
					} else {
						// 不能删除的用户
						ElMessage.error(data.message);
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

// 设置角色

const handleRole = ($index, row) => {
	// 点击角色的时候更新数据
	// RoleList.value=[]
	//await getData({ page: currentPage4.value, size: pageSize4.value })
	//await getListData();// 列表
	//  console.log("角色1",$index,role,RoleList)
	RoleListRef.value.role = { ...row };
	// console.log("角色2",role,RoleList)
	RoleListRef.value.dialogFormVisible = true;
};

// 点击导出按钮，谈起对话框

const handleExport = () => {
	ExportRef.value.dialogVisible = true;
	// console.log('点击导出', ())
};

//关闭角色的对话框

const closeDialogFormVisible = async (flag) => {
	RoleListRef.value.dialogFormVisible = false;
	RoleList.value = [];
	await getData({ page: currentPage4.value, size: pageSize4.value });
	await getListData();
	// 提交之后再更新一些
	// getData({ page: currentPage4.value, size: pageSize4.value })
};

// 导出中确认之后传递过来的数据

const onDialogVisible = (value) => {
	// dialogVisible.value = flag
	// 提交之后再更新一些
	console.log('关闭后传递的数据', value);
};

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
