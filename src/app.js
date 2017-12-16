import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import { createStore } from "./store";
import { createRouter } from "./router";
import { sync } from "vuex-router-sync";
import * as filters from "./util/filters";
import i18n from "./store/i18n";
import vso from 'vue-socket.io';
import scc from 'socketcluster-client';
import vueMeta from 'vue-meta';

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

Vue.use(vueMeta);
// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp(ssrContext) {
	// create store and router instances
	const store = createStore();
	const router = createRouter();

	// sync the router with the vuex store.
	// this registers `store.state.route`
	sync(store, router);
	if (process.env.NODE_ENV == "development") {
		Vue.config.debug = true;
		Vue.config.devtools = true;
	}
	if (typeof document !== 'undefined')
		Vue.use(vso, scc.connect({
			host: API_HOST,
			secure: true,
			autoReconnectOptions: {
				initialDelay: 1000, //milliseconds
				randomness: 1000, //milliseconds
				multiplier: 1.5, //decimal
				maxDelay: 4000 //milliseconds
			},
		}), store);

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

	/*if (module.hot) {
  var ls= ['en','it'];
  module.hot.accept(ls.map(l=>{return './store/i18n/'+l}), function () {
    ls.map(l => {
      let m="./store/i18n/" + l;
      i18n.setLocaleMessage(l, require(m).default);
    });
  })
}*/

	// expose the app, the router and the store.
	// note we are not mounting the app here, since bootstrapping will be
	// different depending on whether we are in a browser or on the server.
	return {
		app,
		router,
		store
	};
}