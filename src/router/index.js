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
		{ name:'profile',path: '/profile/:id?', component: _import('profile') },
		{ name:'disconnected',path: '/disconnected', component: _import('disconnected') },
		{ name:'home',path: '/', component: _import('home') },
		{ name:'404',path: '*', component: _import('home') }
    ]
  });
}
