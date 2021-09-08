import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getItem('user')     //当前登录用户的token等数据
  },
  mutations: {
    setUser(state,data){
      state.user = data
      //为了防止页面是依据丢失，把数据放到本地存储中
      // window.localStorage.setItem('user',JSON.stringify(this.state.user))
      setItem('user',state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
