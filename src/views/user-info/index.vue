<template>
	<div class="user-info-container">
		<el-card class="print-box">
			<el-button v-print="printObj" type="primary" :loading="printLoading">{{ $t('msg.userInfo.print') }}</el-button>
		</el-card>
		<el-card>
			<div id="userInfoBox" class="user-info-box">
				<!-- 标题 -->
				<h2 class="title">{{ $t('msg.userInfo.title') }}</h2>

				<div class="header">
					<!-- 头部渲染表格 -->
					<el-descriptions :column="2" border>
						<el-descriptions-item :label="$t('msg.userInfo.name')">{{ detailData.username }}</el-descriptions-item>
						<el-descriptions-item :label="$t('msg.userInfo.sex')">{{ detailData.gender }}</el-descriptions-item>
						<el-descriptions-item :label="$t('msg.userInfo.nation')">{{ detailData.nationality }}</el-descriptions-item>

						<el-descriptions-item :label="$t('msg.userInfo.mobile')"
							>152xxxxxxxx

							<!--              {{-->
							<!--              detailData.mobile-->
							<!--              }}-->
						</el-descriptions-item>

						<el-descriptions-item :label="$t('msg.userInfo.province')">
							广东省深圳市宝安区xxx街道xxx小区xx栋
							<!--              {{-->
							<!--              detailData.province-->
							<!--            }}-->
						</el-descriptions-item>
						<el-descriptions-item :label="$t('msg.userInfo.date')">{{ timestampToTime(detailData.openTime) }}</el-descriptions-item>
						<el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
							<el-tag v-for="(item, index) in detailData.remark" :key="index" class="remark" size="small">{{ item }}</el-tag>
						</el-descriptions-item>
						<el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">{{ detailData.address }}</el-descriptions-item>
					</el-descriptions>
					<!-- 头像渲染 -->
					<!--          :src="detailData.avatar"-->
					<el-image class="avatar" src="https://q1.qlogo.cn/g?b=qq&s=100&nk=2100173067" :preview-src-list="[detailData.avatar]"></el-image>
				</div>
				<div class="body">
					<!-- 内容渲染表格 -->
					<el-descriptions direction="vertical" :column="1" border>
						<el-descriptions-item :label="$t('msg.userInfo.experience')">
							<ul>
								<li v-for="(item, index) in detailData.experience" :key="index">
									<span>
										{{ timestampToTime(item.startTime) }}
										----
										{{ timestampToTime(item.endTime) }}</span
									>
									<span>
										<!--                    {{ item.title }}-->

										xxx科技有限公司
									</span>
									<span>
										xxxx项目

										<!--                    {{ item.desc }}-->
									</span>
								</li>
							</ul>
						</el-descriptions-item>
						<el-descriptions-item :label="$t('msg.userInfo.major')">
							<!--              {{ detailData.major }}-->
							计算机工程
						</el-descriptions-item>
						<el-descriptions-item :label="$t('msg.userInfo.glory')">
							<!--              {{ detailData.glory }}-->
							王者
						</el-descriptions-item>
					</el-descriptions>
				</div>
				<!-- 尾部签名 -->
				<div class="foot">{{ $t('msg.userInfo.foot') }}</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getUserManageDetail } from '../../utilities/Request';
import { timestampToTime } from '../../utilities/DateTransform';
const Props = defineProps({
	id: {
		type: String,
		required: true,
	},
});

// 打印指令 使用局部指令

import print from 'vue3-print-nb';

const vPrint = print;
// mounted: (el) => el.focus()

const detailData = ref({});

let Route = useRoute();
// console.log('本网页的路由', Route, Props.id)

getUserManageDetail(Props.id).then(
	(data) => {
		console.log('数据', data);
		if (data.success === true) {
			detailData.value = data.data;
		} else {
			ElMessage.error(data.message);
		}
	},
	(err) => {
		ElMessage.error('请求错误');
	}
);

// 打印相关
const printLoading = ref(false);
const printObj = {
	// 打印区域   id选择器
	id: 'userInfoBox',
	// 打印标题
	popTitle: 'vue-element-admin', // 打印配置页上方的标题
	// 打印前
	beforeOpenCallback(vue) {
		printLoading.value = true;
	},
	// 执行打印
	openCallback(vue) {
		printLoading.value = false; // 关闭窗口
	},

	extraHead: '打印', // 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
	preview: true, // 是否启动预览模式，默认是false
	previewTitle: '打印员工信息预览', // 打印预览的标题
	previewPrintBtnLabel: '预览结束，开始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
	zIndex: 20002, // 预览窗口的z-index，默认是20002，最好比默认值更高
	previewBeforeOpenCallback() {
		console.log('正在加载预览窗口！');
		// console.log(that.msg, this)
	}, // 预览窗口打开之前的callback
	previewOpenCallback() {
		console.log('已经加载完预览窗口，预览打开了！');
	}, // 预览窗口打开时的callback
	beforeOpenCallback() {
		console.log('开始打印之前！');
	}, // 开始打印之前的callback
	// openCallback () { console.log('执行打印了！') }, // 调用打印时的callback
	closeCallback() {
		console.log('关闭了打印工具！');
	}, // 关闭打印的callback(无法区分确认or取消)
	clickMounted() {
		console.log('点击v-print绑定的按钮了！');
	},
	// url: 'http://localhost:8080/', // 打印指定的URL，确保同源策略相同
	// asyncUrl (reslove) {
	//   setTimeout(() => {
	//     reslove('http://localhost:8080/')
	//   }, 2000)
	// },
	standard: '',
	extarCss: '',
};
</script>

<style lang="scss" scoped>
.print-box {
	margin-bottom: 20px;
	text-align: right;
}
.user-info-box {
	width: 1024px;
	margin: 0 auto;
	.title {
		text-align: center;
		margin-bottom: 18px;
	}
	.header {
		display: flex;
		::v-deep .el-descriptions {
			flex-grow: 1;
		}
		.avatar {
			width: 187px;
			box-sizing: border-box;
			padding: 30px 20px;
			border: 1px solid #ebeef5;
			border-left: none;
		}
		.remark {
			margin-right: 12px;
		}
	}
	.body {
		ul {
			list-style: none;
			li {
				span {
					margin-right: 62px;
				}
			}
		}
	}
	.foot {
		margin-top: 42px;
		text-align: right;
	}
}
</style>
