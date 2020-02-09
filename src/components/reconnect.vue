<template>
<div id="reconnect"  class="f fc" :style="{height:height}">
	<loading :spinner="true"></loading>
	<div id="reconnect_msg"  v-show="showMsg">{{$t('reconnect_msg')}}</div>
</div>
</template>
<script>
import loading from './loading'
export default {
	name:'reconnect',
	components:{
		loading
	},
	mounted:function(){
		setTimeout(()=>{
			this.showMsg=true;
		},2500)
	},
	mounted:function(){
		this.height=(window.innerHeight - document.querySelector('#footer').offsetHeight)+'px'
	},
	data:function(){
		return {
			showMsg:false,
		}
	}
}
</script>

<style scoped lang="less">
@theme: "../less/themes/dev";
@import "@{theme}";

#reconnect {
    width: 100vw;
	height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: hsla(0,0%,0%,.6);
    #reconnect_msg {
    	width:80vw;
    	text-align: center;
    	background: hsla(0,0%,0%,.5);
    	padding: 10px;
    	border-radius: 7px;
    }
}
</style>
