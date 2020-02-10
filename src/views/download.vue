<template>
	<div id="download-page" class="scroll" >
		<div v-if="v.title" class="f fc">
			<thumb-video :v="v"/>
			<!--<div class="player f ja" v-if="progress>0">
				<i class="material-icons mdi mdi-play" v-if="!isPlaying"></i>
				<i v-else class="material-icons mdi mdi-pause"></i>

				<div id="playerWave">
					<img  :src="'https://'+ API_HOST +'/wave/'+v._id+'?bo='+rand"/>
				</div>
			</div> -->
			<div class="stats f" v-if="v.viewCount && $route.name === 'download'">
				<div v-if="activeAudio">
					<i v-if="!audio" class="material-icons mdi mdi-loading rotate" />
					<i @click="stop()" v-if="isPlaying" class="material-icons mdi mdi-pause" />
					<i @click="play()" v-if="!isPlaying&&audio" class="material-icons mdi mdi-play" />
				</div>
				<span :class="{deactivate:activeAudio}" @click="$store.commit('activateAudio',!activeAudio)">{{!activeAudio ? $t('activate_audio') : $t('deactivate_audio')}}</span>
				<div class="view-count">
					<i class="material-icons mdi mdi-eye"></i> {{v.viewCount}}
				</div>
				
			</div>
			<h4> {{$t(v.msg)}} <span v-if="progress && ( progress < 100 )"> {{'...'+ ~~progress +'%'}}</span> </h4>

			<div class="wave" v-if="v._id">
			<div :style="waveContainerStyle">

				<div class="wave-bg" :style="waveStyle">
					<!-- server solo per il retry -->
					<img class="transparent" @load="waveLoaded=true" :src="'https://'+ API_HOST +'/wave/'+v._id+'?bo='+rand"/>
				</div>
		
			</div>

				<div class="wave-bg" :style="'opacity:0.15;background-image:url(https://'+ API_HOST +'/wave/'+v._id+'?bo='+rand+')'"/>

				<div v-if="progress>100" class="vertical-separator" :style="leftEdge">
						<i class="material-icons mdi mdi-content-cut"/>
				</div>
				<div v-if="progress>100" class="vertical-separator" :style="[{left:'318px'},rightEdge]">
					<i class="material-icons mdi mdi-content-cut"/>

				 </div>
				<range :value="rangeValue" @change="rangeChanged($event)"/>
			</div>
				<social-sharing  inline-template>
				  <span class="social-buttons f ja">
				      <network network="facebook">
				        <button><i class="mdi mdi-facebook"></i></button>
				      </network>
				      <network network="whatsapp">
				        <button><i class="mdi mdi-whatsapp"></i></button>
				      </network>
				  </span>
				</social-sharing>			
			<transition name="ffade" >
				<div v-if="v.d" class="fullw f fc">
					<div class="sharethis-inline-share-buttons"></div>

					<div v-if="!showCut" id="download-button" class="button">
						<a :href="'https://' + API_HOST + v.d" target="_blank">DOWNLOAD</a>
						<p class="bottom">{{v.size}}</p>
					</div>
					<div v-else class="button" id="cutButton">
						<a @click="cut">
							<i class="mdi mdi-content-cut"></i> | 
								 {{$t('cut')}}
						</a>
					</div>

				</div>
			</transition>
		</div>
		<div v-else>
			<loading></loading>
		</div>
	</div>
</template>
<script>
import loading from '../components/loading';
import thumbVideo from '../components/video';
import { timer } from 'rxjs';
import {takeWhile} from 'rxjs/operators'
import {mapState} from 'vuex';
import {Tween,Easing} from 'es6-tween'

import {assign,once} from 'lodash';
import range from '../components/range';

