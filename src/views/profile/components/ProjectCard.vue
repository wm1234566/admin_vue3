<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>介绍</span>
			</div>
		</template>
		<div class="user">
			<div class="profile">
				<p>Hello</p>
				<p>{{ Admin.userData.data.title }}</p>
				<!--        <SvgIcon class="icon" :icon="Admin.userData.data.avatar"></SvgIcon>-->

				<SvgIcon class="icon" icon="https://q1.qlogo.cn/g?b=qq&s=100&nk=2100173067"></SvgIcon>
			</div>

			<p>{{ Admin.userData?.data?.username }}</p>
			<p>{{ Admin.userData?.data?.title }}</p>
		</div>

		<div class="profile_bottom">
			<div class="project-bio-section">
				<div class="project-bio-section-header">
					<SvgIcon icon="introduce" size="16px" />
					<span>{{ $t('msg.profile.projectIntroduction') }}</span>
				</div>
				<div class="project-bio-section-body">
					<!--          {{ $t('msg.profile.muted') }}-->
					vue3+TS+pinia 改写vue-element-admin，实现后台通用后台管理系统
				</div>
			</div>

			<div class="project-bio-section">
				<div class="project-bio-section-header">
					<SvgIcon icon="reward" size="16px" />
					<span>{{ $t('msg.profile.projectFunction') }}</span>
				</div>

				<div class="project-bio-section-body">
					<div v-for="item in project?.data" :key="item.id" class="progress-item">
						<div class="progress-item-title">{{ item?.title }}</div>
						<el-progress :percentage="item.percentage" status="success" />
					</div>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script setup>
import { ref, onBeforeMount, defineProps } from 'vue';
import SvgIcon from '../../../components/SvgIcon/index.vue';
import { getFeature, getChapter } from '@/utilities/Request';
import { useAdminStore } from '@/stores/admin';

let Admin = useAdminStore();

defineProps({
	project: {
		type: Object,
		default: null,
	},
});

// console.log(this.project)
</script>

<style scoped lang="scss">
:slotted(.card-header) {
	text-align: center;
	margin: 0 auto;
	width: 100%;
	& span {
		display: inline-block;
		text-align: center;
		margin: 0 auto;
		font-size: 16px;
	}
}

.profile {
	width: 100px;
	height: 100px;
	margin: 0 auto;
	position: relative;
	border-radius: 100%;
	padding: 20px;
	box-shadow: inset 0 0 0 5px rgb(0 0 0 / 5%);

	p {
		overflow: hidden;
	}

	& :deep(.icon) {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 100%;
		transform-origin: 100% 50%;
		transition: all 0.3s ease;
	}
	&:hover :deep(.icon) {
		transform: rotate(-120deg);
	}
	& p {
		text-align: center;
	}
}
.user {
	> p {
		text-align: center;
		padding-top: 10px;
		font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
		font-size: 14px;
		font-weight: 400;
	}
	> p:first-of-type {
		font-weight: 700 !important;
	}
}

//

.project-bio-section {
	margin-bottom: 36px;

	.project-bio-section-header {
		vertical-align: middle;
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-bottom: 1px solid #dfe6ec;
		font-weight: 700;

		& span {
			margin-left: 4px;
			vertical-align: middle;
		}

		& svg {
			vertical-align: middle;
		}
	}

	.project-bio-section-body {
		font-size: 14px;
	}
	.progress-item {
		margin-top: 10px;
		.progress-item-title {
			margin-bottom: 2px;
		}
	}
}
</style>
