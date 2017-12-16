<template>
	<div :id="'vid'+v._id" class="f fc video">
		<div class="thumb">
			<img @click="getLink()" :src="v.img" />
			<div class="dur f">{{v.dur}}</div>
			<transition name="fade">
				<div class="bg f fc nowrap" v-show="selected">
					<transition name="slideDown">
						<div v-show="spinner">
							<spinner :show="!v.d"></spinner>
						</div>
					</transition>
					<div class="f fc ja download-buttons">
						<a class="f fc" v-show="v.d" :href="'https://' + API_HOST + v.d">
								<i class="material-icons mdi mdi-download"></i>
								<i>{{v.size}}</i>
						</a>
						<div class="message">{{$t(v.msg)}}</div>
					</div>
					<div class="progBar" :class="{
												'g':progress>0,
												'r':progress<0
										}" :style="{'width':progress+'%'}">
					</div>
				</div>
			</transition>
		</div>
		<transition name="slideDown">
		<div class="wave" v-if="v.wave || progress > 100">
			<div :style="{'width':progress+'%'}">
				<img :src="'https://'+API_HOST+'/wave/'+v._id"/>
			</div>
		</div>
		</transition>
		<div class="stats f" v-if="v.viewCount && $route.name === 'download'">
			<div>&nbsp;</div>
			<div class="view-count">
				<i class="material-icons mdi mdi-eye"></i> {{v.viewCount}}
			</div>
		</div>
		<div class="title">
			<h3>{{v.title}}</h3>
		</div>
	</div>
</template>
<script>
import tween from '@tweenjs/tween.js'
import spinner from './Spinner';
import http from '../router/http';
import { mapState } from 'vuex';
export default {
	name: 'thumbVideo',
	components: {
		'spinner': spinner
	},
	props: {
		"v": {}
	},
	data() {
		return {
			selected: false,
			progress:0,
			spinner: false,
			raf: false,
			anim: null,
			ext: 'm4a',
			API_HOST : API_HOST
		}
	},
	watch:{
		"v.progress":function(n){
			this.anim.to({x:n},300).start()
		},
	},
	mounted(){
		var self = this;
		this.anim = new tween.Tween({x:0}).onUpdate(function(x){
			self.progress=x.x;
		});
	},
	methods: {
		getLink() {
			if (this.$route.name !== 'download')
			this.$router.push({
                        name:'download',
                        params:{
                            id:this.v._id
                        }
             })			
			if (this.selected) return null;
			this.selected = true;
			this.spinner = true;
			this.dlink = false;
			this.v.msg = "search_source";
			this.$socket.emit('getLink', {
				id: this.v._id,
				ext: this.ext
			})
		}
	}
}
</script>
<style scoped lang="less">
@theme: "../less/themes/dev";
@import "@{theme}";
.title {
	padding: 5px 0;
	overflow: hidden;
	text-overflow: collapse;
	h3 {
		text-align: center;
		font-size: 15px;
		margin: 0;
	}
}

.bg {
	background: hsla(0, 0%, 0%, .8);
}

.video {
	width: 320px;
	border:3px solid #000;
	box-sizing: border-box;
	margin: 10px auto;
}

.download-buttons {
	height: 100%;
	width: 100%;
	.f {
		border: 2px solid @downloadButtonsColor;
		border-radius: 10px;
		padding: 6px 10px;
		&:hover {
			background: fadeout(@downloadButtonsColor, 80%);
			cursor: pointer;
		}
	}
	i {
		color: @downloadButtonsColor;
	}
}

.thumb {
	width: 320px;
	margin: 0 auto;
	height: 0;
	padding-bottom: 100%*(9/16);
	position: relative;
	display: inline-table;
	.bg,
	img,
	.dur {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	.dur {
		height: 15%;
		width: 15%;
		font-size: 15px;
		left: 80%;
		top: 10%;
		background: @color1;
	}
	.progBar {
		position: absolute;
		bottom: 0;
		left: 0;

		height: 4px;
		transition: all .2s ease;
		&.g {
			background: green
		}
		&.r {
			background: red
		}
	}
}

.wave {
		div {
			 overflow: hidden;
		}
		width:320px;
		img {
			width:320px;
			height: 80px;
		}
}
.stats {
	justify-content:space-between;
	white-space: nowrap;
	width: 90%;
}
.message.error {
	border-color: @color1;
}
</style>