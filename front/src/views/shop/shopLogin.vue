<template>
  <div class="DL">
    <van-nav-bar
      title
      left-text="返回"
      left-arrow
      @click-left="$router.push('/mine')"
    />
    <!-- DX短信 -->
    <van-cell-group class="DX">
      <h2>欢迎登录望京小腰商户版</h2>

      <van-field
        v-model="phone"
        placeholder="请输入手机号"
        label="+86  >"
        type
        :border="bordervalue"
        required
        :state="nameState"
        @blur="check"
        :error-message="msg"
        @input="checkphone"
      />

      <div>
        <van-password-input
          :value="value"
          info="密码为 6 位数字"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
          @input="checkpassword"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
        <div class="checkbox">
          <input
            type="checkbox"
            id="cbox"
            name="cbox"
            value="cbox"
            @change="checkboxChange($event)"
          />
          我已阅读并同意《望京小腰商户协议》。
        </div>
        <div class="btn">
          <van-button
            class="button"
            round
            block
            type="default"
            color="linear-gradient(to right, #DF5FF1, #AE33CC)"
            @click="login"
            :class="{ grey: !check }"
            :disabled="isChecked"
            >点击登陆
          </van-button>
        </div>
      </div>
    </van-cell-group>

    <span class="change">{{ "忘记密码？" }}</span>

    <router-link to="/Collapse" class="router-link">遇到问题</router-link>
  </div>
</template>
<script>
import { Toast } from "vant";
import { shop_login } from "@/api/shop_axios.js";

export default {
  data() {
    return {
      phone: "",
      msg: "",
      nameState: "",
      password: "",
      pwdState: "",

      bordervalue: true,
      //添加canClick
      // _clearable: true,   //启用清除控件
      // get clearable() {
      //   return this._clearable;
      // },
      // set clearable(value) {
      //   this._clearable=value;
      // },
      value: "",
      showKeyboard: false,
      isChecked: true,
      show: true,
      passwordmsg: true,
      // 短信验证码
      messageCheck: "",
      messageIn: -1,
      // 数字键盘验证码
      messageKey: false,
    };
  },
  methods: {
    checkphone() {
      if (!this.phone) {
      } else {
        this.phonemsg = "";
      }
    },
    checkpassword() {
      if (!this.password) {
      } else {
        this.passwordmsg = "";
      }
    },

    login() {

      // 判断条件是否输入完整
       const isComplete = !this.phone || !this.passwordmsg || this.isChecked;
      if (isComplete) {
        return;
      }
      // 请求接口
      shop_login(`account=${this.phone}&password=${this.value}`)
        .then((res) => {
          const { code, result } = res;
          console.log("请求结果", res);
          // 请求成功
          if (code == 200) {
            console.log(result[0]);
            // this.$store.commit("loginCheck", result[0]);
            Toast.success("登录成功");
            // 针对登录的数据进行处理 然后进行跳转路由到首页
            this.$router.push("/merchant");
          } else {
            Toast.fail("密码不正确");
          }
          // 这里提示账号密码错误 或者 验证码错误
        })
        .catch((err) => {
          // 请求报错
          console.log(err);
        });
    },

    check() {
      let reg = /^1[3-9]\d{9}$/;
      if (reg.test(this.phone)) {
        this.msg = "";
        return true;
      } else {
        this.msg = "手机号码格式错误";
        return false;
      }
    },
    // 判断input是否被选中
    cbox() {
      btndocument.getElementsByClassName("button").disabled =
        !document.getElementById("cbox").checked;
    },

    // 更改复选框值
    checkboxChange(value) {
      this.isChecked = !value.target.checked;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
  },
};
</script>
<style scoped>
.button {
  margin: 20px 0;
}

.DL .DX {
  margin: 30px;
  text-align: center;
}

.checkbox {
  padding: 10px;
  color: #808080;
  font-size: 10px;
}

.DX h2 {
  text-align: left;
  margin-left: 15px;
}

.DL .QH {
  margin-right: 140px;
  font-size: 14px;
}

.btn {
  padding: 13px;
}

.change {
  margin-right: 140px;
  margin-left: 50px;
  color: #808080;
}

.router-link {
  color: #808080;
}

.DL /deep/ .van-nav-bar__left .van-icon,
.DL /deep/ .van-nav-bar__left .van-nav-bar__text {
  color: #000 !important;
}
</style>
