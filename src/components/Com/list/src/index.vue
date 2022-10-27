<template>
	<div class="list-tabs__item">
		<el-tabs stretch>
			<el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
				<el-scrollbar max-height="300px">
					<div v-for="(item1, index1) in item.content" :key="index1" class="container" @click="clickItem(item1, index1)">
						<div v-if="item1.avatar" class="avatar">
							<el-avatar size="small" :src="item1.avatar"></el-avatar>
						</div>
						<div class="content">
							<div v-if="item1.title" class="title">
								<div>{{ item1.title }}</div>
								<el-tag v-if="item1.tag" size="small" :type="item1.tagType">{{ item1.tag }}</el-tag>
							</div>
							<div v-if="item1.desc" class="time">{{ item1.desc }}</div>
							<div v-if="item1.time" class="time">{{ item1.time }}</div>
						</div>
					</div>
					<div class="actions">
						<div v-for="(action, i) in actions" :key="i" class="a-item" :class="{ border: i !== actions.length }" @click="clickAction(action, i)">
							<div v-if="action.icon" class="a-icon">
								<el-icon> <component :is="action.icon"></component></el-icon>
							</div>
							<div class="a-text">{{ action.text }}</div>
						</div>
					</div>
				</el-scrollbar>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
// import type { PropType } from "vue";
// import type { ListOptions, ActionOptions, ListItem } from "./types";

let props = defineProps({
	// 列表的内容
	list: {
		type: Array,
		required: true,
	},
	// 操作的内容
	actions: {
		type: Array,
		default: () => [],
	},
});
let emits = defineEmits(['clickItem', 'clickAction']);

let clickItem = (item, index) => {
	emits('clickItem', { item, index });
};
let clickAction = (item, index) => {
	emits('clickAction', { item, index });
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	align-items: center;
	padding: 12px 20px;
	cursor: pointer;
	&:hover {
		background: #e6f6ff;
	}
	.avatar {
		flex: 1;
	}
	.content {
		flex: 3;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.time {
			font-size: 12px;
			color: #999;
			margin-top: 4px;
		}
	}
}
.actions {
	height: 50px;
	display: flex;
	align-items: center;
	border-top: 1px solid #eee;
	.a-item {
		height: 50px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		.a-icon {
			margin-right: 4px;
			position: relative;
			top: 2px;
		}
	}
}
.border {
	border-right: 1px solid #eee;
}
</style>
