<template>
	<div id="download-page" >
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
			<div :style="{'width':progress+'%'}">
				<img @error="retryImg" :src="'https://'+ API_HOST +'/wave/'+v._id+'?bo='+rand"/>
			</div>
			</div>


			<transition name="ffade">
				<bar v-if="progress<101" :value="progress" style="width:150px;"></bar>
			</transition>
			<transition name="ffade" >
				<div id="download-button" class="button" v-if="progress>100">
				<!-- <p class="top">ciao</p> -->
				<a :href="'https://' + API_HOST + v.d">DOWNLOAD</a>
				<p class="bottom">{{v.size}}</p>
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
import thumbVideo from '../components/thumbVideo';
import { Observable } from 'rx-lite';
import {mapState} from 'vuex';
import tween from '@tweenjs/tween.js'
import nouislider from 'nouislider'
import bar from '../components/ProgressBar'
export default {
	name: "download",
	components:{
		'thumb-video':thumbVideo,
		'loading':loading,
		'bar':bar
	},
	computed:{
			...mapState(['isConnected','thumbnails']),
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
			progress:0,
			anim:null
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
		retryImg:function(){
			setTimeout(()=>{
				this.rand=Math.random()
			},200)
		}
	},
	sockets:{
		cProgress:function(obj){
			if (obj.progress)
			 this.anim.to({x:obj.progress},1300).start();
			Object.keys(obj).map(k=>{
				//if (k!=='progress')
				this.v[k]=obj[k];
				if (k==='wave') this.rand = Math.random()
			})
			this.$forceUpdate();
		}
	},
	created(){


	},
	mounted() {
		new Observable.create(sub => {
			if (this.isConnected) sub.next();
			else this.$watch("isConnected", ()=>{ if (this.isConnected) sub.next();})
		}).take(1).subscribe(ok => {
			this.getLink()
		});

		this.anim = new tween.Tween({x:0}).easing(tween.Easing.Quadratic.InOut).onUpdate(x=>{
			this.progress=~~x.x;
		});

   },
   title(){
	  return 'Download'+this.num
   }
}
</script>
<style scoped lang="less">
@theme: "../less/themes/dev";
@import "@{theme}";
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

#download-page {
	justify-content:flex-start;
	align-items:center;
}
.button {
	position: relative;
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
	    text-align: center;
	    text-transform: uppercase;
	    background: hsl(193, 100%, 46%);
	    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,hsl(193, 100%, 46%)), color-stop(100%,hsl(191, 100%, 38%)));
	    background: -webkit-linear-gradient(top, hsl(193, 100%, 46%) 0%,hsl(191, 100%, 38%) 100%);
	    background: linear-gradient(top, #00b7ea 0%,#009ec3 100%);

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






</style>