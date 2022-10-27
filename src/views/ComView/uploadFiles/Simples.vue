<template>
	<div class="simple-upload-container">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<div class="btns">
						<el-button-group>
							<el-button :disabled="changeDisabled">
								<el-icon><FolderAdd /></el-icon> 选择文件

								<input
									v-if="!changeDisabled"
									type="file"
									:multiple="multiple"
									class="select-file-input"
									:accept="accept"
									οnclick="f.outerHTML=f.outerHTML"
									@change="handleFileChange"
								/>
							</el-button>

							<el-button :disabled="uploadDisabled" @click="handleUpload">
								<el-icon> <Upload /> </el-icon> 上传
							</el-button>
							<el-button :disabled="pauseDisabled" @click="handlePause">
								<el-icon> <VideoPause /> </el-icon> 暂停
							</el-button>
							<el-button :disabled="resumeDisabled" @click="handleResume">
								<el-icon><VideoPlay /></el-icon>
								恢复</el-button
							>
							<el-button :disabled="clearDisabled" @click="clearFiles"
								><el-icon><FolderDelete /></el-icon> 清空</el-button
							>
						</el-button-group>
						<slot name="header"></slot>
					</div>
				</div>
			</template>

			<div v-if="uploadFiles.length" class="file-list">
				<el-table :data="uploadFiles" style="width: 100%">
					<el-table-column type="expand">
						<template #default="props">
							<div m="4">
								<el-table :data="props.row.FileState.chunkList" border height="200">
									<el-table-column prop="index" label="#" align="center" width="250" />
									<el-table-column prop="hash" label="切片md5" align="center" show-overflow-tooltip />
									<el-table-column label="大小" align="center" width="120">
										<template #default="{ row }">
											{{ transformByte(row.size) }}
										</template>
									</el-table-column>
									<el-table-column prop="uploaded" label="是否完成" align="center">
										<template #default="{ row }">
											{{ row.uploaded ? '完成' : '进行中' }}
										</template>
									</el-table-column>

									<el-table-column label="进度" align="center">
										<template #default="{ row }">
											<el-progress v-if="!row.status || row.status === 'wait'" :percentage="row.progress" />
											<el-progress v-else :percentage="row.progress" :status="row.status" />
										</template>
									</el-table-column>
								</el-table>
							</div>
						</template>
					</el-table-column>

					<el-table-column label="文件名字">
						<template #default="{ row, $index }">
							<p class="filename">{{ $index + 1 }}:{{ row.rawFile.name }}</p>
						</template>
					</el-table-column>

					<el-table-column label="文件大小" prop="name" width="200">
						<template #default="{ row, $index }">
							<div class="item-size">大小：{{ transformByte(row.rawFile.size) }}</div>
						</template>
					</el-table-column>

					<el-table-column label="文件进度" prop="name">
						<template #default="{ row, $index }">
							<div v-if="row.FileState.hashProgress === 100" class="item-progress">
								<p>文件进度</p>
								<el-progress :percentage="row.FileState.uploadProgress" />
							</div>

							<div v-else class="item-progress">
								<p>{{ status === 'wait' ? '准备读取文件' : '正在读取文件' }}</p>
								<el-progress :percentage="row.FileState.hashProgress" />
							</div>
						</template>
					</el-table-column>

					<el-table-column label="文件状态" prop="name">
						<template #default="{ row, $index }">
							<div class="item-status">
								<el-icon v-if="row.FileState.status === 'uploading'" class="is-loading">
									<Loading />
								</el-icon>

								<el-icon v-if="row.FileState.status === 'secondPass' || row.FileState.status === 'success'">
									<CircleCheck />
								</el-icon>

								<el-icon v-if="row.FileState.status === 'error'">
									<CircleClose />
								</el-icon>

								{{ fileStatusFilter(row.FileState.status) }}
							</div>
						</template>
					</el-table-column>
				</el-table>

				<slot name="tip"></slot>
			</div>
		</el-card>
	</div>
