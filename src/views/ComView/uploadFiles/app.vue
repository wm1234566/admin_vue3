<!--
  文件描述：
  创建时间：2022/10/18 上午 11:15
-->

<template>
	<div id="app">
		<div class="mater-upload-container">
			<Simple
				ref="upload"
				:headers="headers"
				:before-upload="beforeUpload"
				:accept="accepts"
				:upload-arguments="uploadArgumentsObj"
				:limit="limit"
				:on-exceed="fileLimitFn"
				:base-url="baseUrl"
				:chunk-size="chunkSize"
				@success="success"
			>
				<div slot="tip" class="upload-tip"><i class="el-icon-info"></i>: 只能上传：{{ acceptDesc[uploadType] }}</div>
			</Simple>
		</div>

		<el-select v-model="FilesType" multiple collapse-tags collapse-tags-tooltip placeholder="选择想上传的文件类型" style="width: 240px">
			<el-option v-for="item in Object.keys(acceptsObj)" :key="item" :label="item" :value="item" />
		</el-select>
		<br />
		<el-input v-model="input" placeholder="填入请求上传口令" clearable />
		<el-button @click="setHearder">确认口令后才可以上传文件</el-button>
	</div>
</template>

<script setup>
import Simple from './Simples.vue';
import { ref, computed } from 'vue';
import { ElNotification } from 'element-plus';

const input = ref('');
const headers = ref({ command: '' });

const setHearder = () => {
	// console.log('xxx', input.value)
	headers.value.command = input.value;
};

const accepts = ref(); //'image/png',
let acceptsObj = ref({
	// 类型对应的MIME格式
	video: ['video/mp4'],
	image: ['image/png', 'image/gif', 'image/jpeg', 'image/jpg', 'image/bmp', '.'], // 火狐的accept只支持【.png,.jpg】这种形式，为了兼容，使用 .
	audio: ['audio/mp3', 'audio/mpeg'],
	ppt: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '.ppt', '.pptx'],
	excel: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
	zip: ['application/zip', 'application/x-zip-compressed'],
});

const FilesType = ref();
watch(
	() => FilesType.value,
	(newValue) => {
		let TypeFiles = [];

		if (Array.isArray(newValue)) {
			newValue.forEach((item) => {
				TypeFiles.push(...acceptsObj.value[item]);
			});

			accepts.value = TypeFiles.join(',');
		}
		console.log('选择', newValue, accepts.value);
	},
	{
		deep: true,
		immediate: true,
	}
);

let acceptDesc = ref({
	// 文件具体后缀
	video: 'mp4',
	image: 'png,gif,jpeg,jpg,bmp',
	audio: 'mp3',
	ppt: 'ppt',
	excel: 'xls,xlsx',
	zip: 'zip',
});

let uploadArguments = ref({
	type: 'video',
});

const limit = ref(20); // 最大20
const chunkSize = ref(1 * 1024 * 1024);

const share = ref(1); // 是否共享 0私有  1共享

// 计算属性区

// let headers = computed(() => {
//   return {
//     Authorization: 'token'
//   }
// })

let baseUrl = computed(() => {
	return '/';
});

let uploadArgumentsObj = computed(() => {
	return { ...uploadArguments.value, share: share.value };
});

// if (uploadArguments.value.type) {
//   accepts.value = acceptsObj.value[uploadArguments.value.type].join(',') // 设置文件类型
// } else {
//   // this.$message('存在类型不正确的文件')
//   ElNotification({
//     title: 'Error',
//     message: '存在类型不正确的文件',
//     type: 'error'
//   })
// }

// 方法区

// 上传前变量，单给文件
const beforeUpload = (file) => {
	console.log('beforeAvatarUpload -> file', file);
	// console.log('限制的文件类型', acceptsObj.value[uploadArguments.value.type]) //["video/mp4]
	// if (acceptsObj.value[uploadArguments.value.type].indexOf(file.type) === -1) {

	//   // ElNotification({
	//   //   title: 'Error',
	//   //   message: '只能上传' + acceptDesc.value[uploadArguments.value.type],
	//   //   type: 'error'
	//   // })

	//   // console.log('只能上传', acceptsObj.value[uploadType.value])
	//   return false
	// }
	if (!file.size) {
		// 单个文件的大小如
		setTimeout(() => {
			ElNotification({
				title: 'Error',
				message: '不能上传大小为0的文件',
				type: 'error',
			});
			// console.log('上传文件不为0')
		}, 500);
		return false;
	}
	// 检测如果是图片，那么分辨率，如果大于4k，则返回falas
	return propertyRestrictions(file);
};
// 文件个数限制钩子
const fileLimitFn = (files) => {
	// this.$message.warning(`最多支持选择${limit.value}个文件`)
	ElNotification({
		title: 'Error',
		message: `最多支持选择${limit.value}个文件`,
		type: 'error',
	});
	///console.log('只能上传', limit.value, '个文件')
};
// 清空文件，暂未使用
const clearFiles = () => {
	this.$refs.upload.clearFiles();
};
const success = () => {
	// this.$message.success('上传成功')
	ElNotification({
		title: 'Success',
		message: '全部文件上传成功',
		type: 'success',
	});
	// console.log('上传成功')
};
// 图片分辨率检测
const propertyRestrictions = async (file) => {
	return new Promise(async (resolve, reject) => {
		if (uploadArguments.value.type === 'image') {
			const isVerifyResolution = await verifyResolution(file);
			if (!isVerifyResolution) {
				// this.$message('不支持上传4K视频')

				ElNotification({
					title: 'Error',
					message: `不支持4k`,
					type: 'error',
				});
				console.log('不支持4k图片');
				reject();
			}
		}
		resolve(true);
	});
};

// 分辨率校验
const verifyResolution = (file, maxWidth = 3840, maxHeight = 2160) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			if (reader.readyState === 2) {
				const img = new Image();
				img.src = reader.result;
				img.onload = function () {
					const width = this.width;
					const height = this.height;
					const bool = width > maxWidth || height > maxHeight;
					if (bool) {
						resolve(false);
					}
					resolve(true);
				};
			}
		};
	});
};
</script>

<style scoped lang="scss">
.mater-upload-container {
	.simple-upload-container {
		border: none;
		max-height: 500px;
	}
}
</style>
