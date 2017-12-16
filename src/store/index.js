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
      isConnected:false,
      autoCompleteList:[],
      locale:'it',
      usr:{
        token:false
      }
    },
    actions,
    mutations,
    getters
  })
}