<!--
  文件描述：
  创建时间：2022/8/10 上午 10:17
-->

<template>
	<el-dialog v-model="dialogFormVisible" :title="$t('msg.role.assignPermissions')">
		<div class="dialog-content">
			<!--      <el-checkbox-group v-model="checkList">-->

			<!--        <el-checkbox v-for='(item,index) in RoleList'   :key='item.id' :label="item.title"  name="type" ></el-checkbox>-->

			<!--      </el-checkbox-group>-->

			<el-tree
				ref="treeRef"
				:data="PermissionsList"
				show-checkbox
				node-key="id"
				default-expand-all
				:default-checked-keys="rolePermissions?.permissions"
				:props="defaultProps"
				check-strictly
			/>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{ $t('msg.universal.cancel') }}</el-button>
				<el-button type="primary" @click="submitPermissions">{{ $t('msg.universal.confirm') }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue';
import { updateRolePermission } from '../../../utilities/Request';

import { ElMessage, ElMessageBox } from 'element-plus';
// 单独引入样式
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';

import { useI18n } from 'vue-i18n';
let i18n = useI18n();

const Props = defineProps({
	//权限选项
	PermissionsList: {
		type: Array,
		default: [],
	},
	//这角色的具体权限选项
	// rolePermissions:
	// {
	//   type: Object,
	//   default: {}
	// }
});

// tree组件数据
let treeRef = ref(null);
const dialogFormVisible = ref(false);
const rolePermissions = ref({});

defineExpose({
	dialogFormVisible,
	rolePermissions,
});
const defaultProps = {
	children: 'children',
	label: 'permissionName',
};

// // defineEmits
let emit = defineEmits(['onDialogFormVisible']);
//
// 数组中是自定义事件名称（名称随便起）
// const checkList=ref([])
//

const submitPermissions = () => {
	// 点击确认后发送更新请求

	// console.log("修改前的",Props.rolePermissions?.permissions,"treeRef",treeRef.value.getCheckedKeys())
	//{"roleId":"5","permissions":["1","1-1","1-2","1-3","3","5"]}
	updateRolePermission({
		roleId: rolePermissions.value.roleId,
		permissions: treeRef.value.getCheckedKeys(),
	}).then(
		(data) => {
			if (data.success === true) {
				ElMessage.success(data.message);
			} else {
				ElMessage.error(data.message);
			}
		},
		(err) => {
			ElMessage.error(i18n.t('msg.excel.failed'));
		}
	);

	emit('onDialogFormVisible', { roleId: rolePermissions.value?.roleId });
	// rolePermissions.value = {}

	dialogFormVisible.value = false;
	// return false
};

watch(dialogFormVisible, () => {
	if (dialogFormVisible.value === false) {
		emit('onDialogFormVisible', { roleId: rolePermissions.value?.roleId });
	}
});
</script>

<script>
export default {
	name: 'Role',
};
</script>

<style scoped lang="scss"></style>
