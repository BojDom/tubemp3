<template>
	<div id="home">
		<div class="sharethis-inline-share-buttons"></div>
		<div class="results f fc" v-if="thumbnails.length>0">
				<thumb-video v-for="v in thumbnails"  v-if="v._id" :key="v._id" :v="v">
				</thumb-video>
		</div>
		<div v-else>
			<loading></loading>
		</div>
		<vue-inf v-if="thumbnails.length>0" style="width:100%" @infinite="nextLastPage" :distance="0"></vue-inf>
	</div>
</template>
<script>
import loading from '../components/loading';
import thumbVideo from '../components/video';
import { Observable } from 'rx-lite';
import vueInf from '../components/InfiniteLoading.vue';
import {mapState} from 'vuex';
export default {
	name: "home",
	components:{
		'thumb-video':thumbVideo,
		'loading':loading,
		'vue-inf':vueInf
	},
	computed:{
			...mapState(['isConnected','thumbnails']),
	},
	data() {
		return {
			vs:[],
			page:1
		}
	},
	methods:{
		nextLastPage(state){
			console.log('nextPage',arguments);
 			setTimeout(()=>{
 				this.$socket.emit('last',this.page);
			})
		}
	},
	sockets:{
		lastEnded:function(){
			this.page++;
		},

	},
	mounted() {
		this.$store.commit('addThumbnail',false)
		new Observable.create(sub => {
			if (this.isConnected) sub.next();
			else this.$watch("isConnected", ()=>{ if (this.isConnected) sub.next();})
		}).take(1).subscribe(ok => {
			this.nextLastPage()
		});
	},
	metaInfo() {
    return {
      title: 'TubeMp3.co - convert and download your youtube video to mp3!',
      meta: [
        { vmid: 'description', name: 'description', content: 'Convert and download free hight quality mp3 easy as 1 2 3 without registration' }
      ]
    }
  },
  title(){
	  return 'ciaooo'
  }

}
</script>
<style scoped lang="less">
@theme: "../less/themes/dev";
@import "@{theme}";
#home {
	overflow-y:auto;
}

</style>