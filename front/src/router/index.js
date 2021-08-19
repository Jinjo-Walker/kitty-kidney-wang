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
import Form from '../views/user/Form.vue'
import Pay from '../views/payment/Pay.vue'
import AddressList from '../views/payment/AddressList.vue'
import Address_add from '../views/payment/Address_add.vue'
import Address_add2 from '../views/payment/Address_add2.vue'

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
  {
    path: '/form',
    name: 'Form',
    component:Form
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
  let islogin = sessionStorage.getItem("islogin");
  islogin = Boolean(Number(islogin));
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
