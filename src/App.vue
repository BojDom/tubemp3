<template>
	<div id="app">
		<div class="header f">
			<div class="ttransition tzoom" @click="srcOpen = ! srcOpen">
				<i class="mdi f fc mdi-magnify"></i>
			</div>
			<div id="logo">
				<router-link to="/">
					<img src="/public/img/logo.jpg" />
				</router-link>
			</div>
			<div class="ttransition tzoom">
				<div class="fullsize f fc nowrap login-icon">
				<img v-if="usr.img" :src="usr.img"/>
				<i @click="fbLog()" v-else class="f fc nowrap mdi mdi-login-variant">
					<span v-if="usr && !usr.g">{{usr.nick}}</span>
				</i>
				</div>
			</div>
		</div>
	
		<div class="main nowrap f fc">
			<transition name="fadeDown">
				<fb-c v-if="srcOpen"></fb-c>
			</transition>
			<transition name="fadeDown">
				<search-bar v-if="srcOpen" @src="srcOpen=false"></search-bar>
			</transition>
			<transition name="fadeDown">
				<reconnect v-if="!isConnected"></reconnect>
			</transition>
			<transition name="fade">
				<noQuota v-if="noQuota"></noQuota>
			</transition>

			<div class="page f">
				<transition>
					<router-view></router-view>
				</transition>
			</div>
		</div>
	
		<div id="footer" class="f ja">
			<a>&nbsp;</a>
			<a>&copy; Endri Domi.</a>
			<a href="https://m.me/ddoremix">
				<img src="/public/messenger.png" style="width:40px;height:40px;"/>
			</a>
		</div>
	</div>
</template>

<script>
import fbC from './components/fb';
import { Observable } from 'rx-lite';
import tween from '@tweenjs/tween.js'
import srcBar from './components/srcBar.vue';
import noQuota from './components/noQuota.vue';
import reconnect from './components/reconnect.vue';
import { mapState } from 'vuex';
import _ from 'lodash.debounce';

export default {
	components: {
		'reconnect': reconnect,
		'search-bar': srcBar,
		'fb-c':fbC,
		'noQuota':noQuota
	},
	data() {
		return {
			q: "",
			fbUrl:'',
			popup:'',
			noQuota:false,
			srcOpen: true
		}
	},
	sockets:{
		connect: function () {
			console.log('socket connected')
		},
		fbPopClose:function(){
			try {this.popup.close()}catch(r){console.log(r)}
		},
		noQuota:function(){
			this.noQuota=true;
		}
	},
	beforeMount() {
		this.$i18n.locale='it';
		new Observable.create(sub => {
			if (this.isConnected) sub.next();
			else this.$watch("isConnected", ()=>{ if (this.isConnected) sub.next();
		})}).take(1).subscribe(ok=>{ 
			try { if (localStorage.u) this.$store.commit('SOCKET_LOGIN', JSON.parse(localStorage.u)); } catch (err) { console.log(err); }
		});
		["connect", "error", "disconnect", "reconnect", "reconnect_attempt", "reconnecting", "reconnect_error", "reconnect_failed", "connect_error", "connect_timeout", "connecting"]
			.map(connEvent => {
				this.$socket.on(connEvent, () => {
					this.$store.commit('CONNECTION_STATE', connEvent)
				})
			});

		function animate(time) {
			requestAnimationFrame(animate);
			tween.update(time);
		}
		requestAnimationFrame(animate);
	},
	methods: {
		fbLog(){
			if (this.usr.fbUrl)
			 this.popup=window.open(this.usr.fbUrl);
		}
	},
	computed: {
		...mapState(['connState', 'isConnected','usr'])
	},
	watch: {
		"connState": _(function (n) {
			if (["disconnect", "connect_error", "reconnect_error", "connect_timeout", "reconnect_failed"].indexOf(n) > -1) {
				this.$store.commit('setConnected', false);
			}
			else if (["connect", "reconnect"].indexOf(n) > -1) {
				this.$store.commit('setConnected', true);
				setTimeout(()=>{
				this.$socket.emit('log', this.usr.token);
				},200)
			}
		},140),
	},
	beforeDestroy() {
		this.$socket.disconnect();
	}
}
</script>

<style lang="less">
@import '../node_modules/vue2-animate/src/vue2-animate.less';
@theme: "./less/themes/dev";
@import "@{theme}";
@import './less/main.less';
.header {
	height: @headerHeight;
	background: @headerBg;
	position: absolute;
	z-index: 2;
	justify-content: space-around;
	width: 100%;
	box-sizing: border-box;
	margin: 0 auto;
	padding: 10px 10%;
	text-align: center;
	&>div {
			flex-grow: 1;
			width: 0;
			height: 80%;
			i {
				height: 100%;
				font-size: 2.5rem;
				width:100%;
				justify-content: space-around;
	            background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.01) 40%, rgba(255, 255, 255, 0.07) 100%);
	            border-bottom:2px solid hsla(0, 0%, 100%, .24);
				span {font-size:1.3rem;}
				&:hover {
					text-shadow: 2px 2px 10px white, -2px -2px 10px white;
					cursor: pointer;
				}
			}
		}
	#logo {
		flex-grow: 3;
		a {
			display: block;
			height: 100%;
		}
		img {
			height: 100%;
		}
	}
	.login-icon img {
		max-height: 80px;
		max-width: 60px;
		border-radius: 8px;
	}
}

.main {
	height: @pageHeight;
	padding-top: @headerHeight;
	justify-content:flex-start;
}

.page {
	height: 100%;
	align-items: flex-start;
	max-width: 640px;
	margin: 0 auto;
	&>div {
		height: 100%;
		align-items:flex-start;
	}
}


.results {
	margin:0 auto;
	align-content: flex-start;
	flex-wrap:nowrap;
	overflow-x: hidden;

}

.ffade-enter-active, .ffade-leave-active {
  transition: all .5s
}
.ffade-enter, .ffade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform:scale(0);
  height: 0;
}
#footer {
	height: @footerHeight;
	position: fixed;
	bottom:0;
	left:0;
	background: linear-gradient(lighten(@color1,20%) 0%, @color1 50%,lighten(@color1,20%) 100%);
	text-align: center;
	width:100%;
	a {color:#fff;flex-grow:1;width:0;white-space: nowrap;}

}
</style>
