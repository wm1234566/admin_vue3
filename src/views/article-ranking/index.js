//列数据
import i18n from '../../i18n/index.js';
import { useLanguageStore } from '../../stores/language';
import { ref, watch } from 'vue';

const Language = useLanguageStore();
// 语言变化重新请求 数据

Language.$subscribe(
	(...arg) => {
		// 数据变得重新请求
		dynamicData.value = columnData();
		initSelectDynamicLabel();
	},
	{
		detached: true,
	}
);

const t = i18n.global.t;
let columnData = () => [
	{ label: t('msg.article.ranking'), prop: 'ranking' },
	{ label: t('msg.article.title'), prop: 'title' },
	{ label: t('msg.article.author'), prop: 'author' },
	{ label: t('msg.article.publicDate'), prop: 'publicDate' },
	{ label: t('msg.article.desc'), prop: 'desc' },
	{ label: t('msg.article.action'), prop: 'action' },
];

// 列头信息
export const dynamicData = ref(columnData());

// 选中的项
export const selectDynamicLabel = ref([]);

// 默认开始全部选中

const initSelectDynamicLabel = () => {
	selectDynamicLabel.value = dynamicData.value.map((item) => {
		return item.label;
	});
};
initSelectDynamicLabel();

// 筛选后的columnData
export const tableColumn = ref([]);

// 监听
watch(
	selectDynamicLabel,
	(val) => {
		// 置空不然会由很多列
		tableColumn.value = [];
		// 与列头信息对比
		const selectData = dynamicData.value.filter((item) => {
			return val.includes(item.label);
		});
		tableColumn.value.push(...selectData);
	},
	{
		immediate: true,
	}
);
