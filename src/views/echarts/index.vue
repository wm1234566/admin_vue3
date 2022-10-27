<template>
	<div>
		<div class="box" :style="{ background: `url(${bg})` }">
			<div class="left">
				<div
					class="list inline-flex"
					:style="{
						boxShadow: `var(--el-box-shadow-dark)`,
					}"
				>
					<div>
						<p>较上日+{{ chinaAdd?.localConfirmH5 }}</p>
						<span>{{ chinaTotal?.localConfirm }}</span>
						<p>本土现有确诊</p>
					</div>
					<div>
						<p>较上日+{{ chinaAdd?.nowConfirm }}</p>
						<span>{{ chinaTotal?.localConfirm }}</span>
						<p>现有确诊</p>
					</div>
					<div>
						<p>较上日+{{ chinaAdd?.confirm }}</p>
						<span>{{ chinaTotal?.confirm }}</span>
						<p>累积确诊</p>
					</div>
					<div>
						<p>较上日+{{ chinaAdd?.noInfect }}</p>
						<span>{{ chinaTotal?.noInfect }}</span>
						<p>无症状感染者</p>
					</div>
					<div>
						<p>较上日+{{ chinaAdd?.importedCase }}</p>
						<span>{{ chinaTotal?.importedCase }}</span>
						<p>境外输入</p>
					</div>
					<div>
						<p>较上日+{{ chinaAdd?.dead }}</p>
						<span>{{ chinaTotal?.dead }}</span>
						<p>累计死亡</p>
					</div>
				</div>

				<div
					class="rounded inline-flex"
					:style="{
						boxShadow: `var(--el-box-shadow-dark)`,
					}"
				></div>

				<div
					class="Line inline-flex"
					:style="{
						boxShadow: `var(--el-box-shadow-dark)`,
					}"
				></div>
			</div>

			<div id="china" class="center"></div>
			<div class="right">
				<Transition
					name="custom-classes"
					leave-active-class="animate__animated animate__backOutRight"
					enter-active-class="animate__animated animate__backInRight"
				>
					<el-table :data="item ? item : null" style="width: 100%">
						<el-table-column prop="name" label="地区" />
						<el-table-column prop="today.local_confirm_add" label="本地确诊" />
						<el-table-column prop="today.wzz_add" label="本地无症状" />
					</el-table>
				</Transition>
			</div>
		</div>
		<div>
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
		</div>
	</div>
</template>

<script setup>
import bg from '@/assets/echart.jpg';
// import {useMapStore} from "@/stores";
import { onMounted, ref } from 'vue';
import { geoCoordMap } from './geoMap';
import 'animate.css';

//1.映入Echarts
import * as echarts from 'echarts'; //echarts 5.xx的引入方式

// 5.引入chian.js
import './china';
// import type {RootDiseaseh5ShelfAreaTreeChildrenChildren} from "@/stores/MapdataType";

import axios from 'axios';

let flag = ref(true);

let data = ref([]);

const mapData = ref({}); //;res
const chinaAdd = ref({}); //            this.mapData.diseaseh5Shelf.chinaAdd;
const chinaTotal = ref({}); //this.mapData.diseaseh5Shelf.chinaTotal;
const cityDetail = ref({}); //this.mapData.statisGradeCityDetail.slice(0,10);// 获取前10个
const item = ref([]);

// 地图

