<template>
	<div id="download-page" class="scroll" >
		<div v-if="v.title" class="f fc">
			<thumb-video :v="v">
			</thumb-video>
			<div class="stats f" v-if="v.viewCount && $route.name === 'download'">
				<div>&nbsp;</div>
				<div class="view-count">
					<i class="material-icons mdi mdi-eye"></i> {{v.viewCount}}
				</div>
				
			</div>
			<h4> {{$t(v.msg)}} </h4>

			<div class="wave">
			<div :style="waveContainerStyle">
				<div class="wave-bg" :style="waveStyle">
					<img class="transparent" @error="retryImg()" :src="'https://'+ API_HOST +'/wave/'+v._id+'?bo='+rand"/>
				</div>
			</div>
			</div>


			<transition name="ffade">
				<bar v-if="progress<101" :value="progress" style="width:150px;"></bar>
			</transition>
			<transition name="ffade" >
				<div v-if="progress>100" class="fullw f fc">
					<div class="sharethis-inline-share-buttons"></div>

					<range :value="rangeValue" @change="rangeChanged($event)">
						<slot text="Ritaglia l audio a tuo piacimento"></slot>
					</range>
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
import { Observable , Subject} from 'rx-lite';
import {mapState} from 'vuex';
import tween from '@tweenjs/tween.js'
import debounce from 'lodash.debounce';
import range from '../components/range';
import bar from '../components/ProgressBar'
export default {
	name: "download",
	components:{
		'thumb-video':thumbVideo,
		'loading':loading,
		'bar':bar,
		'range':range
	},
	computed:{
			...mapState(['isConnected','thumbnails']),
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
			waveContainerStyle:{}
		}
	},
	methods:{
		getLink:function(){
			new Observable.create(sub => {
				this.id = this.$route.params.id;
				if (this.thumbnails.length>0)
					this.v = this.thumbnails.find(vid=>{
						return vid._id === this.id
					})
				if (!this.v || !this.v.title) this.$socket.emit('getVid',{id:this.id},(err,data)=>{
					if (err) return;
					this.v=data;
					sub.next()
				})
				else sub.next();
			}).take(1).subscribe(ok => {
				this.$socket.emit('getLink', {
					id: this.id
				})
			})
		},
		rangeChanged(val){
			var isChanged = (val[0]!=this.rangeValue[0] || val[1]!=this.rangeValue[1])
			this.showCut = isChanged;

			this.rangeValue=val;
			if (!isChanged) return;
			this.waveStyle={
				width:(3.20 * val[1]) + 'px',
				background:'url(https://'+ API_HOST +'/wave/'+this.v._id+'?bo='+this.rand+')',
				transform: 'translateX(-'+~~(3.20 * val[0])+'px)',
			}
			this.waveContainerStyle={
				transform: 'translateX('+~~(3.20 * val[0])+'px)',
				width:3.2*(val[1] - val[0]) + 'px'
			}
		},
		retryImg:function(){
			setTimeout(()=>{
				this.rand=Math.random()
			},100)
			this.imgObs.onNext()
		},
		cut(){
			this.progress=0;
			this.showCut = false;
			this.$socket.emit('cut',{
				id:this.v.id,
				value:this.rangeValue
			});
		}
	},
	sockets:{
		cProgress:function(obj){
			if (obj.progress)
			 this.anim.to({x:obj.progress},1300).start();
			Object.keys(obj).map(k=>{
				//if (k!=='progress')
				this.v[k]=obj[k];
				if (k==='wave') this.retryImg();
			})
			this.$forceUpdate();
		}
	},
	mounted() {
		new Observable.create(sub => {
			if (this.isConnected) sub.next();
			else this.$watch("isConnected", ()=>{ if (this.isConnected) sub.next();})
		}).take(1).subscribe(ok => {
			this.getLink()
		});
		this.imgObs= new Subject();
		this.imgObs.debounce(300).subscribe(()=>{
			this.waveStyle={				
				background:'url(https://'+ API_HOST +'/wave/'+this.v._id+'?bo='+this.rand+')'
			}
		});
		this.anim = new tween.Tween({x:0}).easing(tween.Easing.Quadratic.InOut).onUpdate(x=>{
			this.progress=~~x.x;

			this.waveContainerStyle={
				width: (3.2 * x.x) + 'px'
			}
		});
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
		width:320px;
		.wave-bg {
			width:320px;
			height: 80px;
		}
}
.stats {
	justify-content:space-between;
	white-space: nowrap;
	width: 90%;
}

#download-page {
	justify-content:flex-start;
	align-items:center;
	overflow-y: scroll;
	overflow-x: hidden;
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





</style>