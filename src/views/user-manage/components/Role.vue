<!--
  文件描述：
  创建时间：2022/8/10 上午 10:17
-->

<template>
	<!--    身份的对话框-->

	<el-dialog v-model="dialogFormVisible" :title="$t('msg.excel.roleDialogTitle')">
		<div>
			<el-checkbox-group v-model="checkList">
				<el-checkbox v-for="item in RoleList" :key="item.id" :label="item.title" name="type"></el-checkbox>
			</el-checkbox-group>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{ $t('msg.universal.cancel') }}</el-button>
				<el-button type="primary" @click="submitRole">{{ $t('msg.universal.confirm') }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits } from 'vue';
import { updateRole } from '../../../utilities/Request';

import { ElMessage, ElMessageBox } from 'element-plus';
// 单独引入样式
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';

import { useI18n } from 'vue-i18n';
let i18n = useI18n();

const Props = defineProps({
	//角色数据
	RoleList: {
		type: Array,
		default: [],
	},
	//这个人的具体角色
	//role: Object,
});

const dialogFormVisible = ref(false);
const role = ref({});
defineExpose({
	dialogFormVisible,
	role,
});

let emit = defineEmits(['onDialogFormVisible']); // 数组中是自定义事件名称（名称随便起）
const checkList = ref([]);

const submitRole = () => {
	// 筛选出RoleLis和Role交际
	let newRole = [];

	// console.log("两种数据",checkList.value,Props.RoleList,Props)

	for (let i = 0; i < checkList.value.length; i++) {
		for (let j = 0; j < Props.RoleList.length; j++) {
			if (checkList.value[i] === Props.RoleList[j].title) {
				newRole.push(Props.RoleList[j]);
			}
		}
	}
	// console.log("参数是",newRole)

	// 点击后跟跟新角色
	updateRole(role.value._id, { roles: newRole }).then(
		(data) => {
			if (data.success === false) {
				ElMessage.error(data.message);
			} else {
				ElMessage.success(data.message);
			}
		},
		() => {
			ElMessage.error(i18n.t('msg.excel.failed'));
		}
	);
	emit('onDialogFormVisible', false);
};

watch(
	dialogFormVisible,
	(newValue, oldValue) => {
		// 当打开的时候我们就设置网络请求的role，
		checkList.value = [];
		// console.log("接受的参数",newValue,role.value,Props.RoleList)

		if (newValue === true && oldValue === false) {
			role.value?.role?.forEach((item) => {
				checkList.value.push(item.title);
			});
		} else {
			checkList.value = [];
		}
	},
	{
		immediate: true,
	}
);
</script>

<style scoped lang="scss"></style>
