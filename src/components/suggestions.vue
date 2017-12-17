<template>
	<div id="suggestions">
		<div class="suggestions" v-for="(s,i) in autoCompleteList" :key="s" >
        	<div :class="{'selected':selectedSuggested==i}" @click="suggest(s)">{{s}}</div>
    	</div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
		computed:{
			...mapState(['autoCompleteList','selectedSuggested']),
		},
		data(){
			return {

			}
		},
		methods:{	
            suggest(text){

                    this.$router.push({
                        name:'search',
                        params:{
                            src:text.split(' ').join('_')
                        }
                    })
            },
		}
}
</script>
<style scoped lang="less">

@theme: "../less/themes/dev";
@import "@{theme}";
#suggestions {
	width: 320px;
}
.suggestions {
    padding: 7px 20px;
    font-size:18px;
    white-space: nowrap;
    overflow: hidden;
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