import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

// 引入底部导航栏组件
import Tabbar from './components/Tabbar.vue'
Vue.component('my-tabbar',Tabbar)

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')