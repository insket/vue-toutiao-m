import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock'

//加载vant组件库
import Vant from 'vant';
//加载vant组件库样式
import 'vant/lib/index.css';
//全局注册vant中的组件
Vue.use(Vant);

//自动设置rem基准值（html标签字体大小）
import 'amfe-flexible'

import './utils/dayjs'

import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