const initEcharts = () => {
	const cities = mapData.value?.diseaseh5Shelf?.areaTree[0].children;

	item.value = cities?.[1].children;

	// 1.1获得城市名字,构造需要的数据，感染数为数组最后拼接

	cities?.map((item) => {
		data.value.push({
			name: item.name,
			value: geoCoordMap?.[item.name]?.concat(item.total.nowConfirm), // value:[xx,xx,认识]
			children: item.children,
		});
	});

	//  var data = [
	//         {
	//           name: "内蒙古", //给地图用
	//           itemStyle: {
	//             areaColor: "#56b1da",
	//           },
	//           value:[110.3467, 41.4899] //给散点图用
	//         },
	//           {
	//           name: "青海",
	//           itemStyle: {
	//             areaColor: "#56b1da",
	//           },
	//           value:[99.4038, 36.8207]
	//         },
	//       ];

	// 2基于准备好的dom，初始化echarts实例
	const myChart = echarts.init(document.querySelector('#china'));
	// 3.配置数据
	// 指定图表的配置项和数据

	// 数据来源https://www.isqqw.com/echartsdetail?id=15158

	let option = {
		// backgroundColor: "black",
		geo: {
			map: 'china', //使用 registerMap 注册的地图名称。
			aspectScale: 0.8, //缩放比例
			layoutCenter: ['50%', '50%'], //地图在坐标位置
			layoutSize: '100%', // 地图的大小

			// 真个地图的图形样式

			itemStyle: {
				areaColor: {
					//渐变色或者纹理填充
					type: 'linear-gradient',
					x: 0,
					y: 1200,
					x2: 1000,
					y2: 0,
					colorStops: [
						{
							offset: 0,
							color: '#152E6E', // 0% 处的颜色
						},
						{
							offset: 1,
							color: '#0673AD', // 50% 处的颜色
						},
					],
					global: true, // 缺省为 false
				},
				shadowColor: '#0f5d9d',
				shadowOffsetX: 0,
				shadowOffsetY: 15,
				opacity: 0.5,
			},

			// 高亮的面积颜色
			emphasis: {
				// 和itemStyle是平级的
				itemStyle: {
					areaColor: '#0f5d9d', //
				},
			},

			// 在地图中对特定的区域配置样式。
			regions: [
				{
					name: '南海诸岛',
					itemStyle: {
						areaColor: 'rgba(0, 10, 52, 1)',
						borderColor: 'rgba(0, 10, 52, 1)',
						opacity: 0,
						label: {
							show: false,
							color: '#009cc9',
						},
					},
					label: {
						show: false,
						color: '#FFFFFF',
						fontSize: 12,
					},
				},
			],
		},

		series: [
			{
				type: 'map',
				//选择方式，下面是多选
				// selectedMode: "multiple",
				map: 'china',
				aspectScale: 0.8, //地图长宽比
				layoutCenter: ['50%', '50%'], //地图位置
				layoutSize: '100%',
				zoom: 1, //当前视角的缩放比例
				// roam: true, //是否开启平游或缩放
				scaleLimit: {
					//滚轮缩放的极限控制
					min: 1,
					max: 10,
				},

				label: {
					show: true,
					color: '#FFFFFF',
					fontSize: 12,
				},

				itemStyle: {
					areaColor: '#0c3653',
					borderColor: '#1cccff',
					borderWidth: 1.8,
				},
				emphasis: {
					areaColor: '#56b1da',
					label: {
						show: false,
						color: '#fff',
					},
				},
				data: data.value,
			},
			{
				// name: 'Top 5', 不要这个名字
				type: 'scatter',
				coordinateSystem: 'geo', //地图坐标系
				//修改角标，就是选择就会有一一个标
				symbol: 'pin', // 气泡
				symbolSize: [45, 45], // 宽。高
				//   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
				// symbolSize: [30,120],
				// symbolOffset:[0, '-40%'] ,
				geoIndex: 0, //指定第一个地理坐标系组件
				label: {
					show: true, // 数字开关
					color: '#fff',
					//添加一个函数
					formatter(value) {
						// 悬停展示的值
						// console.log('添加的值', value)
						return value.data.value[2]; // 返回值表示数据
					},
				},
				itemStyle: {
					color: '#D8BC37', //标志颜色
				},
				data: data.value,
			},
		],
	};

	// 4.选择展示图像
	myChart.setOption(option);

	// 点击事件
	myChart.on('click', (e) => {
		console.log('点击方法', e, '=>>', item.value, 'e', e);
		// 存储当前点击的省的数据
		item.value = e.data.children;
		// flag.value = !flag.value
	});
};