import socialSharing from 'vue-social-sharing'
import {when} from 'mobx'
//import moment from 'moment'
export default {
	name: "download",
	components:{
		'thumb-video':thumbVideo,
		'loading':loading,
		'range':range,
		'social-sharing':socialSharing
	},
	computed:{
			...mapState(['isConnected','thumbnails','activeAudio']),
	},
	beforeCreate(){
		this.$route.params.title =  (typeof this.$route.params.title !=='string')
			? '' :	 decodeURI(this.$route.params.title).split('_').join(' ')
	},
	data() {
		return {
			API_HOST:API_HOST,
			index:null,
			fill : { gradient: ["red", "green", "blue"] },
			v:{
				msg:'search_source',
				progress:0
			},
			num:0,
			rand:0,
			rangeValue:[0,100],
			slider:null,
			progress:0,
			anim:null,
			showCut:false,
			waveStyle:{},
			rightEdge:{},
			leftEdge:{},
			waveContainerStyle:{},
			isPlaying:false,
			audio:null,
			waveLoaded:false
		}
	},
	methods:{
		stop:function(){
			try{this.audio.suspend();this.isPlaying=false;}catch(e){console.log('cant pause',e,this.audio)}
		},
		play:function(){
			try{this.audio.resume();this.isPlaying=true;}catch(e){this.stop();console.log('cant play',e,this.audio)}
		},
		getLink: async function(){

			this.id = this.$route.params.id;
					// esecuzione normale
			if (this.thumbnails.length>0)
				this.v = this.thumbnails.find(vid=>{
					return vid._id === this.id
				})
					// accesso url diretto o refresh
			if (!this.v || !this.v.title)
			await new Promise(r=>{
				this.$socket.emit('getVid',{id:this.id},(err,data)=>{
					if (err) return;
					this.v=data;
					r();
				})
			})
					// what ?
				//else sub.next();
			
			this.$socket.emit('getLink', {
				id: this.id
			})
			
		},
		rangeChanged(val){
			var isChanged = (val[0]!=this.rangeValue[0] || val[1]!=this.rangeValue[1])
			this.showCut = isChanged;
			this.rangeValue=val;
			if (!isChanged) return;
			//console.log(val)
			this.waveStyle.transform = 'translateX(-'+~~(3.20 * val[0])+'px)';
			this.rightEdge.transform = 'translateX(-'+~~(3.20 * (100-val[1]) ) +'px)';
			this.leftEdge.transform='translateX('+~~(3.20 * val[0])+'px)';


			this.waveContainerStyle={
				...this.leftEdge,
				width:3.2*(val[1] - val[0]) + 'px'
			}
		},
		cut(){
			this.v.d=false;
			this.showCut = false;
			this.$socket.emit('cut',{
				id:this.v.id,
				value:this.rangeValue
			},(err,data)=>{
				console.log(err,data)
				this.progress=101;
				assign(this.v,data)
				//this.anim.stop()
				setTimeout(()=>{
					this.$forceUpdate()
				},400)
			});
		}
	},
	sockets:{
		cProgress:function(obj){
			if (obj.id !=this.v._id ) return;
			if (obj.progress) {
				this.anim._valuesStart = this.anim.object;
				this.anim.to({x:obj.progress},1300).start();
			}
			Object.keys(obj).forEach(k=>{
				if (k!=='progress')
				this.v[k]=obj[k];
				//if (k==='wave') this.retryImg();
			})
			this.$forceUpdate();
		},
		preview:function(tok){
			if (this.audio) return;
			this.audio = new (window.AudioContext || window.webkitAudioContext)();
	        var source = this.audio.createBufferSource();
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', 'https://' + API_HOST + tok);
	        xhr.responseType = 'arraybuffer';
	        xhr.addEventListener('load',(r) =>{
	            this.audio.decodeAudioData(xhr.response, buffer=> {
	                        source.buffer = buffer;
	                        source.connect(this.audio.destination);
	                        source.loop = false;
						});
				source.start(0);
					
				if (!this.activeAudio) {
					this.stop();
				}
	            	
	        });
	        xhr.send();
		}
	},
	async mounted() {
		await when(()=>this.$connState.get().endsWith('connect'));
		this.getLink();

		timer(0,500).pipe(takeWhile(()=>!this.waveLoaded)).subscribe(()=>{
			this.rand= Math.random();
			this.waveStyle={				
				backgroundImage:'url(https://'+ API_HOST +'/wave/'+this.v._id+'?bo='+this.rand+')'
			}

		},()=>{},()=>{
			console.log('WAVE LOADED')
		});

		this.anim = new Tween({x:0}).easing(Easing.Quadratic.InOut).on('update',x=>{
			this.progress=x.x;

			this.waveContainerStyle={
				width: (3.2 * x.x) + 'px'
			}
		});
   },
	watch:{
		activeAudio:{
			handler(v){
				console.log('new activeadio')
				if (!this.audio) return;
				v ? this.play() : this.stop();
			}
		}
	},
   beforeDestroy() {
   		this.stop();
   		//this.anim  && this.anim.stop();
   },
   metaInfo(){
   	return {
   		title : 'Download ' +  this.$route.params.title + ' in hight quality mp3 free!',
		meta: [
	        { vmid: 'description', property: 'description', content: 'Fast download of '+ this.$route.params.title + ' convert in mp3 free download, no registration or other annoying thing just music in mp3' },
	        { vmid: 'og:image', property: 'og:image', content: 'https://i.ytimg.com/vi/'+this.$route.params.id+'/mqdefault.jpg'}
	    ]
   	}
   }
}
</script>
<style scoped lang="less">
@theme: "../less/themes/dev";
@import "@{theme}";
.wave {
	position: relative;
	height: 80px;
		&>div {
			 overflow: hidden;
			 position: absolute;
			 top:0;
			 left: 0;
		}
		&,img,.wave-bg {
			background-size: contain;
			background-repeat: no-repeat;
			width: 320px;
			height: 80px;
		}
}
.vertical-separator {
	overflow: visible!important;
	.mdi-content-cut::before {
		font-size: 22px;
		position: absolute;
		top:0;
		transform: translate(-10px,-10px) rotate(90deg)
	}
}
.stats {
	justify-content:space-between;
	white-space: nowrap;
	width: 90%;
	span {font-size: 10px;padding: 10px;text-transform: uppercase;}
	.deactivate {color:#888;}
	.rotate {display: block;}
	.view-count {text-align: right;flex-grow: 2}
	i {
		animation-duration: 1s;
	}
}
#playerWave {
	height: 30px;
	width: 300px;
	align-self: flex-end;
	opacity: .4;
	img {
		height: 30px;
		width: 100%;
	}
}
#download-page {
	justify-content:flex-start;
	align-items:center;
	overflow-y: scroll;
	overflow-x: hidden;
	padding-right: 17px;
	&>div {padding-bottom: 150px;}
}
.button {
	position: relative;
	margin: 20px auto;
	text-align: center;
	p {
	    background: hsl(0, 0%, 13%);
	    display: block;
	    height: 40px;
	    width: 180px;
	    margin: -50px 0 0 10px;
	    text-align: center;
	    font: 12px/45px Helvetica, Verdana, sans-serif;
	    color: hsl(0, 0%, 100%);
	    position: absolute;
	    z-index: -1;
	    -webkit-transition: margin 0.5s ease;
	    -moz-transition: margin 0.5s ease;
	    -o-transition: margin 0.5s ease;
	    -ms-transition: margin 0.5s ease;
	    transition: margin 0.5s ease;
	}
	a {
	    display: block;
	    height: 50px;
	    width: 200px;
	    color: hsl(0, 0%, 100%);
	    font: 17px/50px Helvetica, Verdana, sans-serif;
	    text-decoration: none;
	    text-transform: uppercase;background: #1e5799;
	    background: #1e5799;
		background: -webkit-linear-gradient(top, hsl(212,67%,36%) 0%,hsl(207,69%,51%) 50%,hsl(208,73%,46%) 51%,hsl(206,70%,70%) 100%);
		background: linear-gradient(to bottom, hsl(212,67%,36%) 0%,hsl(207,69%,51%) 50%,hsl(208,73%,46%) 51%,hsl(206,70%,70%) 100%);

	 }
	a, p {

	    -moz-border-radius: 10px;
	    border-radius: 10px;
	    -webkit-box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
	    box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
	}

	.top {
    	margin: -35px 0 0 10px;
    	line-height: 35px;
	}
    .bottom {
	    margin: -10px 0 0 10px;
	}
}
	#cutButton a {
		background: #ffc533;
		background: -webkit-linear-gradient(top, hsl(43,100%,60%) 0%,hsl(47,70%,44%) 50%,hsl(43,73%,47%) 51%,hsl(44,80%,64%) 100%);
		background: linear-gradient(to bottom, hsl(43,100%,60%) 0%,hsl(47,70%,44%) 50%,hsl(43,73%,47%) 51%,hsl(44,80%,64%) 100%);
	}

.vertical-separator {
	position: absolute;
	width: 2px;
	height: 80px;
	left:0;
	top:0;
	background: #ddd;

}





</style>