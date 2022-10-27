<template>
	<div class="Author">
		<el-card>
			<el-table ref="table" :data="clientInfo" border style="width: 100%">
				<el-table-column type="index" :index="indexMethod" label="#" />
				<el-table-column prop="key" label="名字" />
				<el-table-column prop="value" label="值" />
			</el-table>
		</el-card>

		<input id="files-list" ref="filexx" type="file" accept=".xlxs" @change="changeFile" />
	</div>
</template>

<script setup>
import { ref, useSlots, useAttrs } from 'vue';
// mport { } from 'vue'

const slots = useSlots();
const attrs = useAttrs();

console.log('slots和attrs', slots, attrs);

let filexx = ref(null);

let table = ref(null);

const clientInfo = ref([
	{ key: '浏览器全名', value: navigator.appCodeName },
	{ key: '浏览器是否启用cookie', value: navigator.cookieEnabled },
	{ key: '浏览器的主语言', value: navigator.language },
	{ key: '浏览器运行的系统平台', value: navigator.platform },
	{ key: '浏览器是否联网', value: navigator.onLine },
	{ key: '浏览器用户代理', value: navigator.userAgent },
	{ key: '主机系统内存', value: navigator.deviceMemory + 'GB' },
	{ key: '主机处理器核心数量', value: navigator.hardwareConcurrency + '个核心' },
	//   {key:"浏览器给的权限",value:navigator}
]);

const indexMethod = (index) => {
	return index + 1;
};
const changeFile = (e) => {
	console.log('e', e);
};
onMounted(() => {
	// file.value
	console.log('el', table.value, filexx.value);

	navigator.getBattery().then(function (battery) {
		console.log(battery);
		clientInfo.value.push({ key: '是否充电', value: battery.charging });
		clientInfo.value.push({ key: '充满还要多久', value: battery.chargingTime });
		clientInfo.value.push({ key: '电池可用时间', value: battery.dischargingTime });
		clientInfo.value.push({ key: '电池电量百分比', value: battery.level * 100 + '%' });
	});

	// console.log('数据', file, document.getElementById('files-list'))

	Notification.requestPermission().then(
		(...arg) => {
			// console.log('申请通知权限', arg)

			let n = new Notification('title', { body: 'body', image: 'xxx.png', vibrate: true });
		},
		(err) => {}
	);

	navigator.permissions.query({ name: 'notifications' }).then(
		(...data) => {
			// console.log('xx1', data)
			clientInfo.value.push({ key: '通知权限', value: data[0].state });
		},
		(err) => {}
	);
	navigator.permissions.query({ name: 'geolocation' }).then(
		(...data) => {
			// console.log('xx2', data)

			clientInfo.value.push({ key: '定位权限', value: data[0].state });
		},
		(err) => {}
	);

	navigator.permissions.query({ name: 'screen-wake-lock' }).then(
		(...data) => {
			// console.log('', data)
			clientInfo.value.push({ key: '防止锁屏权限', value: data[0].state });
		},
		(err) => {}
	);
});
//console.log('权限', navigator.permissions.query({ name: 'notifications' }))

/// 网页加载速度
const [performanceNavigationTimingEntry] = performance.getEntriesByType('navigation');

const performanceResourceTimingEntry = performance.getEntriesByType('resource')[0];
console.log('页面加载速度', performanceNavigationTimingEntry, '加载资源的速度', performanceResourceTimingEntry);
</script>

<style scoped lang="scss"></style>
