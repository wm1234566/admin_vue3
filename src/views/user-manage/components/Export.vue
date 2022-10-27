<!--
  文件描述：
  创建时间：2022/8/10 上午 10:17
-->

<template>
	<!--    身份的对话框-->

	<el-dialog v-model="dialogVisible" :title="$t('msg.excel.roleDialogTitle')" width="30%">
		<div>
			<el-input v-model="fileName" placeholder="请输入文件名" clearable />
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">{{ $t('msg.universal.cancel') }}</el-button>
				<el-button type="primary" :loading="loading" @click="submit">{{ $t('msg.universal.confirm') }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, defineEmits, defineExpose } from 'vue';
import { downloadExcel } from '../../../utilities/Request';
import dayjs from 'dayjs';

import { ElMessage } from 'element-plus';
// 单独引入样式
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';

import { useI18n } from 'vue-i18n';

const dialogVisible = ref(false);

defineExpose({
	dialogVisible,
});

const fileName = ref('员工信息表');
const loading = ref(false);

let emit = defineEmits(['onDialogVisible']); // 数组中是自定义事件名称（名称随便起）
// const checkList = ref([])

const submit = () => {
	// 点击后转圈圈
	loading.value = true;

	if (fileName.value.length > 0) {
		downloadExcel().then(
			async (data1) => {
				//停止转圈圈
				loading.value = false;

				if (data1.success === true) {
					console.log('请求到的员工数据json', data1.data.list);

					const USER_RELATIONS = {
						姓名: 'username',
						联系方式: 'mobile',
						角色: 'role',
						开通时间: 'openTime',
					};

					// 时间戳变成日期
					const dateFilter = (val, format = 'YYYY-MM-DD') => {
						if (!isNaN(val)) {
							val = parseInt(val);
						}
						if (dayjs(val).format(format) === '1970-01-01') {
							return '时间数据不存在';
						} else {
							return dayjs(val).format(format);
						}
						// console.log('日期', typeof dayjs(val).format(format))
					};

					const formatJson = (headers, rows) => {
						// 首先遍历数组
						// [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
						return rows.map((item) => {
							return Object.keys(headers).map((key) => {
								// 角色特殊处理
								if (headers[key] === 'role') {
									const roles = item[headers[key]];

									return JSON.stringify(roles.map((role) => role.title));
								}
								//处理一下日期
								if (headers[key] === 'openTime') {
									return dateFilter(item[headers[key]]);
								}

								return item[headers[key]];
							});
						});
					};

					const data = formatJson(USER_RELATIONS, data1?.data?.list);

					console.log('数据', data);
					const excel = await import('../../../utilities/Export2Excel');

					excel.export_json_to_excel({
						// excel 表头
						header: Object.keys(USER_RELATIONS),
						// excel 数据（二维数组结构）
						data,
						// 文件名称
						filename: fileName.value || '员工表', //excelName.value || exportDefaultName,
						// 是否自动列宽
						autoWidth: true,
						// 文件类型
						bookType: 'xlsx',
					});

					dialogVisible.value = false;
					// emit('onDialogVisible', fileName.value)
				} else {
					ElMessage.error('未请求到数据');
					//停止转圈圈
					loading.value = false;
				}
			},
			() => {
				ElMessage.error('数据请求失败');
				//停止转圈圈
				loading.value = false;
			}
		);
	} else {
		//停止转圈圈
		loading.value = false;
		ElMessage.error('输入的表名不为空！');
	}
};
</script>

<style scoped lang="scss"></style>
