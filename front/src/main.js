import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios"
Vue.prototype.$axios = axios

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

// 引入底部导航栏组件
import tabbar from './components/user/tabbar.vue'
Vue.component('my-tabbar',tabbar)

// 引入商品卡片组件
import Card from './components/user/Card.vue'
Vue.component('my-card',Card)

// 引入底部商品卡片组件
import Dcard from './components/user/Dcard.vue'
Vue.component('my-dcard',Dcard)

// 引入全局resetui组件
import "./assets/resetui.scss"


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
