import Vue from 'vue'
import VueRouter from 'vue-router'
import { Lazyload } from 'vant';
Vue.use(Lazyload);

import Home from '../views/user/Home.vue'
import Order from '../views/user/Order.vue'
import Login from '../views/user/Login.vue'
import Coupon from '../views/user/Coupon.vue'
import Collapse from '../views/user/Collapse.vue'
import Member from '../views/user/Member.vue'
import ChangeInfo from '../views/user/ChangeInfo.vue'
import InfoCheck from '../views/user/InfoCheck.vue'
import Mine from '../views/user/Mine.vue'
import Form from '../views/user/Form.vue'
import Chart from '../views/user/Chart.vue'
import Pay from '../views/payment/Pay.vue'
import AddressList from '../views/payment/AddressList.vue'
import Address_add from '../views/payment/Address_add.vue'
import Address_add2 from '../views/payment/Address_add2.vue'
import AMap from '../views/payment/AMap.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/coupon',
    name: 'Coupon',
    component: Coupon
  },
  {
    path: '/collapse',
    name: 'Collapse',
    component: Collapse
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
  {
    path: '/form',
    name: 'Form',
    component:Form
  },
  {
    path: '/chart',
    component:Chart
  },
  {
    path: '/address_add',
    component:Address_add
  },
  {
    path: '/address_add2',
    component:Address_add2
  },
  {
    path: '/addressList',
    component:AddressList,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/pay',
    component:Pay
  },
  {
    path: '/amap',
    name: 'AMap',
    component: AMap
  },

]

const router = new VueRouter({
  mode:'history',
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  let islogin = sessionStorage.getItem("isLogin");
  if (to.path == "/login") {
    if (islogin) {
      next("/mine");
    } else {
      next();
    }
  } else if (to.path == "/change_info" || to.path == "/info_check" || to.path == "/coupon") {
    // requireAuth:可以在路由元信息指定哪些页面需要登录权限
    if (islogin) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
})

export default router