</template>
<script setup>
import { saveObjArr, getObjArr, clearLocalStorage } from './utils/localstorage';
import { ElNotification } from 'element-plus';
import { getCurrentInstance, toRaw, computed, ref } from 'vue';
import axios, { CancelToken } from 'axios';

const instance = axios.create({});

// 单个文件的状态
const fileStatus = {
	wait: 'wait', // 等待上传
	uploading: 'uploading', //
	success: 'success',
	error: 'error',
	secondPass: 'secondPass',
	pause: 'pause',
	resume: 'resume',
};
// 单个文件的状态 对应描述
const fileStatusStr = {
	wait: '待上传',
	uploading: '上传中',
	success: '成功',
	error: '失败',
	secondPass: '已秒传', // 已经上传过了
	pause: '暂停',
	resume: '恢复', // 断续上传
};

// 所有文件状态
const Status = {
	wait: 'wait',
	pause: 'pause',
	uploading: 'uploading',
	hash: 'hash',
	error: 'error',
	done: 'done',
};

let chunkSize = 10 * 1024 * 1024; // 切片大小
let fileIndex = ref(0); // 当前正在被遍历的文件下标,上传的当前文件在uploadFiles: [], 中的下标

let uploadFiles = ref([]); // 文件列表
const worker = ref(null);
const cancels = ref([]); // 存储要取消的请求

const tempThreads = ref(3); // 并发数据
const status = ref(Status.wait);

const isColse = ref(false);

//计算容量
const transformByte = (size) => {
	if (!size) {
		return '0B';
	}

	const num = 1024.0; // byte

	if (size < num) {
		return size + 'B';
	}
	if (size < Math.pow(num, 2)) {
		return (size / num).toFixed(2) + 'K';
	} // kb
	if (size < Math.pow(num, 3)) {
		return (size / Math.pow(num, 2)).toFixed(2) + 'M';
	} // M
	if (size < Math.pow(num, 4)) {
		return (size / Math.pow(num, 3)).toFixed(2) + 'G';
	} // G
	return (size / Math.pow(num, 4)).toFixed(2) + 'T'; // T
};

// 单个文件状态格式化
const fileStatusFilter = (status) => {
	return fileStatusStr[fileStatus[status]];
};

let props = defineProps({
	headers: {
		type: Object,
		default: null,
	},
	beforeUpload: {
		type: Function,
		default: null,
	},
	accept: {
		type: String,
		default: '',
	},
	// 上传文件时携带的参数
	uploadArguments: {
		type: Object,
		default: () => {
			return {};
		},
	},
	// 是否传递cookie
	withCredentials: {
		type: Boolean,
		default: false,
	},
	// 文件个数
	limit: {
		type: Number,
		default: 0,
	},
	// 文件超出个数限制时的钩子
	onExceed: {
		type: Function,
		default: () => {},
	},
	multiple: {
		type: Boolean,
		default: true,
	},
	// axios baseUrl
	baseUrl: {
		type: String,
		default: '',
	},
	// 切片大小
	chunkSize: {
		type: Number,
		default: 10 * 1024 * 1024,
	},
	// 上传并发数
	threads: {
		type: Number,
		default: 3,
	},
	// 错误重试次数
	chunkRetry: {
		type: Number,
		default: 3,
	},
});

//计算属性
let changeDisabled = computed(() => {
	return ![Status.wait, Status.done].includes(status.value);
});

let uploadDisabled = computed(() => {
	return !uploadFiles.value.length || [Status.pause, Status.done, Status.uploading, Status.hash].includes(status.value);
});
let pauseDisabled = computed(() => {
	return [Status.hash, Status.wait, Status.done, Status.pause].includes(status.value);
});

let resumeDisabled = computed(() => {
	return ![Status.pause].includes(status.value);
});

let clearDisabled = computed(() => {
	return !uploadFiles.value.length;
});

