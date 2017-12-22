webpackJsonp([5],{137:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=(0,u.createStore)(),n=(0,l.createRouter)(),o=(0,m.createI18n)(e.lang);return(0,d.sync)(t,n),"undefined"!=typeof document&&s.default.use(h.default,g.default.connect({host:"api.tubemp3.co",secure:!0,autoReconnectOptions:{initialDelay:1e3,randomness:1e3,multiplier:1.5,maxDelay:4e3}}),t),{app:new s.default({router:n,store:t,i18n:o,ssrContext:e,render:function(e){return e(c.default)}}),router:n,store:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.createApp=r,n(157);var i=n(48),s=o(i),a=n(386),c=o(a),u=n(154),l=n(148),d=n(402),f=n(156),p=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(f),m=n(152),v=n(400),h=o(v),_=n(378),g=o(_),b=n(398),O=o(b);Object.keys(p).forEach(function(e){s.default.filter(e,p[e])}),s.default.use(O.default)},141:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i=n(387),s=o(i),a=n(139),c=n(140),u=o(c),l=n(390),d=o(l),f=n(388),p=o(f),m=n(389),v=o(m),h=n(52),_=n(391),g=o(_),b=n(97),O=o(b);t.default={components:{reconnect:v.default,"search-bar":d.default,"auto-complete":g.default,"fb-c":s.default,noQuota:p.default},data:function(){return{q:"",fbUrl:"",popup:"",noQuota:!1,srcOpen:!1}},sockets:{connect:function(){console.log("socket connected")},fbPopClose:function(){try{this.popup.close()}catch(e){console.log(e)}},noQuota:function(){this.noQuota=!0}},beforeMount:function(){function e(t){requestAnimationFrame(e),u.default.update(t)}var t=this;new a.Observable.create(function(e){t.isConnected?e.next():t.$watch("isConnected",function(){t.isConnected&&e.next()})}).take(1).subscribe(function(e){try{localStorage.u&&t.$store.commit("SOCKET_LOGIN",JSON.parse(localStorage.u))}catch(e){console.log(e)}}),["connect","error","disconnect","reconnect","reconnect_attempt","reconnecting","reconnect_error","reconnect_failed","connect_error","connect_timeout","connecting"].map(function(e){t.$socket.on(e,function(){t.$store.commit("CONNECTION_STATE",e)})}),requestAnimationFrame(e)},methods:{fbLog:function(){this.usr.fbUrl&&(this.popup=window.open(this.usr.fbUrl))}},computed:r({},(0,h.mapState)(["connState","isConnected","usr"])),watch:{connState:(0,O.default)(function(e){var t=this;["disconnect","connect_error","reconnect_error","connect_timeout","reconnect_failed"].indexOf(e)>-1?this.$store.commit("setConnected",!1):["connect","reconnect"].indexOf(e)>-1&&(this.$store.commit("setConnected",!0),setTimeout(function(){t.$socket.emit("log",t.usr.token)},200))},140),$route:function(){this.srcOpen=!1}},beforeDestroy:function(){this.$socket.disconnect()},metaInfo:function(){return{title:this.$t("homeTitle"),meta:[{vmid:"og:image",property:"og:image",content:"https://tubemp3.co/public/img/logo.jpg"},{vmid:"description",property:"description",content:this.$t("homeDescription")},{vmid:"og:description",property:"og:description",content:this.$t("homeDescription")}]}}}},142:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={mounted:function(){},methods:{loadButton:function(e,t,n){var o,r=e.getElementsByTagName(t)[0];e.getElementById(n)||(o=e.createElement(t),o.id=n,o.src="//connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.9&appId=686186628184265",r.parentNode.insertBefore(o,r))}}}},143:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"noQuota"}},144:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={}},145:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(97),i=function(e){return e&&e.__esModule?e:{default:e}}(r),s=n(52);t.default={name:"srcBar",created:function(){var e=this.$router.currentRoute;"search"===e.name&&"string"==typeof e.params.src&&e.params.src.length>2&&(this.q=e.params.src.split("_").join(" "))},data:function(){return{placeholder:"Cerca...",q:"",page:1,itemsPerPage:10}},computed:o({},(0,s.mapState)(["autoCompleteList","selectedSuggested"])),methods:{startSrc:function(){this.$store.commit("SOCKET_AUTOCOMPLETELIST",[]),this.$store.state.isConnected&&this.q.length>2&&this.$router.push({name:"search",params:{src:this.q.split(" ").join("_")}})},getAutoComplete:(0,i.default)(function(){this.$store.state.isConnected&&this.q&&this.q.length>2&&this.$socket.emit("autocomplete",{q:this.q})},400)}}},146:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(52);t.default={computed:o({},(0,r.mapState)(["autoCompleteList","selectedSuggested"])),data:function(){return{}},methods:{suggest:function(e){this.$router.push({name:"search",params:{src:e.split(" ").join("_")}})}}}},147:function(e,t,n){"use strict";var o=n(48);!function(e){e&&e.__esModule}(o);n(138);var r=n(137),i=(0,r.createApp)({lang:navigator.language||navigator.userLanguage}),s=i.app,a=i.router,c=i.store;window.__INITIAL_STATE__&&c.replaceState(window.__INITIAL_STATE__),a.onReady(function(){s.$mount("#app")}),"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js")},148:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){return function(){return n(403)("./"+e+".vue")}}function i(){return new u.default({mode:"history",scrollBehavior:function(){return{y:0}},routes:[{name:"download",path:"/download/:id/:title?",component:r("download")},{name:"search",path:"/search/:src",component:r("search")},{name:"home",path:"/",component:r("home")},{name:"disconnected",path:"/disconnected",component:r("disconnected")},{name:"404",path:"*",component:r("home")}]})}Object.defineProperty(t,"__esModule",{value:!0}),t.createRouter=i;var s=n(48),a=o(s),c=n(399),u=o(c);a.default.use(u.default)},149:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={socket_add:function(e,t){var n=e.commit;e.dispatch,e.state;t._id&&n("addThumbnail",t)}}},150:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={}},151:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={homeTitle:"Download free mp3 from youtube converted in high quality.",homeDescription:"No registration needed, download music form youtube had never ben so easy :)",login:"login",hi:"hello",source_not_found:"Source not found :(",converting:"downloading from external resource",source_found:"Source found",search_source:"Finding a valid source",complete:"download ready"}},152:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=Object.keys(p).indexOf(e)>-1?e:"en";return new c.default({locale:t,messages:p})}Object.defineProperty(t,"__esModule",{value:!0}),t.createI18n=r;var i=n(48),s=o(i),a=n(385),c=o(a),u=n(151),l=o(u),d=n(153),f=o(d);s.default.use(c.default);var p={en:l.default,it:f.default}},153:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={homeTitle:"Converti e scarica gratis musica in mp3 da youtube.",homeDescription:"Non serve registrarsi ed é piú semplice di quanto tu possa credere, scaricare musica non é mai stato cosi facile :)",hi:"ciao",source_not_found:"Cé stato un problema pd :( scrivimi che magari lo risolvo al volo",converting:"Sto convertendo in mp3 aspe",source_found:"Apposhht solo un attimo",search_source:"Recupero il link",complete:"download pronto :)",login:"accedi"}},154:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(){return new c.default.Store({state:{thumbnails:[],connState:!1,isConnected:!1,autoCompleteList:[],locale:"it",usr:{token:!1}},actions:l.default,mutations:f.default,getters:m.default})}Object.defineProperty(t,"__esModule",{value:!0}),t.createStore=r;var i=n(48),s=o(i),a=n(52),c=o(a),u=n(149),l=o(u),d=n(155),f=o(d),p=n(150),m=o(p);s.default.use(c.default)},155:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={CONNECTION_STATE:function(e,t){e.connState=t},setConnected:function(e,t){e.isConnected=t},addThumbnail:function(e,t){t?-1===e.thumbnails.indexOf(t)&&e.thumbnails.push(t):e.thumbnails=[]},SOCKET_AUTOCOMPLETELIST:function(e,t){e.autoCompleteList=t},SOCKET_LOGIN:function(e,t){localStorage.u=JSON.stringify(t),e.usr=t}}},156:function(e,t,n){"use strict";function o(e){var t=e.replace(/^https?:\/\//,"").replace(/\/.*$/,""),n=t.split(".").slice(-3);return"www"===n[0]&&n.shift(),n.join(".")}function r(e){var t=Date.now()/1e3-Number(e);return t<3600?i(~~(t/60)," minute"):t<86400?i(~~(t/3600)," hour"):i(~~(t/86400)," day")}function i(e,t){return 1===e?e+t:e+t+"s"}Object.defineProperty(t,"__esModule",{value:!0}),t.host=o,t.timeAgo=r},361:function(e,t){},362:function(e,t){},363:function(e,t){},364:function(e,t){},365:function(e,t){},366:function(e,t){},386:function(e,t,n){function o(e){n(363)}var r=n(43)(n(141),n(394),o,null,null);e.exports=r.exports},387:function(e,t,n){function o(e){n(362)}var r=n(43)(n(142),n(393),o,null,null);e.exports=r.exports},388:function(e,t,n){function o(e){n(361)}var r=n(43)(n(143),n(392),o,null,null);e.exports=r.exports},389:function(e,t,n){function o(e){n(366)}var r=n(43)(n(144),n(397),o,"data-v-d8999cda",null);e.exports=r.exports},390:function(e,t,n){function o(e){n(364)}var r=n(43)(n(145),n(395),o,"data-v-6a5eabfa",null);e.exports=r.exports},391:function(e,t,n){function o(e){n(365)}var r=n(43)(n(146),n(396),o,"data-v-74ff482b",null);e.exports=r.exports},392:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{attrs:{id:"noQuota f fc"}},[e._v("\n    ciao\n")])},staticRenderFns:[]}},393:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"fb-root"}),n("div",{staticClass:"fb-login-button",attrs:{"data-max-rows":"1","data-size":"large","data-show-faces":"true","data-auto-logout-link":"false","data-use-continue-as":"false"}})])}]}},394:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"header-wrapper"},[n("div",{staticClass:"header"},[n("div",{staticClass:"scrolling-header",class:{opened:e.srcOpen}},[n("search-bar",{on:{src:function(t){e.srcOpen=!1}}}),n("div",{staticClass:"header-btn"},[n("div",{staticClass:"ttransition tzoom",on:{click:function(t){e.srcOpen=!e.srcOpen}}},[n("i",{staticClass:"mdi f fc mdi-magnify"})]),n("div",{attrs:{id:"logo"}},[n("router-link",{attrs:{to:"/"}},[n("img",{attrs:{src:"/public/img/logo.jpg"}})])],1),n("div",{staticClass:"ttransition tzoom"},[n("div",{staticClass:"fullsize f fc nowrap login-icon"},[e.usr.img?n("img",{attrs:{src:e.usr.img}}):n("i",{staticClass:"f fc nowrap mdi mdi-login-variant",on:{click:function(t){e.fbLog()}}},[e.usr&&!e.usr.g?n("span",[e._v(e._s(e.usr.nick))]):e._e()])])])])],1)])]),n("div",{staticClass:"main nowrap f fc"},[n("auto-complete",{directives:[{name:"show",rawName:"v-show",value:e.srcOpen,expression:"srcOpen"}]}),n("transition",{attrs:{name:"fadeDown"}},[e.isConnected?e._e():n("reconnect")],1),n("transition",{attrs:{name:"fade"}},[e.noQuota?n("noQuota"):e._e()],1),n("div",{staticClass:"page f"},[n("transition",[n("router-view")],1)],1)],1),e._m(0)])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"f ja",attrs:{id:"footer"}},[n("a",{attrs:{href:"https://github.com/BojDom/tubemp3.co"}},[n("img",{attrs:{src:"/public/img/git.svg"}})]),n("a"),n("a",{attrs:{href:"https://m.me/ddoremix"}},[n("img",{attrs:{src:"/public/messenger.png"}})])])}]}},395:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"search-bar"},[n("form",{staticClass:"f fullw nowrap searchbar",on:{submit:function(t){t.preventDefault(),e.startSrc()}}},[e.q.length>0?n("button",{attrs:{type:"button"}},[n("i",{staticClass:"mdi mdi-comment-remove-outline",on:{click:function(t){e.q=""}}})]):e._e(),n("input",{directives:[{name:"model",rawName:"v-model",value:e.q,expression:"q"}],attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.q},on:{keyup:function(t){e.getAutoComplete()},input:function(t){t.target.composing||(e.q=t.target.value)}}}),n("button",{attrs:{type:"button"}},[n("i",{staticClass:"mdi mdi-magnify",on:{click:function(t){e.startSrc()}}})])])])},staticRenderFns:[]}},396:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"suggestions"}},e._l(e.autoCompleteList,function(t,o){return n("div",{key:t,staticClass:"suggestions"},[n("div",{class:{selected:e.selectedSuggested==o},on:{click:function(n){e.suggest(t)}}},[e._v(e._s(t))])])}))},staticRenderFns:[]}},397:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{attrs:{id:"reconnect f fc"}},[e._v("\nreconnecting\n")])},staticRenderFns:[]}},403:function(e,t,n){function o(e){var t=r[e];return t?n.e(t[1]).then(function(){return n(t[0])}):Promise.reject(new Error("Cannot find module '"+e+"'."))}var r={"./disconnected.vue":[406,3],"./download.vue":[407,0],"./home.vue":[408,2],"./search.vue":[409,1]};o.keys=function(){return Object.keys(r)},e.exports=o,o.id=403}},[147]);