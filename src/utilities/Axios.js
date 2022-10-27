// 全局拦截和请求拦截

// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
import axios from 'axios';
import { setItem, getItem } from './Storage';
import { TOKEN } from './Constant';

import { useLanguageStore } from '../stores/language';
import pinia from '../stores/store';
import md5 from 'md5';

const Language = useLanguageStore(pinia); // 这里一定要把 pinia传入进去

let instance = axios.create({
	timeout: 5000, // 请求超时时间
	baseURI: import.meta.env.VITE_AXIOS_BASE_URL,
});

// 添加服务端响应拦截器
instance.interceptors.response.use(
	function (response) {
		// 对响应数据做点什么
		//console.log("响应器数据", response);

		// 响应的token就存储
		if (response.data?.data?.token) {
			// localStorage.token = response.data.token

			setItem(TOKEN, response.data.data.token);
		}

		return response;
	},
	function (error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

// 请求拦截器

instance.interceptors.request.use(
	(config) => {
		// 默认发送头
		// axios.defaults.headers.common["Authorization"] =
		config.headers['Authorization'] = 'Bearer ' + getItem(TOKEN) || '';

		const now = parseInt(Date.now() / 1000);
		const code = now + 'LGD_Sunday-1991-12-30';

		config.headers.icode = md5(code);
		config.headers.codeType = now;
		config.headers['Accept-Language'] = Language.language;
		return config;
	},
	(err) => {
		// 请求未成功发出，如：没有网络...
		return Promise.reject(err);
	}
);

export default instance;
