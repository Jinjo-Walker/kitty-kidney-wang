import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: sessionStorage.getItem("isLogin") || false,
    uid: sessionStorage.getItem("uid") || -1,
    phone: sessionStorage.getItem("phone") || -1,
    user_name: sessionStorage.getItem("user_name") || "用户名",
	money: sessionStorage.getItem("money") || 0,
    city: "定位中",
    center: [121.43692, 31.197348],
    avatar: sessionStorage.getItem("avatar") || "img/avatar/avatar_default.jpg",
    buy_kind: -1,
    pay_click: 0,
    coupon_from: "/",
    address_from: sessionStorage.getItem("address_from"),
    time:"",
    firstmenu:0,
    menu:JSON.parse(sessionStorage.getItem("menu")) || {
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
    list:JSON.parse(sessionStorage.getItem("list")) || [],
    arr:JSON.parse(sessionStorage.getItem("arr")) || [],
    AddressInfo: JSON.parse(sessionStorage.getItem("AddressInfo")) || {
      name: "",
      tel: "",
      addressDetail: "",
      areaCode: "",
    },
    popcount:0,
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
	  sessionStorage.setItem("money", user.money);
    },
    logout(state) {
      state.isLogin = false;
      state.user_name = "用户名";
      state.uid = -1;
      state.phone = -1;
      state.avatar = "img/avatar/avatar_default.jpg";
      sessionStorage.clear();
    }
  },
  actions: {},
  modules: {}
})