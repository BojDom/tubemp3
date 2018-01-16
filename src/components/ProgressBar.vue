<!-- borrowed from Nuxt! -->

<template>
  <div id="ccc"></div>
</template>

<script>

import p from 'progressbar.js'
export default {
  name:'progressbar',
  props:{
    value:{
      type:Number,
      default:0
    },
    text:{
      type:String
    }
  },
  data(){
    return {
      circle:null
    }
  },
  mounted(){
    this.circle= new p.Circle('#ccc',{
      strokeWidth: 20,
      color: '#eee',
      trailColor: '#777',
      trailWidth: 2,
      duration: 1400,
      from: {color: '#FF0000'},
      to: {color: '#00FF00'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        var value = Math.round(bar.value() * 100);
        if (value === 0) {
          bar.setText('0 %');
        } else {
          bar.setText(value);
        }

        bar.text.style.color = state.color;
      }
    })
    this.$watch('value',(v)=>{
      this.circle.set(v/100)
      this.circle.setText(v + ' %')
    })
  }

}
</script>

<style scoped>


</style>
