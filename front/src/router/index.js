import Vue from 'vue'
import VueRouter from 'vue-router'
import { Lazyload } from 'vant';
Vue.use(Lazyload);

import views from '../views/user/views.vue'
import Home from '../views/user/Home.vue'
import Order from '../views/user/Order.vue'
import Ordered from '../views/user/Ordered.vue'
import Login from '../views/user/Login.vue'
import Coupon from '../views/user/Coupon.vue'
import Register from '../views/user/Register.vue'
import Collapse from '../views/user/Collapse.vue'
import Introduction from '../views/user/Introduction.vue'
import Member from '../views/user/Member.vue'
import ChangeInfo from '../views/user/ChangeInfo.vue'
import InfoCheck from '../views/user/InfoCheck.vue'
import Mine from '../views/user/Mine.vue'


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
    component: Home
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/ordered',
    component: Ordered
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
    path: '/mine',
    name: 'mine',
    component: Mine
  },
  {
    path: '/change_info',
    name: 'changeInfo',
    component: ChangeInfo
  },
  {
    path: '/info_check',
    name: 'infoCheck',
    component: InfoCheck
  },
  {
    path: '/member',
    name: 'Member',
    component: Member
  },

]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
