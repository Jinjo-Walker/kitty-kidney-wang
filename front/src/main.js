import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
// 引入全部样式
import 'vant/lib/index.css'
import Vue from 'vue'
import App from './App.vue'
// 引入商品卡片组件
import Card from './components/user/Card.vue'
// 引入底部商品卡片组件
import Dcard from './components/user/Dcard.vue'
import router from './router'
import store from './store'

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import moment from "moment"
Vue.prototype.moment = moment;

Vue.use(Vant)

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.component('my-card', Card)

Vue.component('my-dcard', Dcard)

axios.defaults.baseURL = "http://localhost:5050";
Vue.prototype.axios = axios;
new Vue({
  router,
  moment,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')