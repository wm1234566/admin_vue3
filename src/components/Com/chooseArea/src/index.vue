<!--
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-11 22:23:03
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 11:06:03
 * @FilePath: \element\ElementPlus\src\components\chooseArea\src\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 组件描述:  -->

<template>
	<el-select
		v-model="area.value"
		class="m-2"
		placeholder="请选择省份"
		clearable
		@change="(value) => SelectArea(value, 'area')"
		@clear="Clear('area')"
	>
		<el-option v-for="item in Area" :key="item.code" :label="item.name" :value="item.code" />
	</el-select>

	<el-select
		v-model="city.value"
		class="m-2"
		placeholder="请选择城市"
		clearable
		:style="{ marginLeft: '20px' }"
		:disabled="Citys ? false : true"
		@change="(value) => SelectArea(value, 'city')"
		@clear="Clear('city')"
	>
		<el-option v-for="item in Citys" :key="item.code" :label="item.name" :value="item.code" />
	</el-select>
	<el-select
		v-model="province.value"
		clearable
		placeholder="请选择区县"
		:style="{ marginLeft: '20px' }"
		:disabled="Provinces ? false : true"
		@change="(value) => SelectArea(value, 'province')"
		@clear="Clear('province')"
	>
		<el-option v-for="item in Provinces" :key="item.code" :label="item.name" :value="item.code" />
	</el-select>

	<el-select
		v-model="town.value"
		clearable
		placeholder="选择乡镇"
		:style="{ marginLeft: '20px' }"
		:disabled="Towns ? false : true"
		@change="(value) => SelectArea(value, 'town')"
		@clear="Clear('town')"
	>
		<el-option v-for="item in Towns" :key="item.code" :label="item.name" :value="item.code" />
	</el-select>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import China from './pcas-code.json';

console.log('甚是数据', China);

const area = ref({ value: '', item: { name: '', code: '' } });
const city = ref({ value: '', item: { name: '', code: '' } });
const province = ref({ value: '', item: { name: '', code: '' } });
const town = ref({ value: '', item: { name: '', code: '' } });
const Area = ref(China);
const Citys = ref();
const Provinces = ref();
const Towns = ref();

const emit = defineEmits(['result']);

/**
 * @description: 选择省份
 * @return {*}
 */

const SelectArea = (value, level) => {
	if (level === 'area') {
		Area.value.forEach((item, index) => {
			if (item.code == value) {
				area.value.item = { name: item.name, code: item.code };
				//area.value.item = { name: item.name, code: item.code };

				Citys.value = item.children;
				Provinces.value = null;
				Towns.value = null;
				city.value = { value: '', item: { name: '', code: '' } };
				province.value = { value: '', item: { name: '', code: '' } };
				town.value = { value: '', item: { name: '', code: '' } };
			}
		});
	}

	if (level === 'city') {
		Citys.value.forEach((item, index) => {
			if (item.code == value) {
				city.value.item = { name: item.name, code: item.code };
				Provinces.value = item.children;
				Towns.value = null;
				province.value = { value: '', item: { name: '', code: '' } };
				// city.value = "";
				town.value = { value: '', item: { name: '', code: '' } };
			}
		});
	}

	if (level === 'province') {
		Provinces.value.forEach((item, index) => {
			if (item.code == value) {
				province.value.item = { name: item.name, code: item.code };
				Towns.value = item.children;
				// province.value = "";
				// city.value = "";
				town.value = { value: '', item: { name: '', code: '' } };
			}
		});
	}

	if (level === 'town') {
		Towns.value.forEach((item, index) => {
			if (item.code == value) {
				town.value.item = { name: item.name, code: item.code };
				// Towns.value = item.children;
				// province.value = "";
				// city.value = "";
				/// town.value = "";
				console.log(area.value, city.value, province.value, town.value);
				emit('result', {
					area: area.value.item,
					city: city.value.item,
					province: province.value.item,
					town: town.value.item,
				});
			}
		});
	}
};

//当点击清除的时候的逻辑
const Clear = (value) => {
	if (value === 'area') {
		Citys.value = '';
		Provinces.value = '';
		Towns.value = '';

		area.value = { value: '', item: { name: '', code: '' } };
		city.value = { value: '', item: { name: '', code: '' } };
		province.value = { value: '', item: { name: '', code: '' } };
		town.value = { value: '', item: { name: '', code: '' } };
	}
	if (value === 'city') {
		Provinces.value = '';
		Towns.value = '';

		city.value = { value: '', item: { name: '', code: '' } };
		province.value = { value: '', item: { name: '', code: '' } };
		town.value = { value: '', item: { name: '', code: '' } };
	}
	if (value === 'province') {
		Towns.value = '';

		province.value = { value: '', item: { name: '', code: '' } };
		town.value = { value: '', item: { name: '', code: '' } };
	}
	if (value === 'town') {
		town.value = { value: '', item: { name: '', code: '' } };
	}
};
</script>
<style scoped lang="scss"></style>
