export function T(i18n) {
	let menuse = [
		{
			label: i18n.t('msg.tagsView.refresh'), //i18n.t('msg.tagsView.refresh'),
			click: () => {
				window.location.reload();
			},
		},
		{
			label: generateTitle('null', 'msg.tagsView.closeRight'),
			click: (e, arg) => {
				// 如果右侧没有则啥都不做
				if (arg.index > 0) {
					// 如果右侧是当前页面，删除后跳转到，第一个页面
					if (TagsView.CacheRoute[arg.index - 1].isShow === true) {
						// 条到第一页
						Router.push({ path: TagsView.CacheRoute[0].path });
					}

					TagsView.CacheRoute.splice(arg.index - 1, 1);
				}

				open.value = false;
				// return false
			},
		},
		{
			label: i18n.t('msg.tagsView.closeOther'),
			click: (e, arg) => {
				TagsView.CacheRoute = [];
				if (arg.item.isShow === true) {
					// 如果是当前页
					TagsView.CacheRoute.push(arg.item);
				} else {
					Router.push({ path: arg.item.path });
				}

				open.value = false;
				// return false
			},
		},
	];

	return menuse;
}
