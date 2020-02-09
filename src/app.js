import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import { createStore } from "./store";
import { createRouter } from "./router";
import { sync } from "vuex-router-sync";
import { createI18n } from "./store/i18n";
import vueMeta from 'vue-meta';

Vue.use(vueMeta);
// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp(ssrContext) {
	// create store and router instances
	const store = createStore();
	const router = createRouter();
	const i18n = createI18n(ssrContext.lang);
	// sync the router with the vuex store.
	// this registers `store.state.route`
	sync(store, router);
	if (process.env.NODE_ENV == "development") {
		Vue.config.debug = true;
		Vue.config.devtools = true;
	}


	// create the app instance.
	// here we inject the router, store and ssr context to all child components,
	// making them available everywhere as `this.$router` and `this.$store`.
	const app = new Vue({
		router,
		store,
		i18n,
		ssrContext,
		render: h => h(App)
	});
	
	return {
		app,
		router,
		store
	};
}