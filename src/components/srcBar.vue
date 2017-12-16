<template>
<div class="search-bar">
     
    <form class="f fullw nowrap searchbar" @submit.prevent="startSrc()">
        <input type="text" 
    @keyup.down="selectSuggested(true)"
    @keyup.up="selectSuggested(false)"
    @keyup="getAutoComplete()" v-model="q" :placeholder="placeholder" />
   
        <button type="button">
		    <i class="mdi mdi-magnify" @click="startSrc()"></i>
		</button>
	</form>

        <div class="suggestions" v-for="(s,i) in autoCompleteList" :key="s" >
            <div :class="{'selected':selectedSuggested==i}" @click="suggest(s)">{{s}}</div>
        </div>
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
                selectedSuggested:-1
			}
		},
        computed:{
            ...mapState(['autoCompleteList'])
        },
        methods:{
			startSrc(){
                this.$store.commit('SOCKET_AUTOCOMPLETELIST',[])
                if (this.$store.state.isConnected && this.q.length>2)
				{
                    this.$emit('src')
                    if (this.selectedSuggested>-1)
                    this.q=this.autoCompleteList[this.selectedSuggested];
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
            suggest(text){
                this.q = text;
                this.startSrc()
            },
            selectSuggested(bool){
                if (bool&&this.selectedSuggested<this.autoCompleteList.length) {
                    this.selectedSuggested++;
                }
                else if (!bool && this.selectedSuggested>-1) {
                    this.selectedSuggested--;
                }
            },
            getAutoComplete:_(function(){
                if (this.$store.state.isConnected && this.q && this.q.length>2 ) 
                        this.$socket.emit('autocomplete',{q:this.q})
            },400)
        }
}
</script>
<style lang="less">
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

.suggestions {
    padding: 7px 20px;
    font-size:18px;
    div {
        cursor:pointer;
        border-bottom:1px solid fadeout(@textColor, 50%);
        padding: 5px 10px;
        &:hover {
            background:fadeout(@textColor, 80%);
        }
        &.selected {
            background:fadeout(@textColor,60%)
        }
    }
}
</style>