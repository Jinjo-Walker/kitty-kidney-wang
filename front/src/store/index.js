import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: sessionStorage.getItem("isLogin") || false,
    uid: sessionStorage.getItem("uid") || -1,
    phone: sessionStorage.getItem("phone") || -1,
    user_name: sessionStorage.getItem("user_name") || "用户名",
    city: "上海",
    avatar: sessionStorage.getItem("avatar") || "img/avatar/avatar_default.jpg",
    buy_kind: -1,
    pay_click:0,
    coupon_from: "/",
    list: [{
        id: "1",
        name: "张三",
        tel: "13782221981",
        address: "上海市徐汇区汇银广场北楼707室",
      },
      {
        id: "2",
        name: "李四",
        tel: "13100000001",
        address: "上海市黄浦区xx第一中学小学",
      },
    ],
    menu: {
      '素菜': [],
      '荤菜': [],
      '牛羊肉': [],
      '猪肉': [],
      '海鲜': [],
      '烤鱼': [],
      '牛蛙': [],
      '鸡鸭肉': [],
      '饮料': [],
      '酒水': [],
    },
    arr: [],
    AddressInfo: {
      name: "",
      tel: "",
      addressDetail: "",
      areaCode: "",
    }
  },
  mutations: {
    loginCheck(state, user) {
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("user_name", user.user_name);
      sessionStorage.setItem("uid", user.id);
      sessionStorage.setItem("phone", user.phone);
      sessionStorage.setItem("avatar", user.avatar);
      state.isLogin = true;
      state.user_name = user.user_name;
      state.uid = user.id;
      state.avatar = user.avatar;
      state.phone = user.phone;
    },
    logout(state) {
      state.isLogin = false;
      state.user_name = "用户名";
      state.uid = -1;
      state.phone = -1;
      state.avatar = "img/avatar/avatar_default.jpg";
    }
  },
  actions: {},
  modules: {}
})