// 所有请求

// 登录
export function login(formData) {
	return $http.post('/prod-api/sys/login', formData).then(
		(data) => data.data,
		(err) => err
	);
}

// 获取登录人员信息
export function getUserInfo() {
	// return  $http.get("/data/profile" ).then(data=>data.data,err=>err)
	return $http.get('/prod-api/sys/profile').then(
		(data) => data.data,
		(err) => err
	);
}

//项目介绍
export function getFeature() {
	return $http.get('/prod-api/user/feature').then(
		(data) => data.data,
		(err) => err
	);
}
//课程目录
export function getChapter() {
	return $http.get('/prod-api/user/chapter').then(
		(data) => data.data,
		(err) => err
	);
}

// 请求员工列表的接口

export function getManageList(params) {
	return $http.get('/prod-api/user-manage/list', { params }).then(
		(data) => data.data,
		(err) => err
	);
}

// 请求权限列表
export function getRoleList() {
	return $http.get('/prod-api/role/list').then(
		(data) => data.data,
		(err) => err
	);
}

// 修改用户的角色

export function updateRole(id, formData) {
	return $http.post('/prod-api/user-manage/update-role/' + id, formData).then(
		(data) => data.data,
		(err) => err
	);
}

// 删除用户

export function deleteUser(_id) {
	return $http.get('/prod-api/user-manage/detele/' + _id).then(
		(data) => data.data,
		(err) => err
	);
}

// 给角色分配权限
export function AssignPermission(id) {
	return $http.get('/prod-api/role/permission/' + id).then(
		(data) => data.data,
		(err) => err
	);
}

// 获取权限选项数据

export function permissionList() {
	return $http.get('/prod-api/permission/list').then(
		(data) => data.data,
		(err) => err
	);
}

// 更新角色权限

export function updateRolePermission(formData) {
	return $http.post('/prod-api/role/distribute-permission', formData).then(
		(data) => data.data,
		(err) => err
	);
}

// 上传ecxle

export function uploadExcel(formData) {
	return $http.post('/prod-api/user-manage/batch/import', formData).then(
		(data) => data.data,
		(err) => err
	);
}

// 下载excel

export function downloadExcel() {
	return $http.get('/prod-api/user-manage/all-list').then(
		(data) => data.data,
		(err) => err
	);
}

// 获取员工详细信息
export function getUserManageDetail(id) {
	// return  $http.get("/data/profile" ).then(data=>data.data,err=>err)
	return $http.get('/prod-api/user-manage/detail/' + id).then(
		(data) => data.data,
		(err) => err
	);
}

// 获取文章列表

//prod-api/article/list

export function getArticleList(params) {
	// return  $http.get("/data/profile" ).then(data=>data.data,err=>err)
	return $http.get('/prod-api/article/list', { params }).then(
		(data) => data.data,
		(err) => err
	);
}

// 持久化，修改文章的排名

export function updateArticleSort(formData) {
	return $http.post('/prod-api/article/sort', formData).then(
		(data) => data.data,
		(err) => err
	);
}

// 创建文章
export function createArticle(formData) {
	return $http.post('/prod-api/article/create', formData).then(
		(data) => data.data,
		(err) => err
	);
}

// 编辑文章
export function updateArticle(formData) {
	return $http.post('/prod-api/article/edit', formData).then(
		(data) => data.data,
		(err) => err
	);
}

//请求文章数据

export function Article(id) {
	///prod-api/article/62fd48c0eb0c1033a52ebd17

	return $http.get('/prod-api/article/' + id).then(
		(data) => data.data,
		(err) => err
	);
}

// 删除文章

export function ArticleDelete(id) {
	return $http.get('/prod-api/article/delete/' + id).then(
		(data) => data.data,
		(err) => err
	);
}
// /prod-api/article/delete/
