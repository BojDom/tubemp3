<template>
	<div :id="'vid'+v._id" class="f fc video" :style="{width:w}">
		<div class="thumb">
			<img @click="goToDownload()" :src="v.img" />
			<div class="dur f">{{v.dur}}</div>
		</div>
		<div class="title">
			<h3>{{v.title}}</h3>
		</div>
	</div>
</template>
<script>
export default {
	name: 'thumbVideo',
	components: {
		
	},

	props: {
		"v": {},
		"w":{
			type:String,
			default:'320px'
		}
	},
	data() {
		return {

		}
	},
	mounted(){

	},
	methods:{
		goToDownload:function(){
			if (typeof this.v.title !=='string') this.v.title = 'no_title'
			this.$router.push({
                name:'download',
                params:{
                	id:this.v._id,
                	title:encodeURI(this.v.title.split(' ').join('_'))
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

.download-buttons {
	height: 100%;
	width: 100%;
	.f {
		border: 2px solid @downloadButtonsColor;
		border-radius: 10px;
		padding: 6px 10px;
		&:hover {
			background: fadeout(@downloadButtonsColor, 80%);
			cursor: pointer;
		}
	}
	i {
		color: @downloadButtonsColor;
	}
}

.thumb {
	width: 100%;
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
	.progBar {
		position: absolute;
		bottom: 0;
		left: 0;

		height: 4px;
		transition: all .2s ease;
		&.g {
			background: green
		}
		&.r {
			background: red
		}
	}
}

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
.message.error {
	border-color: @color1;
}
</style>