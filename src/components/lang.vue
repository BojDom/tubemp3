<template>
<div id="langs" class="f ja" :class="{opened:langOpened}">
			<div class="f ja"  v-for="(l,k) in Object.keys($i18n.messages)" @click="changeLang(l)">
				<div class="img ttransition" :style="{transitionDelay:(100*k)/1000+'s'}">
					<img :src="flag(l)" />
				</div>
			</div>
</div>
</template>
<script>
export default {
    name:"lang",
    methods:{
		flag(l){
			if (l == 'en') l = 'gb'
			return 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/'+l+'.svg'
		},
     	changeLang:function(l) {
    		this.$i18n.locale = l
    		this.$emit('change')
    	}
    },
    props:{
    	langOpened:{},
    }
}
</script>
<style lang="less">

@theme: "../less/themes/dev";
@import "@{theme}";
#langs {
	position: fixed;
	bottom: -50px;
	left:0;
	right:0;
	height: 0;
	overflow: visible;
	margin: 0 auto;
	width: 60%;

	&.opened .img {
		transform:  translateY(-200px) scale(1);
	}
	img {
		height: 30px;
	}
	.img{
		transition: .3s ease-out transform;		
		transform:scale(0.01);
		transform-origin: 50% 50%;
		padding: 20px;
		background: fade(@color1,70%)
	}
}
</style>