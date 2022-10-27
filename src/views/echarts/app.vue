<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-16 20:13:20
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-22 17:44:27
 * @FilePath: \mksz542\src\views\echarts\app.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="echart">
		<el-card class="box-card">
			<el-row>
				<el-col><div id="Echart1" class="echart1"></div> </el-col>
			</el-row>
			<el-row>
				<el-col><div id="Echart2" class="echart2"></div> </el-col>
			</el-row>

			<el-row>
				<el-col><div id="Echart3" class="echart3"></div> </el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script setup>
import { nextTick, onBeforeMount, onMounted, ref } from 'vue';

import 'animate.css';

//1.映入Echarts
import * as echarts from 'echarts'; //echarts 5.xx的引入方式

function Echart1() {
	let myChart = echarts.init(document.getElementById('Echart1'), null, { height: 300 });

	// 指定图表的配置项和数据
	let option = {
		title: {
			text: 'ECharts 图表示例',
		},

		legend: {
			show: true,

			// Try 'horizontal'
			orient: 'horizontal',
			// right: left,
			// top: 0,
			// data: ['第一季度', '第二季度', '第三季度', '第四季度'],
			// backgroundColor: '#ccc'
		},
		dataset: {
			//sourceHeader: false,
			dimensions: ['', '第一季度', '第二季度', '第三季度', '第四季度'],
			source: [
				['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
				[3, 20, 36, 10, 10, 20],
				[5, 26, 30, 19, 70, 28],
				[7, 24, 38, 10, 60, 24],
				[9, 20, 30, 11, 70, 40],
			],
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
		},

		xAxis: [
			{
				type: 'category',
				name: '服装产品',
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
				axisLine: {
					symbol: ['none', 'arrow'],
					lineStyle: {
						type: 'dashed',
					},
				},
				axisLabel: {
					align: 'left',
				},
			},
		],
		yAxis: [
			{
				type: 'value',
				name: '单商品每季度销量/件',
				position: 'left',
				min: 0,
				max: 100,
				axisLine: {
					symbol: ['none', 'arrow'],
				},
				axisLabel: {
					formatter: '{value}件',
				},
				axisTick: {
					length: 6,
					lineStyle: {
						type: 'dashed',
						// ...
					},
				},
			},

			{
				type: 'value',
				name: '单件商品年度总销售量',
				min: 0,
				max: 500,
				position: 'right',
				axisLabel: {
					formatter: '{value}件',
				},
			},
		],
		series: [
			{
				type: 'bar',
				seriesLayoutBy: 'row',
				showBackground: true,
				yAxisIndex: 0,
				backgroundStyle: {
					color: 'rgba(220, 220, 220, 0.8)',
				},
			},
			{
				type: 'bar',
				seriesLayoutBy: 'row',
				showBackground: true,
				yAxisIndex: 0,
				backgroundStyle: {
					color: 'rgba(220, 220, 220, 0.8)',
				},
			},
			{
				type: 'bar',
				seriesLayoutBy: 'row',
				showBackground: true,
				yAxisIndex: 0,
				backgroundStyle: {
					color: 'rgba(220, 220, 220, 0.8)',
				},
			},
			{
				type: 'bar',
				seriesLayoutBy: 'row',
				showBackground: true,
				yAxisIndex: 0,
				backgroundStyle: {
					color: 'rgba(220, 220, 220, 0.8)',
				},
			},

			{
				name: '年度总销售量',
				type: 'line',
				smooth: true,
				yAxisIndex: 1,
				xAxisIndex: 0,
				// seriesLayoutBy: 'row',

				data: [24, 90, 134, 49, 210, 112],
				// showBackground: true,
				// backgroundStyle: {
				//   color: 'rgba(220, 220, 220, 0.8)'
				// }
			},
		],
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	myChart.on('click', function (params) {
		console.log('pa', params);
	});
	// 图例开关的行为只会触发 legendselectchanged 事件
	myChart.on('legendselectchanged', function (params) {
		// 获取点击图例的选中状态
		var isSelected = params.selected[params.name];
		// 在控制台中打印
		console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
		// 打印所有图例的状态
		console.log(params);
	});
}

function Echart2() {
	let myChart = echarts.init(document.getElementById('Echart2'), 'dark', { height: 300 });

	let option = {
		legend: {
			icon: 'rect',
		},
		tooltip: {},
		dataset: {
			source: [
				['product', '2012', '2013', '2014', '2015'],
				['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
				['Milk Tea', 86.5, 92.1, 85.7, 83.1],
				['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4],
			],
		},
		xAxis: [
			{ type: 'category', gridIndex: 0 },
			{ type: 'category', gridIndex: 1 },
		],
		yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
		grid: [{ bottom: '55%' }, { top: '55%' }],
		series: [
			// 这几个系列会出现在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
			{ type: 'bar', seriesLayoutBy: 'row' },
			{ type: 'bar', seriesLayoutBy: 'row' },
			{ type: 'bar', seriesLayoutBy: 'row' },
			// 这几个系列会出现在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
			{ type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
			{ type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
			{ type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
			{ type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
		],
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

// 饼图

function Echart3() {
	let myChart = echarts.init(document.getElementById('Echart3'), null, { height: 300 });

	let option = {
		title: {
			text: '饼图程序调用高亮--点击空白停止动画高亮',
			left: 'center',
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)',
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
		},
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: [
					{ value: 335, name: '直接访问' },
					{ value: 310, name: '邮件营销' },
					{ value: 234, name: '联盟广告' },
					{ value: 135, name: '视频广告' },
					{ value: 1548, name: '搜索引擎' },
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	};

	let currentIndex = -1;

	let trimer = setInterval(function () {
		var dataLen = option.series[0].data.length;
		// 取消之前高亮的图形
		myChart.dispatchAction({
			type: 'downplay',
			seriesIndex: 0,
			dataIndex: currentIndex,
		});
		currentIndex = (currentIndex + 1) % dataLen;
		// 高亮当前图形
		myChart.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: currentIndex,
		});
		// 显示 tooltip
		myChart.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: currentIndex,
		});
	}, 1000);

	myChart.getZr().on('click', function (event) {
		// 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
		if (!event.target) {
			clearInterval(trimer);
			myChart.dispatchAction({
				type: 'downplay',
				seriesIndex: 0,
				dataIndex: currentIndex,
			});
		}
	});

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

onMounted(() => {
	Echart1();
	Echart2();
	Echart3();
});
</script>

<style lang="scss"></style>