// 封装圆角环形图
let initRounded = () => {
	// 构造数据
	// let Data=
	// console.log('圆角环形图', cityDetail.value)

	// type EChartsOption = echarts.EChartsOption;

	let chartDom = document.querySelector('.rounded');
	let myChart = echarts.init(chartDom);
	let option = null;

	option = {
		tooltip: {
			trigger: 'item',
		},
		// legend: {  1.去掉小块
		//   top: '5%',
		//   left: 'center'
		// },
		series: [
			{
				name: '今日累积确诊人数环形图',
				type: 'pie',
				radius: ['30%', '70%'],
				// avoidLabelOverlap: false, 5.字体超出
				itemStyle: {
					borderRadius: 4, //2.修改圆角大小
					borderColor: '#fff',
					borderWidth: 2,
				},
				label: {
					show: true, // 3.显示线
					// position: 'center'      // 四周显示
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '12', //4字体调小
						// fontWeight: 'bold'
					},
				},
				// labelLine: { 展示线
				//   show: false
				// },
				data: cityDetail.value.map((item) => ({
					value: item.nowConfirm,
					name: item.city,
				})),
			},
		],
	};

	option && myChart.setOption(option);
};

// 封装折线图

let initLine = () => {
	// console.log(
	//   '折线图数据',
	//   cityDetail.value,
	//   cityDetail.value.map((v) => v.city),
	//   cityDetail.value.map((v) => v.nowConfirm)
	// )
	let chartDom = document.querySelector('.Line');
	let myChart = echarts.init(chartDom);
	let option;

	option = {
		xAxis: {
			type: 'category',
			data: cityDetail.value.map((v) => v.city),
		},
		yAxis: {
			type: 'value',
		},
		// 2添加标尺
		tooltip: {
			trigger: 'axis',
		},
		// 1添加数值
		label: {
			show: true,
		},
		series: [
			{
				data: cityDetail.value.map((v) => v.nowConfirm),
				//[820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line',
				smooth: true,
			},
		],
	};

	option && myChart.setOption(option);
};

const result = () => {
	// return axios.get('http://localhost:3001/api/list').then((res) => res.data)

	return axios.post('/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf');

	//   res.json({ ...result.data.data})
};

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

onMounted(async () => {
	const { data } = await result();
	console.log('获取到数据', data.data);
	mapData.value = data.data;
	chinaAdd.value = mapData.value.diseaseh5Shelf.chinaAdd;
	chinaTotal.value = mapData.value.diseaseh5Shelf.chinaTotal;
	cityDetail.value = mapData.value.statisGradeCityDetail.slice(0, 10); // 获取前10个

	initEcharts();
	initRounded();
	initLine();
	Echart1();
	Echart2();
	Echart3();
});
</script>

<style lang="scss">
.box {
	display: flex;

	background-size: contain;

	.left {
		.list {
			margin: 20px 0 0 20px;
			height: 300px;
			//border: 5px solid #C6D0D3FF;
			display: grid;
			grid-template-columns: repeat(3, auto);
			grid-template-rows: repeat(2, auto);
			background-color: transparent;
			background-origin: content-box;
			text-align: center;
			grid-gap: 10px 10px;
			div {
				color: white;
				background-color: rgba(26, 187, 236, 0);
				span {
					color: #0c3653;
					font-size: 24px;
				}
			}
		}
		.rounded {
			margin: 20px 0 0 20px;
			//width: 100%;
			height: 380px;
			background-color: transparent;
		}
		.Line {
			margin: 20px 0 0 20px;
			//width: 100%;
			height: 400px;
			background-color: transparent;
		}
	}

	.center {
		flex: 1;
		height: auto;
		font-size: 12px;
	}

	.right {
		margin: 20px 20px;
		div {
			background-color: transparent;
			div {
				background-color: transparent;
			}
		}
		table {
			background-color: transparent;
		}
		tr {
			background-color: transparent;
		}
		td {
			background-color: transparent;
		}
	}
}
</style>
