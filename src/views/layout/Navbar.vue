<template>
	<div class="NavBar">
		<div class="Nav_left" @click="CssVar.SidebarOpened = !CssVar.SidebarOpened">
			<SvgIcon id="guide-hamburger" :icon="CssVar.SidebarOpened ? 'hamburger-opened' : 'hamburger-closed'" size="20px"></SvgIcon>
		</div>

		<div class="Nav_title"><Breadcrumb></Breadcrumb></div>

		<div class="Nav_right">
			<div class="icon_0"><Trash></Trash></div>
			<div class="icon_1"><Guide></Guide></div>
			<div class="icon_2">
				<HeaderSearch></HeaderSearch>
			</div>
			<div class="icon_3">
				<ScreenFull></ScreenFull>
			</div>
			<div class="icon_4">
				<ThemeSelect></ThemeSelect>
			</div>
			<div class="icon_5">
				<LangSelect></LangSelect>
			</div>
			<div class="icon_6">
				<el-dropdown trigger="click">
					<el-button type="primary">
						<!--            <el-avatar :src="Admin.userData.data?.avatar" shape="square" />-->
						<el-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=2100173067" shape="square" />
					</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>
								<router-link to="/" style="text-decoration: none; color: #606266"
									><span>{{ $t('msg.navBar.home') }}</span></router-link
								>
							</el-dropdown-item>
							<el-dropdown-item>{{ $t('msg.navBar.userInfor') }}</el-dropdown-item>
							<el-dropdown-item>{{ $t('msg.navBar.CPassword') }}</el-dropdown-item>
							<el-dropdown-item divided @click="dialogVisible = true">{{ $t('msg.navBar.logout') }}</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>

				<!--      // 退出对话框-->
				<el-dialog v-model="dialogVisible" width="30%" draggable>
					<span>{{ Admin?.userData?.data?.username }},您是否退出登录？</span>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialogVisible = false">取消</el-button>
							<el-button type="primary" @click="logOut">确认</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
		</div>
	</div>

	<TagsView></TagsView>
</template>

<script setup>
import { useAdminStore } from '@/stores/admin';
import { useCssVarStore } from '@/stores/cssVar';
import { useRouter } from 'vue-router';
import Breadcrumb from '../../components/Breadcrumb/index.vue';
import ThemeSelect from '../../components/ThemeSelect/index.vue';
import ScreenFull from '../../components/ScreenFull/index.vue';
import LangSelect from '@/components/LangSelect/index.vue';
import HeaderSearch from '../../components/HeaderSearch/index.vue';
import TagsView from '../../components/TagsView/index.vue';
import Guide from '../../components/Guide/index.vue';
import Trash from '../../components/Trash/index.vue';
let Admin = useAdminStore();
let CssVar = useCssVarStore();
let router = useRouter();
import { ref } from 'vue';

let dialogVisible = ref(false);

const logOut = () => {
	dialogVisible.value = false;
	//退出登录
	Admin.logOut(router);
};
</script>

<style scoped lang="scss">
.NavBar {
	height: 50px;
	box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
	background-color: white;
	overflow: hidden;
	min-width: 530px;
	width: 100%;
	.Nav_left {
		height: 35px;
		padding: 15px 16px 0 16px;
		width: 20px;
		float: left;
		cursor: pointer;
		// hover 动画
		transition: background 0.5s;

		&:hover {
			background: rgba(0, 0, 0, 0.1);
		}
	}
	.Nav_title {
		float: left;
		height: 100%;
		overflow: hidden;
		//background-color: #968578;
	}
	.Nav_right {
		height: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		float: right;

		> div {
			margin-right: 18px;
		}

		margin-right: 16px;

		.icon_6 {
			width: 40px;
			height: 50px;
			:deep(.el-tooltip__trigger) {
				background: none;
				margin: 5px auto;
				overflow: hidden;
				width: 40px;
				height: 40px;
				padding: 0;
				outline: none;
				border: none;
				.el-avatar--square {
					background: none;
				}
			}
		}
	}
}
</style>
