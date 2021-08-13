import Vue from 'vue'
import VueRouter from 'vue-router'
import { Lazyload } from 'vant';
Vue.use(Lazyload);

import views from '../views/user/views.vue'
import index from '../views/user/index.vue'
import Order from '../views/user/Order.vue'
import Login from '../views/user/Login.vue'
import Coupon from '../views/user/Coupon.vue'
import Register from '../views/user/Register.vue'
import Collapse from '../views/user/Collapse.vue'
import Introduction from '../views/user/Introduction.vue'

import vantab from '../test/vantab.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/views',
    name: 'views',
    component: views
  },
  {
    path: '/',
    name: 'home',
    component: index
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/coupon',
    name: 'Coupon',
    component: Coupon
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/collapse',
    name: 'Collapse',
    component: Collapse
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: Introduction
  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/vantab',
    component:vantab
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