watch(
	() => props.headers,
	(newValue) => {
		console.log('headers改变', newValue);
		if (!newValue) return;
		for (const i in newValue) {
			instance.defaults.headers.common[i] = newValue[i];
			// axios.interceptors.request.use(
			//   function (config) {
			//     // 在发送请求之前做些什么
			//     config.headers[i] = newValue[i]
			//     return config
			//   },
			//   function (error) {
			//     // 对请求错误做些什么
			//     return Promise.reject(error)
			//   }
			// )
		}
	},
	{
		deep: true,
		immediate: true,
	}
);

// axios 设置axios参数
const setAxios = () => {
	if (!props.headers) return;
	for (const i in props.headers) {
		instance.defaults.headers.common[i] = props.headers[i];
	}

	// 是否携带cookie
	if (props.withCredentials) {
		instance.defaults.withCredentials = true;
	}

	// 设置baseUrl
	if (props.baseUrl) {
		instance.defaults.baseURL = props.baseUrl;
	}

	// 设置切片大小
	chunkSize = props.chunkSize;
};

// 生命周期函数
onUnmounted(() => {
	clearFiles();
});

// 设置props传入的参数
setAxios();

// 方法区

// 点击加入文件后的事件
const handleFileChange = (e) => {
	const files = e.target.files;
	// console.log('handleFileChange -> file', files)
	if (!files) return;

	fileIndex.value = 0; // 全局文件，初始值0 ，只初始一次， 重置文件下标
	// console.log('handleFileChange -> this.uploadFiles.value', uploadFiles.value) // 一个空数组
	// 判断文件选择的个数，选择文件个数存在，并且长度，文件长度大于选择文件个数
	if (props.limit && files.length > props.limit) {
		// 不存在就是可以无限传输
		props.onExceed && props.onExceed(files); // 执行超出的函数
		return;
	}

	status.value = Status.wait; // 整个文件的状态 变成等待状态

	const postFiles = Array.prototype.slice.call(files); // 文件变成数组
	// console.log('handleFileChange -> postFiles', postFiles)
	postFiles.forEach((item) => {
		handleStart(item); // 初始化每个文件，为每个文件对象添加属性，然后添加到data中
	});
};

// 初始化每一个文件
const handleStart = (rawFile) => {
	// 初始化部分自定义属性
	let FileState = {};

	FileState.status = fileStatus.wait; // 单个文件的状态 ，
	FileState.chunkList = [];
	FileState.uploadProgress = 0;
	FileState.fakeUploadProgress = 0; // 假进度条，处理恢复上传后，进度条后移的问题
	FileState.hashProgress = 0;

	if (props.beforeUpload) {
		// 如果存在上传之前的回调函数
		const before = props.beforeUpload(rawFile); // 检测单个文件是不是指定类型，是不是为空，图片是不是大于4k
		if (before && before.then) {
			before.then((res) => {
				uploadFiles.value.push({ rawFile, FileState }); // 检验合格存入文件列表
				///console.log(uploadFiles.value)
			});
		}
	}

	if (!props.beforeUpload) {
		uploadFiles.value.push({ rawFile, FileState }); // 没有钩子函数，直接存入
	}
};

