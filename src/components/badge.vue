<template>
<div  v-if="badgeVal>0" class="f fc badge" :style="{transform:'rotateY('+ r +'deg)'}">
    <div class="val f" > <span>   {{badgeVal}} </span></div>
</div>
</template>
<script>
import tween from '@tweenjs/tween.js'
import { mapState } from 'vuex'
export default {
    name:"badge",
    sockets:{
    	'HomeBadge':function(val){
    		this.$store.commit('setBadgeVal',val)
    	}
    },
    data(){
    	return {
    		r:0,
    		bounce:new tween.Tween({r:0}).onUpdate(v=>{
    			this.r = v.r
    		})
    	}
    },
    computed:{
        ...mapState(['badgeVal'])
    },
    mounted(){
    	let delay = 500;
    	let blink = ()=>{
    		this.bounce.to({r:(this.r+360)},275).repeat(1).start()
    		if (delay<10000)	delay+=1000;
    		setTimeout(blink,delay)
    	}
		setTimeout(blink.bind(this),delay)
    }

}
</script>
<style lang="less" scoped>

@theme: "../less/themes/dev";
@import "@{theme}";
.badge {
	position: absolute;
	z-index: -1;
		height: 1rem;
        font-weight: bold;
		padding: .3rem;
		width: 1rem;
		border-radius: 50%;
        border: 2px  @color1 solid;
		transform-origin: 50% 50%;
		overflow: hidden;
		left: -1rem;
		top: 0;
        text-shadow: hsla(0,0%,0%,.3) 1px 1px 2px;
		background-color: hsl(0,70%,55%);
	.val {
        span {vertical-align: middle;font-size: 1rem;}
		color:@color1;
	}
}

</style>