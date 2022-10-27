<script setup></script>

<template>
	<main class="home">
		<h1>首页</h1>
		<router-link to='{path:"/login"}'>登陆页面</router-link>
	</main>
</template>

<style lang="scss">
.home {
	width: 100vw;
	height: 100vh;
	background-image: url('@/assets/home.jpg');
	background-size: cover;
}
</style>
