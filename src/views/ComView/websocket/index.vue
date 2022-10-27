<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-21 10:25:52
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-24 01:13:12
 * @FilePath: \mksz542\src\views\ComView\websocket\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="websocket">
		<el-card v-show="ischat" class="simulator">
			<!-- 导航 -->

			<van-nav-bar title="多人聊天群" left-text="返回" right-text="按钮" left-arrow @click-right="onClickRight">
				<template #right>
					<van-icon name="ellipsis" size="18" />
				</template>
			</van-nav-bar>
			<!-- 内容区 -->
			<div class="content">
				<template v-for="(item, index) in AllMessage" :key="item[0]">
					<div v-if="item[1] !== username" class="chartItem">
						<div class="left">
							<van-image width="40" height="40" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
						</div>
						<div class="right">
							<p class="Username">{{ item[1] }}</p>

							<div class="word" v-text="item[0]"></div>
						</div>
					</div>

					<div v-else class="chartItem-self">
						<div class="right">
							<div class="word" v-text="item[0]"></div>
						</div>
						<div class="left">
							<van-image width="40" height="40" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
						</div>
					</div>
				</template>
			</div>
			<div class="bottom">
				<van-cell-group inset>
					<van-field v-model="message" rows="1" autosize type="textarea" placeholder="请输入留言" />
				</van-cell-group>
				<div class="button">
					<van-button type="success" size="mini" @click="submit">发送</van-button>
				</div>
			</div>

			<van-notify v-model:show="show" type="warning">
				<van-icon name="bell" style="margin-right: 4px" />
				<span>输入的文字要大于3</span>
			</van-notify>
		</el-card>

		<el-card v-show="!ischat" class="simulator">
			<!-- 导航 -->

			<van-nav-bar title="在线" left-text="返回" right-text="按钮" left-arrow @click-right="onClickRight">
				<template #right>
					<van-icon name="ellipsis" size="18" />
				</template>
			</van-nav-bar>
			<!-- 内容区 -->
			<div class="content">
				<p v-for="(item, index) in userlist">{{ index + 1 }}.{{ item }}</p>
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { ref } from 'vue';
// import { showNotify } from 'vant'
import { io, Manager } from 'socket.io-client';
import 'vant/lib/index.css';

// import { showToast } from 'vant'
// const chart = ref(
//   'skfljdlkfjsdklfjlskd 大飒飒佛挡杀佛个水电费就sad路口附近SDK理发店SDK封建时代了开发即使到了上岛咖啡就爱上了的看法sdfsdfsdfsdfsdfsdfsdfsdf'
// )
const onClickRight = () => {
	ischat.value = !ischat.value;
};
const ischat = ref(true);
const show = ref(false);
const message = ref(''); //发送的数据
const userlist = ref(); // 聊天的人数列表
const AllMessage = ref();
const username = ref('匿名用户');
let socket = io('/');

username.value = prompt('请输入用户名') || '匿名用户:' + Math.random().toString(36).slice(-6);

// 监听浏览器与服务器连接
socket.on('connect', function (...args) {
	// 连接成功后就直接

	///  document.querySelector('.username').innerHTML = `<h1>${username}</h1>`

	//发送消息
	socket.emit('Newclient', {
		username: username.value,
	});
	//
});

socket.on('usernameErr', function (...args) {
	// 连接成功后就直接
	//
	alert('名字重复了');
	//  console.log('发送错误', args)
	//
});

// 监听消息 连接可以写在外面
socket.on('userlist', (args) => {
	// console.log('监听消息', args)
	userlist.value = args.userlist;
});

// 监听用户消息

socket.on('userMsgs', (args) => {
	// console.log('全部用户消息', args)
	AllMessage.value = args;
});

const submit = () => {
	if (message.value.length > 3) {
		socket.emit('uerMsg', message.value, username.value, new Date());
	} else {
		// showNotify({ type: 'warning', message: '输入的文字要大于3' })
		show.value = true;
		let timer = null;
		clearTimeout(timer);
		timer = setTimeout(() => {
			show.value = false;
		}, 1000);
	}
};
</script>
<style scoped lang="scss">
.chartItem {
	display: flex;
	padding: 10px;
	.right {
		margin-left: 10px;
		.Username {
			font-size: 12px;
			font-weight: 700;
		}
		.word {
			// margin-left: 10px;
			margin-top: 5px;
			font-size: 15px;
			background-color: white;
			border-radius: 10px;
			padding: 3px;
		}
	}
}
.van-cell-group--inset {
	margin: 0 !important;
}
.chartItem-self {
	display: flex;
	padding: 10px;
	justify-content: end;
	.right {
		.word {
			margin-right: 10px;
			// margin-top: 5px;
			font-size: 15px;
			background-color: white;
			border-radius: 10px;
			padding: 3px;
		}
	}
}

.bottom {
	background-color: #184877;
	display: grid;
	grid-template-columns: 4fr 1fr;
	grid-template-rows: 1fr;
	.button {
		display: flex;
		justify-content: center;
		align-content: center;
		align-self: center;
	}
}

.simulator {
	color: #323233;
	font-size: 16px;
	font-family: Open Sans, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB,
		Microsoft Yahei, sans-serif;
	-webkit-font-smoothing: antialiased;
	// position: absolute;
	// top: calc(var(--van-doc-padding) + var(--van-doc-header-top-height));
	// right: var(--van-doc-padding);
	// z-index: 1;
	box-sizing: border-box;
	width: 360px;
	min-width: 360px;
	overflow: hidden;
	background: #fff;
	border-radius: 20px;
	margin: 80px auto;
	height: 640px;
}
.content {
	height: 500px;
	overflow: hidden;
	overflow-y: scroll;
	background-color: #eff2f5;
}

/*滚动条样式*/
.content::-webkit-scrollbar {
	width: 1px;
	/*height: 4px;*/
}
// /*滚动条里面小方块*/

.content::-webkit-scrollbar-thumb {
	height: 10px;
	border-radius: 1px;
	//-webkit-box-shadow: inset 0 0 1px rgba(189, 151, 151, 0.2);
	background: rgb(139, 167, 188);
}
// 滚动条的轨道
.content::-webkit-scrollbar-track {
	// -webkit-box-shadow: inset 0 0 5px rgba(197, 122, 122, 0.2);
	border-radius: 0;
	// background: #9da4b0;
}
</style>
