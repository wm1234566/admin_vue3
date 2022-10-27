//常用格式化时间工具

import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/RelativeTime';
import 'dayjs/locale/zh-cn';
import pinia from '../stores/store.js';
import { useLanguageStore } from '@/stores/language';

let Language = useLanguageStore(pinia);
dayjs.extend(RelativeTime);

export function dataFilter(timestamp, format = 'YYYY-MM-DD') {
	if (parseInt(timestamp)) {
		return dayjs(parseInt(timestamp)).format(format);
	} else {
		return '时间数据错误';
	}
}

// 获取一个给定时间，距离今日的相对时间
export function relativeTime(timestamp) {
	if (parseInt(timestamp)) {
		return dayjs()
			.locale(Language.language === 'zh' ? 'zh-cn' : 'en')
			.to(dayjs(parseInt(timestamp)));
	} else {
		return '时间数据错误';
	}
}
export function calculateDiffTime(start_time) {
	if (!parseInt(start_time)) return '-';
	let endTime = Math.round(new Date() / 1000);

	let timeDiff = endTime - start_time;
	let day = parseInt(timeDiff / 86400);
	let hour = parseInt((timeDiff % 86400) / 3600);
	let minute = parseInt((timeDiff % 3600) / 60);

	day = day ? day + '天' : '';
	hour = hour ? hour + '时' : '';
	minute = minute ? minute + '分' : '';
	return day + hour + minute + '之前';
}

export default (app) => {
	app.config.globalProperties.$DataTools = {
		relativeTime,
		dataFilter,
	};
};
