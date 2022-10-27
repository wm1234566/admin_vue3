// import type { App } from "vue";
import component from './src/index.vue';

export default {
	install(app) {
		app.component('MyList', component);
	},
};
