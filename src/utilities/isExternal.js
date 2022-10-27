// 查看path字符串是不是网络资源

export function isExternal(path) {
	return /^(http:|https:|mailto:|tel:)/.test(path);
}
