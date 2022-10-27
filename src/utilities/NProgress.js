// 配置网页进度条

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 进度条配置项这样写

NProgress.configure({
	easing: 'ease', // 动画方式
	speed: 500, // 递增进度条的速度
	showSpinner: false, // 是否显示加载 icon
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3, // 初始化时的最小百分比
});

// 进度条在router中使用
//修改进度条颜色在base.scss中
export default NProgress;
