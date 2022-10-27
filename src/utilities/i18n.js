// 让切换语言可以，route中的内容也可以动态切换语言
// 直接在route中使用 i18n.global.t("msg.route."+title)是不能动态切换语言的
import i18n from '../i18n/index';
export default function generateTitle(title, keyString) {
	if (title === 'null') {
		return i18n.global.t(keyString);
	} else {
		return i18n.global.t('msg.route.' + title);
	}
}