// 点击上传
const handleUpload = async () => {
	if (!uploadFiles.value) return;

	status.value = Status.uploading; // 点击上传，改变整个文件列表的状态为上传中

	for (let i = 0; i < uploadFiles.value.length; i++) {
		fileIndex.value = i;
		if (['secondPass', 'success', 'error'].includes(uploadFiles.value[i].FileState.status)) {
			console.log('跳过已上传成功或已秒传的或失败的');
			continue;
		}

		// 生成文件切片
		const fileChunkList = createFileChunk(toRaw(uploadFiles.value[i].rawFile)); // 返回这个文件的切片[{file:[]},{file:[]}]

		console.log('切片结果：', fileChunkList);

		// 若不是恢复，再进行hash计算
		if (uploadFiles.value[i].FileState.status !== 'resume') {
			status.value = Status.hash; // 更新整个文件的状态为计算hash中

			// 计算hash
			uploadFiles.value[i].FileState.hash = await calculateHash(fileChunkList, i);
			// .hash=res.hash

			// 若清空或者状态为等待，则跳出循环
			if (status.value === Status.wait) {
				console.log('若清空或者状态为等待，则跳出循环');
				break;
			}
		}

		status.value = Status.uploading;

		// 校验文件是否已存在,向fileChunk/presence 发送get请求，携带 md5 文件名，

		const verifyRes = await verifyUpload(
			uploadFiles.value[i].rawFile.name, // 文件没名字
			uploadFiles.value[i].FileState.hash // 文件的hash
		);
		// console.log('上传状态', uploadFiles.value[i].FileState.hash)
		if (verifyRes.data.presence) {
			//如果这个文件已经存在
			uploadFiles.value[i].FileState.status = fileStatus.secondPass;
			uploadFiles.value[i].FileState.uploadProgress = 100;
			// console.log();
			isAllStatus();
		} else {
			// console.log('开始上传文件----》', uploadFiles.value[i].rawFile)

			uploadFiles.value[i].FileState.status = fileStatus.uploading;

			// 获取文件hash为名字的本地存储
			let getChunkStorage = getObjArr(uploadFiles.value[i].FileState.hash); ///getChunkStorage()

			uploadFiles.value[i].FileState.fileHash = uploadFiles.value[i].FileState.hash;

			// 文件的hash，合并时使用
			uploadFiles.value[i].FileState.chunkList = fileChunkList.map(({ file }, index) => ({
				fileHash: uploadFiles.value[i].FileState.hash, //文件的hash
				fileName: uploadFiles.value[i].rawFile.name, // 文件的名字
				index, // 切片的索引
				hash: uploadFiles.value[i].FileState.hash + '-' + index, // hash—索引
				chunk: file, // 切片对应的文件对象
				size: file.size, // 切片的大小
				uploaded: getChunkStorage && getChunkStorage.includes(index), // 标识：是否已完成上传
				progress: getChunkStorage && getChunkStorage.includes(index) ? 100 : 0,
				status: getChunkStorage && getChunkStorage.includes(index) ? 'success' : 'wait', // 上传状态，用作进度状态显示
			}));

			// this.$set(uploadFiles.value, i, uploadFiles.value[i]);
			// uploadFiles.value[i] = uploadFiles.value[i]

			// console.log('上传前记录chunkList信息的文件，给分片添加信息', uploadFiles.value[i])
			await uploadChunks(uploadFiles.value[i]);
		}
	}
};

// 创建文件切片  file是单个文件，size是一个number大小10 * 1024 * 1024
const createFileChunk = (file, size = chunkSize) => {
	// console.log('切片的文件', file)
	const fileChunkList = [];
	let count = 0;
	while (count < file.size) {
		fileChunkList.push({
			file: file.slice(count, count + size), // [{file,[] }]
		});
		count += size;
	}
	return fileChunkList; // /  fileChunkList 存储一个文件所有切片 [{file,[] },{file,[]}]
};

// 生成文件 hash（web-worker） 参数是单个文件的切片 [{file:xxx},{}]
const calculateHash = (fileChunkList, i) => {
	// console.log('计算文件的哈希', fileChunkList, i)
	// let upFile=uploadFiles.value[fileIndex.value]
	return new Promise((resolve) => {
		worker.value = new Worker('/hash.js'); // 注意这个文件是网络引入，单个文件，不能打包，放在public中
		worker.value.postMessage({ fileChunkList });
		worker.value.onmessage = (e) => {
			const { percentage, hash } = e.data;
			// percentage: 100,  // 百分之百
			//     hash: spark.end()  // 计算文件的完整hash
			if (uploadFiles.value[i]) {
				// 如果当前上传文件是
				uploadFiles.value[i].FileState.hashProgress = Number(percentage.toFixed(0));
			}

			// console.log('计算结果', hash, percentage)

			if (hash) {
				resolve(hash);
			}
		};
	});
};

