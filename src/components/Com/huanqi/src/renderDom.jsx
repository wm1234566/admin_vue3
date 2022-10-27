/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-13 21:51:35
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 22:24:56
 * @FilePath: \element\ElementPlus\src\components\huanqi\indext.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-13 21:51:35
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 21:51:41
 * @FilePath: \element\ElementPlus\src\components\huanqi\indext.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// type Props=
//     {
//         title:string,
//         num:number
//     }

import CallApp from 'callapp-lib';
// import "./App.css";

const option = {
	scheme: {
		protocol: 'zhihu',
	},
	intent: {
		package: 'com.zhihu.android',
		scheme: 'zhihu',
	},
	universal: {
		host: 'oia.zhihu.com',
		pathKey: '',
	},
	appstore: 'https://itunes.apple.com/cn/app/id432274380',
	yingyongbao: '//a.app.qq.com/o/simple.jsp?pkgname=com.zhihu.android',
	fallback: 'https://oia.zhihu.com/',
	timeout: 2000,
};

const lib = new CallApp(option);

const ua = navigator.userAgent || '';

function evoke(url) {
	var iFrame;

	iFrame = document.createElement('iframe');
	iFrame.setAttribute('src', url);
	iFrame.setAttribute('style', 'display:none;');
	iFrame.setAttribute('height', '0px');
	iFrame.setAttribute('width', '0px');
	iFrame.setAttribute('frameborder', '0');
	document.body.appendChild(iFrame);

	iFrame = null;
}

function evokeByLocation(uri) {
	window.location.href = uri;
}

function evokeByTagA(uri) {
	const tagA = document.createElement('a');

	tagA.setAttribute('href', uri);
	tagA.style.display = 'none';
	document.body.appendChild(tagA);

	tagA.click();
}

const renderDom = (props, ctx) => {
	return (
		<div className="App">
			<button
				onClick={() => {
					alert(ua);
				}}
			>
				ua
			</button>
			<button
				onClick={() => {
					evoke('zhihu://question/270839820');
				}}
			>
				schema - iframe
			</button>
			<button
				onClick={() => {
					evokeByLocation('zhihu://question/270839820');
				}}
			>
				schema - location
			</button>
			<button
				onClick={() => {
					evokeByTagA('zhihu://question/270839820');
				}}
			>
				schema - A Tag
			</button>
			<button
				onClick={() => {
					evokeByLocation(lib.generateIntent({ path: '' }));
				}}
			>
				intent - location
			</button>
			<button
				onClick={() => {
					evokeByLocation('https://oia.zhihu.com/question/270839820/answer/477722658');
				}}
			>
				universal-link
			</button>
			<button
				onClick={() => {
					lib.open({ path: 'question/270839820/answer/477722658' });
				}}
			>
				callapp-lib 唤端
			</button>
		</div>
	);
};

export default renderDom;
