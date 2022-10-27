// 操作localstorage的方法
// 添加，删除，获取，全部清除

export const setItem = (key, value) => {
	if (typeof value === 'object') {
		value = JSON.stringify(value);
	}
	window.localStorage.setItem(key, value);
};

//
export const removeItem = (key) => {
	window.localStorage.removeItem(key);
};

export const getItem = (key) => {
	try {
		return JSON.parse(window.localStorage.getItem(key));
	} catch (e) {
		return window.localStorage.getItem(key);
	}
};

export const clear = () => {
	window.localStorage.clear();
};
