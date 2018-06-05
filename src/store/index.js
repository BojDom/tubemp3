import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex);


export function createStore () {
  return new Vuex.Store({
    state: {
      thumbnails:[],
      connState:false,
      isConnected:true,
      autoCompleteList:[],
      activeAudio:true,
      locale:'it',
      badgeVal:0,
      usr:{
        token:false
      }
    },
    actions,
    mutations,
    getters
  })
}