import Vue from 'vue';
import 'es6-promise/auto';
import { createApp } from './app';
import vso from 'vue-socket.io/src/Main';
import scc from 'socketcluster-client';



// a global mixin that calls `asyncData` when a route component's params change
/*Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next);
    } else {
      next();
    }
  }
});*/

const { app, router, store } = createApp({
  lang: navigator.language || navigator.userLanguage
});

    Vue.use(vso, scc.connect({
      host: API_HOST,
      secure: true,
      ackTimeout: 999999999 ,
      autoReconnectOptions: {
        initialDelay: 1000, //milliseconds
        randomness: 1000, //milliseconds
        multiplier: 1.5, //decimal
        maxDelay: 4000 //milliseconds
      },
    }), store);
// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  /*router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c));
    });
    if (!activated.length) {
      return next();
    }
    bar.start();
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to });
      }
    })).then(() => {
      bar.finish();
      next();
    }).catch(next);
  });*/

  // actually mount to DOM
  app.$mount('#app');
});

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
