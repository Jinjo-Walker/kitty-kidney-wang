import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: sessionStorage.getItem("isLogin") || false,
    account: sessionStorage.getItem("account") || "",
    uid: -1,
    phone:-1,
    user_name: "",
    city:"上海",
    avatar:"",
    buy_kind:-1
  },
  mutations: {
    loginCheck(state, user) {
      state.isLogin = true;
      state.user_name = user.user_name;
      state.account = user.account;
      state.uid = user.id;
      state.phone = user.phone;
      state.avatar = user.avatar;
    }
  },
  actions: {
    // sLogin(context, form) {
    //   return new Promise((reslove, reject) => {
    //     Vue.prototype.$axios
    //       .post("login", `username=${form.username}&password=${form.password}`)
    //       .then(result => {
    //         if (result.data.code == 200) {
    //           context.commit('loginCheck', result.data.result);
    //           reslove(result.data.result);
    //         } else {
    //           reject(result.data.message);
    //         }
    //       });
    //   });
    // }
  },
  modules: {}
})