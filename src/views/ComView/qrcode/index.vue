<template>
	<div>
		<el-button @click="isShow = true">二维码生成</el-button>
		<qrcode-vue v-if="isShow" :value="data.payUrl" :size="data.size" level="H" />
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import QrcodeVue from 'qrcode.vue';
const isShow = ref(false);
const data = reactive({
	payUrl: useRoute().path,
	size: 256,
});
</script>