// 文件上传之前的校验： 校验文件是否已存在,向fileChunk/presence 发送get请求，携带 md5 文件名，
const verifyUpload = (fileName, fileHash) => {
	return new Promise((resolve) => {
		const obj = {
			md5: fileHash,
			fileName,
			...props.uploadArguments,
		};

		instance
			.get('fileChunk/presence', { params: obj })
			.then((res) => {
				// console.log('verifyUpload -> res', res)
				resolve(res.data);
			})
			.catch((err) => {
				console.log('verifyUpload -> err', err);
			});
	});
};

let emit = defineEmits(['success']);
// 判断是否都已完成上传
const isAllStatus = () => {
	const isAllSuccess = uploadFiles.value.every((item) => ['success', 'secondPass', 'error'].includes(item.FileState.status));
	// console.log('mergeRequest -> isAllSuccess', isAllSuccess)
	if (isAllSuccess) {
		status.value = Status.done;
		// 都传入完了了
		emit('success');
	}
};

// 将切片传输给服务端
const uploadChunks = async (data) => {
	// console.log('将要发送的切片信息1', data)

	const chunkData = data.FileState.chunkList;

	return new Promise(async (resolve, reject) => {
		const requestDataList = chunkData
			.filter(({ uploaded }) => !uploaded) //过滤已经上传的切片

			.map(({ fileHash, chunk, fileName, index }) => {
				const formData = new FormData();
				formData.append('md5', fileHash); // 文件的md5
				formData.append('file', chunk); // 切片的数据
				formData.append('fileName', index); // 文件名使用切片的下标

				return { formData, index, fileName }; // 当前切片的 formData，下标，文件名字
			});

		// console.log('切片原始数据2', chunkData)
		// console.log('生成[{formData,index,fileName}]过滤已经上传的切片3', requestDataList)

		try {
			// 并发处理函数

			const ret = await sendRequest(requestDataList, chunkData); // 发送所有没有发送的切片，成功为ret为done，失败为一个数组[] 重试次数
			// console.log('uploadChunks -> chunkData', chunkData)
			// console.log('ret', ret)
		} catch (error) {
			// 上传有被reject的
			//   this.$message.error('亲 上传失败了,考虑重试下呦' + error)
			// console.log('亲 上传失败了,考虑重试下呦' + error)
			// alert('亲 上传失败了,考虑重试下呦')
			ElNotification({
				title: 'Error',
				message: '亲 上传失败了,考虑重试下呦' + error,
				type: 'error',
			});
			return;
		}

		// 合并切片
		const isUpload = chunkData.some((item) => item.uploaded === false); // 没有上传完的切片
		// console.log('没有上传完成的切片', isUpload)
		if (isUpload) {
			// alert('存在失败的切片')
			ElNotification({
				title: 'Error',
				message: '存在失败的切片,请清空重试！',
				type: 'error',
			});
		} else {
			// 如果全部传完了
			// 执行合并
			try {
				await mergeRequest(data); // data是这个文件项
				resolve();
			} catch (error) {
				reject();
			}
		}
	});
};

/**
 * @description: // 并发处理  froms是[{formData, index, fileName},]  不包含已经上传的切片
 * @return {*}  // chunkData \
 *      fileHash: uploadFiles.value[i].FileState.hash, //文件的hash
        fileName: uploadFiles.value[i].rawFile.name, // 文件的名字
        index, // 切片的索引
        hash: uploadFiles.value[i].FileState.hash + '-' + index, // hash—索引
        chunk: file, // 切片对应的文件对象
        size: file.size, // 切片的大小
        uploaded: getChunkStorage && getChunkStorage.includes(index), // 标识：是否已完成上传
        progress: getChunkStorage && getChunkStorage.includes(index) ? 100 : 0,
        status: g
 */

