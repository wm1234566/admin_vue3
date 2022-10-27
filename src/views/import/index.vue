<template>
	<div class="import">
		<el-upload
			class="upload-demo"
			drag
			:auto-upload="false"
			:before-upload="handleBeforeUpload"
			:on-change="onChange"
			:on-exceed="onExceed"
			:limit="1"
			:show-file-list="false"
		>
			<span>将文件拖到此处或者点击上传</span>
		</el-upload>
	</div>
</template>

<script setup>
// import {} from 'vue'
import { ElMessage } from 'element-plus';
import { getHeaderRow } from '../../utilities/getHeaderRow';
import { USER_RELATIONS } from '../../utilities/Constant';
import { uploadExcel } from '../../utilities/Request';
import * as XLSX from 'xlsx';

import { useRouter } from 'vue-router';

let Router = useRouter();
const handleBeforeUpload = (...arg) => {
	console.log('上传文件', arg);
};
const onExceed = (...arg) => {
	// console.log('超过了', arg)
	ElMessage.error(`文件数量不能超过1个，你上传了${arg.length}个`);
};
const onChange = async (...arg) => {
	// console.log('改变', arg)
	const file = arg[0].raw;
	if (file) {
		if (/\.(xlsx|xls|csv)$/.test(file.name)) {
			let data = await readerData(file);
			console.log('解析后的表格数据', data);

			if (data.results.length > 0) {
				let newResult = data.results.map((element) => {
					let newElement = {};
					for (let key in element) {
						if (USER_RELATIONS[key]) {
							newElement[USER_RELATIONS[key]] = element[key];
						}
					}
					return newElement;
				});
				// console.log('gai', newResult)
				uploadExcel(newResult).then(
					(data) => {
						if (data.success === true) {
							ElMessage.success('导入' + newResult.length + '个员工数据成功');
							Router.push({ path: '/user/manage' });
						} else {
							ElMessage.error('返回错误，上传失败');
						}
					},
					(err) => {
						ElMessage.error('网络错误，上传失败');
					}
				);
			} else {
				ElMessage.error('解析数据为空');
			}
		} else {
			ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式');
		}
	} else {
		ElMessage.error(`文件不正确,刷新页面重新上传`);
	}
};

/**
 * 读取数据（异步）
 */
const readerData = (rawFile) => {
	// loading.value = true
	return new Promise((resolve, reject) => {
		// https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
		const reader = new FileReader();
		// 该事件在读取操作完成时触发
		// https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
		reader.onload = (e) => {
			// 1. 获取解析到的数据
			const data = e.target.result;
			// 2. 利用 XLSX 对数据进行解析
			const workbook = XLSX.read(data, { type: 'array' });
			// 3. 获取第一张表格(工作簿)名称
			const firstSheetName = workbook.SheetNames[0];
			// 4. 只读取 Sheet1（第一张表格）的数据
			const worksheet = workbook.Sheets[firstSheetName];
			// 5. 解析数据表头
			const header = getHeaderRow(worksheet);
			// 6. 解析数据体
			const results = XLSX.utils.sheet_to_json(worksheet);
			// 7. 传入解析之后的数据
			// generateData({ header, results })
			// 8. loading 处理
			// loading.value = false
			// 9. 异步完成
			resolve({ header, results });
		};
		// 启动读取指定的 Blob 或 File 内容
		reader.readAsArrayBuffer(rawFile);
	});
};
</script>

<style lang="scss" scoped>
.import {
	//height: calc(100vh - 10px);
	box-sizing: border-box;
	height: 100%;
	margin-top: 150px;

	:deep(.el-upload-dragger) {
		margin: 0 auto;
		border-radius: 6px;
		text-align: center;
		border: 1px dashed #bbb;
		width: 350px;
		height: 160px;

		span {
			line-height: 78px;
			color: #bbb;
		}
	}

	//:deep()
}
</style>
