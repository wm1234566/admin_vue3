<!--
  文件描述：
  创建时间：2022/9/7 上午 10:20
-->

<template>
	<el-card>
		<el-table ref="table" :data="Data" border style="width: 100%">
			<el-table-column type="index" :index="indexMethod" label="#" />
			<el-table-column prop="key" label="指标" />
			<el-table-column prop="value" label="时间(时间戳)" />
		</el-table>
	</el-card>
</template>

<script setup>
import { ref } from 'vue';

const timingInfo = window.performance.timing;

// DNS解析，DNS查询耗时
timingInfo.domainLookupEnd - timingInfo.domainLookupStart;

// TCP连接耗时
timingInfo.connectEnd - timingInfo.connectStart;

// 获得首字节耗费时间，也叫TTFB
timingInfo.responseStart - timingInfo.navigationStart;

// domReady时间(与DomContentLoad事件对应)
timingInfo.domContentLoadedEventStart - timingInfo.navigationStart;

// DOM资源下载
timingInfo.responseEnd - timingInfo.responseStart;

// 准备新页面时间耗时
timingInfo.fetchStart - timingInfo.navigationStart;

// 重定向耗时
timingInfo.redirectEnd - timingInfo.redirectStart;

// Appcache 耗时
timingInfo.domainLookupStart - timingInfo.fetchStart;

// unload 前文档耗时
timingInfo.unloadEventEnd - timingInfo.unloadEventStart;

// request请求耗时
timingInfo.responseEnd - timingInfo.requestStart;

// 请求完毕至DOM加载
timingInfo.domInteractive - timingInfo.responseEnd;

// 解释dom树耗时
timingInfo.domComplete - timingInfo.domInteractive;

// 从开始至load总耗时
// timingInfo.loadEventEnd - timingInfo.navigationStart;

// 白屏时间
timingInfo.responseStart - timingInfo.fetchStart;

// 首屏时间
timingInfo.domComplete - timingInfo.fetchStart;

const Data = ref([
	{ key: 'DNS解析,DNS查询耗时', value: timingInfo.domainLookupEnd - timingInfo.domainLookupStart },
	{ key: 'TCP连接耗时', value: timingInfo.connectEnd - timingInfo.connectStart },

	{ key: '获得首字节耗费时间,也叫TTFB', value: timingInfo.responseStart - timingInfo.navigationStart },
	{ key: 'domReady时间(与DomContentLoad事件对应)', value: timingInfo.domContentLoadedEventStart - timingInfo.navigationStart },
	{ key: 'DOM资源下载', value: timingInfo.responseEnd - timingInfo.responseStart },
	{ key: '准备新页面时间耗时', value: timingInfo.fetchStart - timingInfo.navigationStart },
	{ key: '重定向耗时', value: timingInfo.redirectEnd - timingInfo.redirectStart },
	{ key: '白屏时间', value: timingInfo.responseStart - timingInfo.fetchStart },
	{ key: '首屏时间', value: timingInfo.domComplete - timingInfo.fetchStart },
	{ key: '请求完毕至DOM加载', value: timingInfo.domInteractive - timingInfo.responseEnd },
	{ key: '解释dom树耗时', value: timingInfo.domComplete - timingInfo.domInteractive },
]);

const indexMethod = (index) => {
	return index + 1;
};
</script>

<script>
export default {
	name: 'Performance',
};
</script>

<style scoped lang="scss"></style>