const sendRequest = (forms, chunkData) => {
	console.log('要发送的切片数据4', forms);
	// console.log('原始切片数据5', chunkData)
	let finished = 0;
	const total = forms.length;
	//const that = this
	const retryArr = []; // 数组存储每个文件hash请求的重试次数，做累加 比如[1,0,2],就是第0个文件切片报错1次，第2个报错2次

	return new Promise((resolve, reject) => {
		const handler = () => {
			// console.log('handler -> forms', forms)
			if (forms.length) {
				// 出栈
				const formInfo = forms.shift(); //移除第一个元素

				const formData = formInfo.formData;
				const index = formInfo.index; // 全部切片中的下标

				instance
					.post('fileChunk', formData, {
						onUploadProgress: createProgresshandler(chunkData[index]), //  传入切片的信息
						cancelToken: new CancelToken((c) => cancels.value.push(c)), // axios的函数 所用请求多存在cancels,执行c()函数这个请求取消
						timeout: 0, // 请求永不超时，不中断
					})
					.then((res) => {
						// console.log('handler -> res', res)
						// 更改状态
						chunkData[index].uploaded = true; // 上传完
						chunkData[index].status = 'success'; //

						// 存储已上传的切片下标 key为文件的hash，key为已上传的数字[0,1,2,3,4]
						addChunkStorage(chunkData[index].fileHash, index);

						finished++;
						handler();
					})
					.catch((e) => {
						// 若状态为暂停或等待，则禁止重试
						// console.log('handler -> this.status', status.value)
						if ([Status.pause, Status.wait].includes(status.value)) return;

						// console.warn('出现错误', e)
						// console.log('handler -> retryArr', retryArr)
						if (typeof retryArr[index] !== 'number') {
							retryArr[index] = 0; //初始化错误
						}

						// 更新状态
						chunkData[index].status = 'warning';

						// 累加错误次数
						retryArr[index]++;

						// 重试3次
						if (retryArr[index] >= props.chunkRetry) {
							// console.warn(' 重试失败--- > handler -> retryArr', retryArr, chunkData[index].hash)
							return reject('重试失败', retryArr);
						}

						console.log('handler -> retryArr[finished]', `${chunkData[index].hash}--进行第 ${retryArr[index]} '次重试'`);

						// console.log(retryArr)

						tempThreads.value++; // 释放当前占用的通道

						// 将失败的重新加入队列
						forms.push(formInfo);
						handler();
					});
			}

			if (finished >= total) {
				resolve('done');
			}
		};

		// 控制并发
		for (let i = 0; i < tempThreads.value; i++) {
			handler();
		}
	});
};

// 切片上传进度
const createProgresshandler = (item) => {
	///console.log('正在上传的切片信息', item)
	return (p) => {
		//p是progressEvent，原生进度 loaded已上传，/总长度
		item.progress = parseInt(String((p.loaded / p.total) * 100)); // 获得当前切片的上传进度

		// console.log('单个切片进度', item.progress)
		fileProgress();
	};
};

// 当前上传文件总进度
const fileProgress = () => {
	const currentFile = uploadFiles.value[fileIndex.value].FileState;
	//console.log('总切片的进度', currentFile)
	if (currentFile) {
		const uploadProgress = currentFile.chunkList
			.map((item) => item.size * item.progress) // 每个切片的大小*当前进度=这个的量
			.reduce((acc, cur) => acc + cur); // 累加已经上传的量

		const currentFileProgress = parseInt((uploadProgress / uploadFiles.value[fileIndex.value].rawFile.size).toFixed(2));

		// console.log('总切片进度', uploadProgress, currentFile.size, currentFileProgress)

		//真假进度条处理--处理进度条后移 fakeUploadProgress停止后的进度条
		if (!currentFile.fakeUploadProgress) {
			currentFile.uploadProgress = currentFileProgress;
		} else if (currentFileProgress > currentFile.fakeUploadProgress) {
			currentFile.uploadProgress = currentFileProgress;
		}
	}
};

// 存储已上传完成的切片下标

// name 已上传文件的hash，index在全部切
const addChunkStorage = (name, index) => {
	const data = [index];
	// console.log('addChunkStorage -> name, data', name, data)
	const arr = getObjArr(name);
	if (arr) {
		saveObjArr(name, [...arr, ...data]);
	} else {
		saveObjArr(name, data);
	}
};

