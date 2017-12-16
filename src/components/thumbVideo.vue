<template>
	<div :id="'vid'+v._id" class="f fc video">
		<div class="thumb">
			<img @click="goTo()" :src="v.img" />
			<div class="dur f">{{v.dur}}</div>
		</div>
		<div class="title">
			<h3>{{v.title}}</h3>
		</div>
	</div>
</template>
<script>
import tween from '@tweenjs/tween.js'
import spinner from './Spinner';
import http from '../router/http';
export default {
	name: 'thumbVideo',
	components: {
		'spinner': spinner
	},
	props: {
		"v": {}
	},
	data() {
		return {
			selected: false,
			progress:0,
			spinner: false,
			raf: false,
			anim: null,
			ext: 'm4a',
			API_HOST : API_HOST
		}
	},
	methods: {
		goTo() {
			this.$router.push({
                        name:'download',
                        params:{
                            id:this.v._id
                        }
             })	
		}
	}
}
</script>
<style scoped lang="less">
@theme: "../less/themes/dev";
@import "@{theme}";
.title {
	padding: 5px 0;
	overflow: hidden;
	text-overflow: collapse;
	h3 {
		text-align: center;
		font-size: 15px;
		margin: 0;
	}
}

.bg {
	background: hsla(0, 0%, 0%, .8);
}

.video {
	width: 320px;
	border:3px solid #000;
	box-sizing: border-box;
	margin: 10px auto;
}

.thumb {
	width: 320px;
	margin: 0 auto;
	height: 0;
	padding-bottom: 100%*(9/16);
	position: relative;
	display: inline-table;
	.bg,
	img,
	.dur {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	.dur {
		height: 15%;
		width: 15%;
		font-size: 15px;
		left: 80%;
		top: 10%;
		background: @color1;
	}
}
</style>