import generateTitle from '../../utilities/i18n';

function FestData(routes, roust, titleArray) {
	if (titleArray?.length > 0) {
		routes.forEach((item) => {
			let newArray = [...titleArray];
			newArray.push(generateTitle(item.meta.title));
			roust.push({ path: item.path, title: newArray });

			if (item.children?.length > 0) {
				FestData(item.children, roust, newArray);
			}
		});
	} else {
		routes.forEach((item) => {
			let title = [];
			title.push(generateTitle(item.meta.title));
			roust.push({ path: item.path, title: title });
			if (item.children?.length > 0) {
				FestData(item.children, roust, title);
			}
		});
	}
}

export const createFuseData = (routes) => {
	let roust = [];
	FestData(routes, roust);
	return roust;
};

// 配置
/***
// name：搜索的键
// weight：对应的权重
keys: [
  {
    name: 'title',
    weight: 0.7
  },
  {
    name: 'path',
    weight: 0.3
  }
]
 ***/

//结果

// [
//   {
//     "path":"/my",
//     "title":[
//       "个人中心"
//     ]
//   },
//   {
//     "path":"/user",
//     "title":[
//       "用户"
//     ]
//   },
//   {
//     "path":"/user/manage",
//     "title":[
//       "用户",
//       "用户管理"
//     ]
//   },
//   {
//     "path":"/user/info",
//     "title":[
//       "用户",
//       "用户信息"
//     ]
//   },
//   {
//     "path":"/article",
//     "title":[
//       "文章"
//     ]
//   },
//   {
//     "path":"/article/ranking",
//     "title":[
//       "文章",
//       "文章排名"
//     ]
//   },
//   {
//     "path":"/article/create",
//     "title":[
//       "文章",
//       "创建文章"
//     ]
//   }
// ]
