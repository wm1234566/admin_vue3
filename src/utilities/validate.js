// 登录密码验证码方法

// #场景一：密码中必须包含大小写 字母、数字、特称字符，至少8个字符，最多30个字符；
// 1 var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}');
// 2
// 3 if (!pwdRegex.test('A3b@C2dEF')) {
//   4 　　alert("您的密码复杂度太低（密码中必须包含大小写字母、数字、特殊字符），请及时修改密码！");
//   5 }
// 回到顶部
// #场景二：密码中必须包含字母（不区分大小写）、数字、特称字符，至少8个字符，最多30个字符；
// 1 var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}');
// 2
// 3 if (!pwdRegex.test('a2b3c$def')) {
//   4     alert("您的密码复杂度太低（密码中必须包含字母、数字、特殊字符），请及时修改密码！");
//   5 }
// 回到顶部
// #场景三：密码中必须包含字母（不区分大小写）、数字，至少8个字符，最多30个字符；
// 1 var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
// 2
// 3 if (!pwdRegex.test('a2b3c4d5')) {
//   4     alert("您的密码复杂度太低（密码中必须包含字母、数字），请及时修改密码！");
//   5 }

export function username(f, value, cb) {
	if (!/^\w+/g.test(value)) {
		return cb(new Error('用户名是数字字母'));
	}
	// 没有错误
	cb();
}
export function password(f, value, cb) {
	if (!/^[a-zA-Z0-9_-]+/g.test(value)) {
		// console.log("执行了");
		return cb(new Error('用户名8-16位的数字字母或下划线'));

		//     匹配中文字符的正则表达式: [\u4E00-\u9FFF]
		// 不能为纯数字：(?![0-9]+$)
		// 不能全为小写字母与数字：(?![0-9a-z]+$)
		// 不能全为大写字母与数字：(?![0-9a-zA-Z]+$)
		// 不能全为特殊字符：(?!([^(0-9a-zA-Z)])+$)
		// 至少一个大写字母：(?=.*?[A-Z])
		// 至少一个特殊字符：(?=.*?[^\w\s])
	}
	// 没有错误
	cb();
}

export function captcha(f, value, cb) {
	if (!/\w+/.test(value)) {
		return cb(new Error('验证码格式错误'));
	}
	//执行了
	cb();
}

export function repeat(password, name, args) {
	console.log(password, args);
	if (password !== args[1]) {
		return args[2](new Error('两次密码不一样'));
	}
	args[2]();
}
