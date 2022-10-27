<template>
	<div class="roleList">
		<el-card>
			<el-table :data="RoleList" style="width: 100%" border>
				<el-table-column prop="id" width="130" :label="$t('msg.role.index')" />
				<el-table-column prop="title" :label="$t('msg.role.name')" />
				<el-table-column prop="describe" :label="$t('msg.role.desc')" />
				<el-table-column :label="$t('msg.role.action')" fixed="right" width="200">
					<template #default="scope">
						<el-button v-permission="['distributePermission']" size="small" type="primary" @click="handlePermissions(scope.$index, scope.row)">{{
							$t('msg.role.assignPermissions')
						}}</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!--   权限的弹窗 -->
		<Permissions ref="Premiss" :permissions-list="PermissionsList" @onDialogFormVisible="DialogFormVisible"></Permissions>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { getRoleList, permissionList, AssignPermission } from '@/utilities/Request';
import { ElMessage } from 'element-plus';
import { useLanguageStore } from '@/stores/language';
import Permissions from './components/Permissions.vue';

// 全部角色数据
const RoleList = ref([]);

// 全部权限
const PermissionsList = ref([]);

// 弹窗
const Premiss = ref(null);

// 这个角色的权限

// 子组件关闭自己
const DialogFormVisible = (obj) => {
	// console.log("关闭自己");
	PermissionsList.value = [];
	// 权限列表
	// rolePermissions.value = [];// 角色的数据
	Premiss.value.rolePermissions = {};
};

function getListData() {
	// 获取角色数据
	getRoleList().then(
		(data) => {
			// console.log("roleList",data)
			if (data.code === 200) {
				RoleList.value = data.data;
			} else {
				ElMessage.error(i18n.t('msg.excel.failed'));
			}
		},
		(err) => {
			ElMessage.error(i18n.t('msg.excel.failed'));
		}
	);
}
getListData();

const handlePermissions = ($index, row) => {
	// RoleList.value = []
	PermissionsList.value = [];
	// 权限列表
	// rolePermissions.value = [];// 角色的数据
	Premiss.value.rolePermissions = {};

	Promise.all([permissionList(), AssignPermission(row.id)]).then(
		([data, data2]) => {
			if (data.code === 200) {
				PermissionsList.value = data.data;
			} else {
				ElMessage.error(i18n.t('msg.excel.failed'));
			}

			if (data2.code === 200) {
				Premiss.value.rolePermissions = { permissions: data2.data, roleId: row.id };
				Premiss.value.dialogFormVisible = true;
			} else {
				ElMessage.error(i18n.t('msg.excel.failed'));
			}

			// console.log("权限数据",RoleList.value,PermissionsList.value)
			// dialogFormVisible.value = true
			// 打开窗口
		},
		([err, err2]) => {
			ElMessage.error(i18n.t('msg.excel.failed'));
		}
	);
};

const Language = useLanguageStore();
// 语言变化重新请求 数据

Language.$subscribe(
	(...arg) => {
		// 数据变得重新请求
		getListData();
	},
	{
		detached: true,
	}
);
</script>

<style lang="scss" scoped></style>