// 通知服务端合并切片
const mergeRequest = (data) => {
	return new Promise((resolve, reject) => {
		const obj = {
			md5: data.FileState.fileHash, //文件的hash
			fileName: data.rawFile.name, //文件的名字
			fileChunkNum: data.FileState.chunkList.length, //切片的长度
			...props.uploadArguments,
		};

		instance
			.post('fileChunk/merge', obj, {
				timeout: 0,
			})
			.then((res) => {
				// 清除storage
				if (res.data.code === 2000) {
					data.FileState.status = fileStatus.success; //整个文件上传成功
					// console.log('mergeRequest -> data', data)
					clearLocalStorage(data.FileState.fileHash);
					// this.$message.success('上传成功');
					ElNotification({
						title: 'success',
						message: `第${fileIndex.value + 1}个文件上传成功`,
						type: 'success',
					});

					// 判断是否所有都成功上传

					isAllStatus();

					resolve();
				} else {
					// 文件块数量不对，清除缓存
					clearLocalStorage(data.FileState.fileHash);
					data.FileState.status = fileStatus.error;
					status.value = Status.wait; //全部上传为等待状态
					resolve();
				}
			})
			.catch((err) => {
				console.log('mergeRequest -> err', err);
				data.FileState.status = fileStatus.error;
				reject(err);
			});
	});
};

// 暂停上传
const handlePause = () => {
	status.value = Status.pause;
	if (uploadFiles.value.length) {
		const currentFile = uploadFiles.value[fileIndex.value];
		currentFile.FileState.status = fileStatus.pause;
		// 将当前进度赋值给假进度条
		currentFile.FileState.fakeUploadProgress = currentFile.FileState.uploadProgress;
		// console.log('handlePause -> currentFile', currentFile)
	}
	while (cancels.value.length > 0) {
		cancels.value.pop()('取消请求');
	}
};
// 恢复上传
const handleResume = () => {
	status.value = Status.uploading;
	// console.log(
	//   'handleResume -> this.uploadFiles.value[fileIndex.value]',
	//   uploadFiles.value[fileIndex.value]
	// )
	uploadFiles.value[fileIndex.value].FileState.status = fileStatus.resume;
	handleUpload();
};

// 清空文件
const clearFiles = () => {
	// console.log('清空文件')
	fileIndex.value = 0;
	handlePause();

	worker.value && worker.value.terminate(); // 中断worker
	status.value = Status.wait;

	//Object.assign(this.$data, this.$options.data()) // 重置data所有数据

	uploadFiles.value = []; // 文件列表
	worker.value = null;
	cancels.value = []; // 存储要取消的请求
	tempThreads.value = 3; //
	status.value = Status.wait;
};

//外部传入并发数

tempThreads.value = props.threads;
</script>
<style lang="scss">
.simple-upload-container {
	width: 100%;
	border: 1px solid #d2d2d2;
	border-radius: 4px;
	background-color: #fff;
	padding-bottom: 15px;
	padding: 10px;

	.progress-box {
		width: 100%;
	}

	.btns {
		position: relative;

		.select-file-input {
			position: absolute;
			display: inline-block;
			left: 0;
			top: 0;
			border: none;
			opacity: 0;
			width: 96px;
			height: 28px;
		}
	}

	.total-progress {
		margin-bottom: 15px;
	}

	.filename {
		white-space: nowrap;
		/* 强制文本在一行中显示 */
		overflow: hidden;
		/* 溢出隐藏*/
		text-overflow: ellipsis;
		/* 文本超出后显示省略号*/
		width: 100%;
	}

	.item-progress {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;

		p {
			white-space: nowrap;
			/* 强制文本在一行中显示 */
			overflow: hidden;
			/* 溢出隐藏*/
			text-overflow: ellipsis;
			/* 文本超出后显示省略号*/
			width: 35%;
		}
	}

	.el-progress--line {
		width: 350px;
	}

	.upload-tip {
		font-size: 12px;
		color: #606266;
		margin-top: 7px;
	}
}
</style>
