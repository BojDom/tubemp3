<template>
<div class="search-bar">
     
    <form class="f fullw nowrap searchbar" @submit.prevent="startSrc()">
        <button type="button" v-if="q.length>0">
            <i class="mdi mdi-comment-remove-outline" @click="q=''"></i>
        </button>
        <input type="text" 
        @keyup="getAutoComplete()" v-model="q" :placeholder="placeholder" />

        <button type="button">
		    <i class="mdi mdi-magnify" @click="startSrc()"></i>
		</button>
	</form>

</div>
</template>
<script>
var keyNav;
import _ from 'lodash.debounce';
import {mapState} from 'vuex';
export default {
		name:"srcBar",
		created(){
            let route = this.$router.currentRoute;
			if (route.name === 'search' && typeof route.params.src === 'string' && route.params.src.length>2)
			this.q=route.params.src.split('_').join(' ');
		},
		data(){
			return {
                placeholder:'Cerca...',
				q:'',
				page:1,
				itemsPerPage:10,
			}
		},
        computed:{
            ...mapState(['autoCompleteList','selectedSuggested'])
        },
        methods:{
			startSrc(){
                this.$store.commit('SOCKET_AUTOCOMPLETELIST',[])
                if (this.$store.state.isConnected && this.q.length>2)
				{
                    this.$router.push({
                        name:'search',
                        params:{
                            //limit:10,
                            //page:1,
                            src:this.q.replace(' ','_')
                        }
                    })
                }
			},
            getAutoComplete:_(function(){
                if (this.$store.state.isConnected && this.q && this.q.length>2 ) 
                        this.$socket.emit('autocomplete',{q:this.q})
            },400)
        }
}
</script>
<style lang="less" scoped>
@theme: "../less/themes/dev";
@import "@{theme}";

.searchbar {
    border: 2px solid shade(@textColor, 20%);
    width: 80%;
    margin: 5px auto;
    border-radius: 15px;
    align-items: stretch;

    input[type="text"] {
        padding:9px 25px;
        font-family: "Muli";
        font-size: 18px;
        width: 80%;
    }
    button {
        width: 50px;
        font-size: 1.4rem;
        background: hsla(0,0%,100%,.12);
    }
}


</style>