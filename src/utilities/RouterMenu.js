// 将路由表生成菜单

// 过滤出所有一级路由
export function filterRouter(router) {
	let ruselt = [];
	let routes = [];

	router.forEach((item) => {
		if (item?.children?.length > 0) {
			ruselt.push(...item.children);
		}
	});

	if (ruselt?.length > 0) {
		router.forEach((item) => {
			let flag = false;
			for (let i = 0; i < ruselt.length; i++) {
				if (item.path === ruselt[i].path) flag = true;
			}
			if (!flag) {
				routes.push(item);
			}
		});
	}

	// 去除没有 icon的项目
	routes = routes
		.map((item) => {
			if (item?.children.length > 0) {
				item.children = item.children.filter((item2) => {
					if (item2.meta?.icon && item2.meta?.title) return item2;
				});
				return item;
			} else {
				if (item.meta?.icon && item.meta?.title) {
					return item;
				}
			}
		})
		.filter((item) => item);

	// console.log("原路路由",router,"更改后的",routes)

	return routes; //返回一级路由
}
