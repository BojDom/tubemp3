<template>
	<div id="search" class="scroll">
	    <div class="results f fc" v-if="thumbnails.length>0">
			<thumb-video v-for="v in thumbnails" :key="v._id" :v="v"/>
	    </div>
		<div v-else>
			<loading></loading>
		</div>
		<vue-inf v-if="thumbnails.length>8" style="width:100%" @infinite="search" :distance="0"></vue-inf>
	</div>
</template>	
<script>
import loading from '../components/loading';
import thumbVideo from '../components/video';
import vueInf from '../components/InfiniteLoading.vue';
import {when} from 'mobx'
import {mapState} from 'vuex';
	export default {
		components:{
			'thumb-video':thumbVideo,
			'loading':loading,
			'vue-inf':vueInf
		},
		data(){
			return {
				loading:true,
				pageToken:false,
				loadState:null
			}
		},
		watch:{
			"$route":function(){
				this.$store.commit('addThumbnail',false);
				this.pageToken = false;
				this.search()
			},
		},
		computed:{
			...mapState(['isConnected','thumbnails']),
		},
		sockets:{
			pageToken:function(tok){
				this.pageToken=tok;
			},
			add:function(){
				if (this.loadState) this.loadState.loaded()
			}
		},
		methods:{
			search:function(state){
				console.log('searching')
				this.loadState=state;
                this.$store.commit('SOCKET_AUTOCOMPLETELIST',[])
				this.loading=true;
				this.$socket.emit('search',{
					src:this.$router.currentRoute.params.src.split('_').join('+'),
					pageToken:this.pageToken
				})
			}
		},
		async mounted(){
			this.$store.commit('addThumbnail',false);
			await when(()=>this.$connState.get().endsWith('connect'));
			this.search();

		},
	}
</script>
<style scoped lang="less">
#search {
	overflow-y: auto;
}
/*@theme:"../less/themes/dev";
@import "@{theme}";
.download_button {
	font-size: 40px;
}*/
</style>