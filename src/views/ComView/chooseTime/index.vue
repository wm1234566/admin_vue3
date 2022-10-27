<template>
	<div>
		<m-choose-time :start-options="startOptions" @startChange="startChange" @endChange="endChange"></m-choose-time>
		<br />
		<br />
		<m-choose-date :disable-today="false" :start-options="startOptions" @startChange="dateStartChange" @endChange="dateEndChange"></m-choose-date>
	</div>
</template>

<script lang="ts" setup>
interface endValue {
	startTime: string;
	endTime: string;
}
interface dateEndValue {
	startDate: Date;
	endDate: Date;
}
let startChange = (val: string) => {
	console.log('startChange', val);
};
let endChange = (val: endValue) => {
	console.log('endChange', val);
};
let dateStartChange = (val: Date) => {
	console.log(val);
};
let dateEndChange = (val: dateEndValue) => {
	console.log(val);
};
let startOptions = {
	// size: 'mini',
	// clearable: false
};
</script>

<style lang="scss" scoped></style>
