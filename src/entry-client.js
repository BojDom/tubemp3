import Vue from 'vue';
import 'es6-promise/auto';
import { createApp } from './app';
import vso from './store/utils/vso/Main';
import scc from 'socketcluster-client'
import {when} from 'mobx'


try{
  //
const { app, router, store } = createApp({
  lang: (navigator.language || navigator.userLanguage || 'en' ).substr(0,2).toLowerCase()
});
  


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


  let t =  localStorage.getItem('socketCluster.authToken');
  app.$socket.emit('log',t);
  await when(()=>app.$authToken.get().id)

  //console.log('aut',app.$authToken.get().id,app.$socket.channels,store.state.connState);
  // actually mount to DOM
  app.$mount('#app');
});

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
}catch(e){console.error(e)}