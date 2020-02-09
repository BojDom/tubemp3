<template>
  <div class="infinite-loading-container">
    <div :class="{transparent:!isLoading}" class="spinner-wrapper">
      <slot name="spinner">
        <!-- <spinner :spinner="spinner" /> -->
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="isNoResults">
      <slot name="no-results">No results :(</slot>
    </div>
    <div class="infinite-status-prompt" v-show="isNoMore">
      <slot name="no-more">No more data :)</slot>
    </div>
  </div>
</template>
<script>
   import { fromEvent } from 'rxjs';
   import {debounceTime} from 'rxjs/operators'
  /* eslint-disable no-console */
  //import Spinner from '../../node_modules/vue-infinite-loading/src/components/Spinner';
  export default {
  //  components:{spinner:Spinner},
    data(){
      return {
        sub:null,
        isLoading:false,
        isNoMore:false,
        isNoResults:false,
      }
    },
    props:{
      spinner:{
        type:String
      },
      distance:{
        type:Number,
        default:0
      }
    },
    methods:{

    },
    mounted(){
     
      this.sub = fromEvent(this.$el.parentNode,'scroll').pipe(debounceTime(300)).subscribe((n)=>{
      try {
        let distance = ~~(this.$el.getBoundingClientRect().bottom - this.$el.parentNode.getBoundingClientRect().bottom);
          console.log(distance)
          if ( distance <= this.distance){
              this.$emit('infinite',{
                  loaded: () => {
                    this.$emit('$InfiniteLoading:loaded', { target: this });
                  },
                  complete: () => {
                    this.$emit('$InfiniteLoading:complete', { target: this });
                  },
                  reset: () => {
                    this.$emit('$InfiniteLoading:reset', { target: this });
                  }
            })
          }
        }catch(e){}
      });

      this.$on('$InfiniteLoading:loaded', (ev) => {
        this.isFirstLoad = false;
        if (this.isLoading) {
          this.$nextTick(this.attemptLoad.bind(null, true));
        }
        if (!ev || ev.target !== this) {
          //console.warn(WARNINGS.STATE_CHANGER);
        }
      });
      this.$on('$InfiniteLoading:complete', (ev) => {
        this.isLoading = false;
        this.isComplete = true;
        // force re-complation computed properties to fix the problem of get slot text delay
        this.$nextTick(() => {
          this.$forceUpdate();
        });
        //this.scrollParent.removeEventListener('scroll', this.scrollHandler);
        if (!ev || ev.target !== this) {
         // console.warn(WARNINGS.STATE_CHANGER);
        }
      });

    },
    destroyed(){
      this.sub.unsubscribe()
    }
  }
</script>
<style lang="less" scoped>
  .spinner-wrapper {
    transition:.3s opacity linear;
  }
  @deep: ~'>>>';

  .infinite-loading-container {
    clear: both;
    text-align: center;
    @{deep} *[class^=loading-] {
      @size: 28px;
      display: inline-block;
      margin: 15px 0;
      width: @size;
      height: @size;
      font-size: @size;
      line-height: @size;
      border-radius: 50%;
    }
  }

  .infinite-status-prompt {
    color: #666;
    font-size: 14px;
    text-align: center;
    padding: 10px 0;
  }
</style>
