import component from './src/index.vue';

export default {
	install(app) {
		app.component('MyNotificatin', component);
	},
};
