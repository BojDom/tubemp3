import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function _import(view){
	return () =>{
		return	System.import('../views/'+view+'.vue');
	};
}

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
		//{ name:'search',path: '/search/:page/:limit/:src', component: _import('search') },
		{ name: 'download',path:'/download/:id/:title?',component:_import('download')},
		{ name:'search',path: '/search/:src', component: _import('search') },
		{ name:'home',path: '/', component: _import('home') },
		{ name:'disconnected',path: '/disconnected', component: _import('disconnected') },
		{ name:'404',path: '*', component: _import('home') }
    ]
  });
}
