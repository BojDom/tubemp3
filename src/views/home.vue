<template>
	<div id="home">
		<div class="results f fc" v-if="thumbnails.length>0">
			<thumb-video v-for="v in thumbnails"  :key="v._id" :v="v"/>

		</div>
		<div v-else>
			<loading v-if="isConnected"></loading>
		</div>
		<vue-inf v-if="thumbnails.length>0" style="width:100%" @infinite="nextLastPage" :distance="0"></vue-inf>
	</div>
</template>
<script>
import loading from '../components/loading';
import thumbVideo from '../components/video';
import vueInf from '../components/InfiniteLoading.vue';
import {mapState} from 'vuex';
import {when} from 'mobx'
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
		nextLastPage(p){
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
		when(()=>this.$connState.get()=='connect')
			.then(()=>{
				this.nextLastPage()
			})
		console.log('mobx',)
		this.$store.commit('addThumbnail',false)
			
	},
/*	metaInfo() {
    return {
      title: 'TubeMp3.co - convert and download your youtube video to mp3!',
      meta: [
        { vmid: 'description', name: 'description', content: 'Convert and download free hight quality mp3 easy as 1 2 3 without registration' }
      ]
    }
  }*/

}
</script>
<style scoped lang="less">
@theme: "../less/themes/dev";
@import "@{theme}";
#home {
	overflow-y:auto;
}

</style>