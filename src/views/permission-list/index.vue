<template>
	<div class="permissionList">
		<el-card>
			<el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
				<el-table-column prop="permissionName" :label="$t('msg.permission.name')" width="200" />
				<el-table-column prop="permissionMark" :label="$t('msg.permission.mark')" width="200" />
				<el-table-column prop="permissionDesc" :label="$t('msg.permission.desc')" />
			</el-table>
		</el-card>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { permissionList } from '../../utilities/Request';
import { ElMessage } from 'element-plus';

const tableData = ref([]);
permissionList().then(
	(data) => {
		if (data.success === true) {
			tableData.value = data.data;
		} else {
			ElMessage.error(data.message);
		}
	},
	(err) => {
		ElMessage.error(i18n.t('msg.excel.failed'));
	}
);
</script>

<style lang="scss" scoped></style>
