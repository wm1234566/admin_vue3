<template>
	<div class="header-search" :class="{ show: isShow }">
		<SvgIcon id="guide-search" ref="icon" class="search-icon" icon="search" size="24px" @click.stop="isShow = !isShow"> </SvgIcon>

		<el-select
			ref="SearchCom"
			v-model="value"
			filterable
			remote
			reserve-keyword
			placeholder="Search"
			:remote-method="remoteMethod"
			:loading="loading"
			class="header-search-select"
			@change="onSelectChange"
		>
			<el-option v-for="item in options" :key="item.item.path" :label="item.item.title.join(' > ')" :value="item.item" />
		</el-select>
	</div>
</template>

<script setup>
//:class='{"show":isShow}'
import { useRouter } from 'vue-router';
import Fuse from 'fuse.js';

const router = useRouter();

import { filterRouter } from '../../utilities/RouterMenu';
import { createFuseData } from './FuseData';

// console.log('路由', filterRouter(router.getRoutes()), '--->', createFuseData(filterRouter((router.getRoutes()))))

// 展示搜索结果
const loading = ref(false);
const value = ref([]);
let icon = ref(null);
const options = ref([]);

// 搜索条是否显示
const isShow = ref(false);

const onClose = (event) => {
	// isShow.value = false
	// console.log('xxdfdf',event, icon)
	if (event?.target?.classList[0] === 'svg-name') {
	} else {
		SearchCom.value.blur(); // 关闭焦点
		isShow.value = false;
		options.value = [];
	}
};

// 点击空白的地方关闭 搜索狂
watch(isShow, (newValue) => {
	// console.log(newValue)

	if (newValue) {
		document.body.addEventListener('click', onClose);
	} else {
		document.body.removeEventListener('click', onClose);
	}
});

// 选择种后
let SearchCom = ref(null);

const onSelectChange = (arg) => {
	// console.log("...",arg)
	// 参数是 itme.item
	router.push({ path: arg.path });
	value.value = '';
	options.value = [];
	isShow.value = false;
	// console.log("组件",SearchCom.value)
};
/// 搜索
const remoteMethod = (query) => {
	searchPool.value = createFuseData(filterRouter(router.getRoutes()));
	if (query) {
		loading.value = true;
		setTimeout(() => {
			loading.value = false;

			// options.value = list.value.filter((item) => {
			//   return item.label.toLowerCase().includes(query.toLowerCase())
			// })
			// console.log("搜索结果",searchPool,"xdfd",fuse.search(query))

			//
			options.value = fuse.search(query);

			// options.value = fuse.search(query).map(item=> {
			//   console.log(item.item.title)
			//   return { value: item.item.title.join(">"), label: "" }
			// })
		}, 200);
	} else {
		options.value = [];
	}
};

const searchPool = computed(() => {
	return createFuseData(filterRouter(router.getRoutes()));
});

const fuse = new Fuse(searchPool.value, {
	// 是否按优先级进行排序
	shouldSort: true,
	// 匹配长度超过这个值的才会被认为是匹配的
	minMatchCharLength: 1,
	// 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
	// name：搜索的键
	// weight：对应的权重
	keys: [
		{
			name: 'title',
			weight: 0.7,
		},
		{
			name: 'path',
			weight: 0.3,
		},
	],
});
</script>

<style scoped lang="scss">
.header-search {
	font-size: 0 !important;
	background-color: white;
	transition: background 0.2s;

	.search-icon {
		cursor: pointer;
		font-size: 18px;
		vertical-align: middle;
	}

	.header-search-select {
		font-size: 18px;
		transition: width 0.2s;
		width: 0;
		overflow: hidden;
		background: transparent;
		border-radius: 0;
		display: inline-block;
		vertical-align: middle;

		:deep(.el-input__wrapper) {
			background-color: transparent;
			box-shadow: none !important;

			.el-input__inner {
				background-color: transparent;
				border-radius: 0;
				border: 0;
				padding-left: 0;
				padding-right: 0;
				box-shadow: none !important;
				border-bottom: 1px solid #d9d9d9;
				vertical-align: middle;
			}
		}
	}

	&.show {
		background-color: rgba(0, 0, 0, 0.025);

		.header-search-select {
			width: 210px;
			margin-left: 10px;
		}
	}
}
</style>
