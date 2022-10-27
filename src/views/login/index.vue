<!--1.问题总结：配置element plus 自动使用图标的两个网站，先配置vite.js
 https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L21-L58

 再配置：https://www.weipxiu.com/8706.html
 -->

<template>
	<div class="login">
		<h1>
			{{ $t('msg.login.title') }}
			<div class="language">
				<LangSelect></LangSelect>
			</div>
		</h1>
		<el-form ref="formRef" :model="form" :rules="rules">
			<el-form-item prop="username">
				<div class="icon_left">
					<!--        <el-icon><i-ep-User /></el-icon>-->
					<SvgIcon icon="user" size="14px"></SvgIcon>
				</div>

				<el-input v-model="form.username" :placeholder="$t('msg.login.usernameT')" />
			</el-form-item>
			<el-form-item prop="password">
				<div class="icon_left">
					<SvgIcon icon="password" size="14px"></SvgIcon>
				</div>
				<el-input ref="passWord" v-model="form.password" type="password" :placeholder="$t('msg.login.passwordT')" />
				<div class="icon_right" @click="show">
					<SvgIcon :icon="icon" size="15px"></SvgIcon>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit(formRef)">{{ $t('msg.login.loginBtn') }}</el-button>
			</el-form-item>
			<!--      <div v-html="$t('msg.login.desc')" class="tip"></div>-->
			<div class="tip">
				提供三种权限账号：<br />
				1. 超级管理员账号： super-admin<br />
				2. 管理员账号：admin<br />
				3. 测试可配置账号：test<br />
				密码统一为：123456<br />
				注意：导入用户区分中英文库！！！！
			</div>
		</el-form>
	</div>
</template>

<!--不能写lang=js-->
<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue';
import { ref, reactive } from 'vue';
import { password, username } from '@/utilities/validate';
import { useAdminStore } from '@/stores/admin';
import { useRoute, useRouter } from 'vue-router';
import LangSelect from '@/components/LangSelect/index.vue';

import { useI18n } from 'vue-i18n';
let i18n = useI18n();
let router = useRouter();
let form = ref({ username: '', password: '' });
let formRef = ref();
let passWord = ref(); // password是不是显示
let icon = ref('eye');

const Adimin = useAdminStore();

const show = () => {
	icon.value === 'eye' ? (icon.value = 'eye-open') : (icon.value = 'eye');
	passWord.value.input.type === 'password' ? (passWord.value.input.type = 'text') : (passWord.value.input.type = 'password');
	// console.log(passWord.value.input.type)
	// 或者使用ref变量
};
const rules = ref({
	username: [
		{ required: true, message: i18n.t('msg.login.usernameReq'), trigger: 'blur' },
		{
			min: 3,
			max: 12,
			message: '长度在 3 到 12 个字符',
			trigger: 'blur',
		},
		{ validator: username, trigger: 'blur' },
	],

	password: [
		{ required: true, message: i18n.t('msg.login.passwordReq'), trigger: 'blur' },
		{
			min: 6,
			max: 12,
			message: '长度在 6 到 12 个字符',
			trigger: 'blur',
		},
		{ validator: password, trigger: 'blur' },
	],
});
let onSubmit = async (formRef) => {
	if (!formRef) return;
	await formRef.validate((valid, fields) => {
		if (valid && form.value.password) {
			Adimin.Login(form.value).then(
				(data) => {
					if (data.code === 200) {
						router.push({ name: 'prods' });
					} else {
						ElMessage({
							showClose: true,
							message: i18n.t('msg.login.loginError'),
							type: 'error',
						});
					}
				},
				(err) => {
					ElMessage({
						showClose: true,
						message: i18n.t('msg.login.loginError'),
						type: 'error',
					});
				}
			);
		} else {
			ElMessage({
				showClose: true,
				message: i18n.t('msg.login.EnterTdata'),
				type: 'error',
			});
		}
	});
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/base.scss';

.login {
	//font-size: 2vmax;
	width: 400px;
	height: 250px;
	margin: 200px auto;
	//background-color: #2d3a4b;
	h1 {
		font-size: 20px;
		color: white;
		text-align: center;
		padding-bottom: 30px;
		//position: relative;

		.language {
			float: right;

			:deep(svg) {
				background-color: white;
			}
		}
	}

	:deep(button) {
		width: 100%;
	}

	:deep(.el-input__wrapper) {
		padding: 0 30px 0 30px;
	}

	:deep(input) {
		background-color: transparent;
		border: none;
		border-radius: 0;

		color: $light_gray;
		//指定光标颜色
		caret-color: $cursor;
		outline: transparent;
	}

	:deep(div) {
		background-color: transparent;
		border: 0 solid rgba(255, 255, 255, 0.1);
		border-radius: 0;
	}

	:deep(.el-form-item) {
		margin-top: 18px;
	}

	:deep(.el-form-item__content) {
		position: relative;

		.icon_left {
			position: absolute;
			left: 8px;
			top: 3px;
		}

		.icon_right {
			position: absolute;
			right: 8px;
			top: 2px;
		}
	}
}

.tip {
	margin-top: 30px;
	color: white;
}
</style>
