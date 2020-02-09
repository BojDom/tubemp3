import Vue from 'vue';
import 'es6-promise/auto';
import { createApp } from './app';
import vso from 'myutils/vso/Main';
import scc from 'socketcluster-client';
import {when} from 'mobx'



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
  lang: (navigator.language || navigator.userLanguage || 'en' ).substr(0,2).toLowerCase()
});
  
/*     Vue.use({
      install(Vue){
        Vue.mixin({
          created(){
           Vue.prototype.fp2 =  fp2;
          }
        })
      }
    }) */
    console.log('API HOST',API_HOST)
    Vue.use(new vso( scc.connect({
      hostname: API_HOST,
      secure: true,
      ackTimeout: 90000 ,
      authEngine:null,
      autoReconnectOptions: {
        initialDelay: 1000, //milliseconds
        randomness: 1000, //milliseconds
        multiplier: 1.5, //decimal
        maxDelay: 4000 //milliseconds
      },
    }), store));
// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(async () => {
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

  let t =  localStorage.getItem('socketCluster.authToken');
  app.$socket.emit('log',t);
  await  when(()=>app.$authToken.get().id)
  //console.log('aut',app.$authToken.get().id,app.$socket.channels,store.state.connState);
  // actually mount to DOM
  app.$mount('#app');
});

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
