<!-- 组件描述:  -->
<template>
	<el-button @click="$emit('update:visible', true)">
		<slot></slot>
		<template #icon>
			<slot name="icon" :icon-name="SelectItem"></slot>
		</template>
	</el-button>

	<el-dialog v-model="visible" :title="title" width="50%" draggable @closed="$emit('update:visible', false)">
		<div class="container">
			<el-scrollbar max-height="400px">
				<div v-for="(item, index) in Object.keys(ElementPlusIconsVue)" :key="item" class="icon-item" @click="SelectIcon(item)">
					<div><component :is="item"></component></div>

					<p>{{ item }}</p>
				</div>
			</el-scrollbar>
		</div>
	</el-dialog>
</template>

<script setup>
import { ref, useAttrs, useSlots, watch } from 'vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const slots = useSlots();
const attrs = useAttrs();
console.log('slots和attrs', slots, attrs);
// let componentAll = ref<{ name: string; compnet }>([]);
// 引入全部图标

// const visibles=ref(false)
//
let SelectItem = ref('');
const SelectIcon = (item) => {
	SelectItem.value = item;
	if (navigator.clipboard) {
		navigator.clipboard.writeText(`<el-icon><${item} /></el-icon>`).then(() => {
			ElMessage({
				message: '复制成功！',
				grouping: true,
				type: 'success',
			});
		});
	}
};

let props = defineProps({
	title: {
		type: String,
		default: '选择图标',
	},
	visible: {
		type: Boolean,
		default: false,
	},
});
//
// watch(()=>props.visible,(newValue)=>{
//   console.log("改变了")
//   // visibles.value=newValue
// },{
//   deep:true,
//   immediate:true
// })
</script>

<style scoped lang="scss">
.container {
	//overflow-y: scroll;
	//height: 60vh;
	:deep(.el-scrollbar__view) {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		justify-items: center;
	}
	& .icon-item {
		text-align: center;
		cursor: pointer;
		width: 20%;
		p {
			font-size: 12px;
		}
		svg {
			width: 2em;
			height: 2em;
		}
	}
}
</style>
