<template>
  <div class="DL">
    <van-nav-bar
      title
      left-text="返回"
      left-arrow
      @click-left="onClickLeft('/mine')"
    />
    <!-- DX短信 -->
    <van-cell-group class="DX">
      <h2>欢迎登录望京小腰</h2>

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
      <van-field
        v-if="show"
        clearable
        v-model.trim="messageCheck"
        :rules="[
          { validator: false, message: '请输入正确内容', trigger: 'onBlur' },
        ]"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
            size="small"
            :block="true"
            type="default"
            @click="countDown"
            >{{ content }}
          </van-button>
        </template>
      </van-field>
      <div v-if="show">
        <van-divider
          :style="{
            color: '#808080',
            borderColor: '#808080',
            padding: '0 16px',
          }"
        />
        <p style="color: #808080; font-size: 14px">
          未注册的手机号验证后自动创建望京小腰账号
        </p>
        <div class="checkbox">
          <input
            type="checkbox"
            id="cbox1"
            name="cbox"
            value="cbox"
            @change="checkboxChange($event)"
          />
          我已阅读并同意《望京小腰用户协议》、《隐私政策》，并授权望京小腰使用该账号信息（如昵称。头像、收货地址）进行统一管理。
        </div>
        <div class="btn">
          <van-button
            class="button"
            :class="{ disabled: !this.canClick }"
            round
            :block="true"
            type="default"
            :disabled="isChecked"
            color="linear-gradient(to right, #DF5FF1, #AE33CC)"
            @click="login"
          >
            验证码登录
          </van-button>
        </div>
      </div>
      <div v-else>
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
          我已阅读并同意《望京小腰用户协议》、《隐私政策》，并授权望京小腰使用该账号信息（如昵称。头像、收货地址）进行统一管理。
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
    <!-- 点击切换 -->
    <span @click="change" class="change">{{
      show ? "密码登录" : "验证码登录"
    }}</span>

    <router-link to="/Collapse" class="router-link">遇到问题</router-link>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      phone: "",
      msg: "",
      name: "", //双项数据绑定
      nameState: "",
      password: "",
      pwdState: "",
      content: "获取短信验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: true,
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
      showKeyboard: true,
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
    // 短信验证码的校验
    smsValidator(val) {
      return val.length === 4;
    },
    login() {
      // 判断条件是否输入完整

      const isComplete = !this.show
        ? !this.phone || !this.passwordmsg || this.isChecked
        : !this.phone || !this.messageCheck || this.isChecked;
      console.log(isComplete);
      if (isComplete) {
        return;
      }
      // 请求接口
      const api = this.show ? "/user/phone_login" : "/user/account_login";
      if (
        api == "/user/account_login" ||
        (api == "/user/phone_login" &&
          this.messageCheck == this.messageIn &&
          this.messageIn != -1)
      ) {
        // 请求入参
        const params = this.show
          ? {
              phone: this.phone,
            }
          : {
              account: this.phone,
              password: this.value,
            };
        this.axios
          .post(api, { ...params })
          .then((res) => {
            const { code, result } = res.data;
            console.log("请求结果", res);
            // 请求成功
            if (code == 200) {
              console.log(result[0]);
              this.$store.commit("loginCheck", result[0]);
              Toast.success("登录成功");
              // 针对登录的数据进行处理 然后进行跳转路由到首页
              this.$router.push("/");
            }
            // 这里提示账号密码错误 或者 验证码错误
          })
          .catch((err) => {
            // 请求报错
            console.log(err);
          });
      } else {
        console.log(this.show, api, this.phone, this.value);
        Toast.fail("验证码或密码不正确");
      }
    },
    countDown() {
      if (!this.canClick) return;
      if (!this.check()) return;
      this.canClick = false;
      // 获取验证码的请求接口
      const api = `/user/yzm?phone=${this.phone}`;
      this.axios
        .get(api)
        .then((res) => {
          // 请求成功
          if (res.data.code === 200) {
            this.messageIn = res.data.yzm;
            // 请求成功以后做出 获取验证码成功提示
            this.content = this.totalTime + "s后重新发送";
            let clock = window.setInterval(() => {
              this.totalTime--;
              this.content = this.totalTime + "s后重新发送";
              if (this.totalTime < 0) {
                window.clearInterval(clock);
                this.content = "重新发送验证码";
                this.totalTime = 10;
                this.canClick = true; //这里重新开启
                this.messageIn = -1;
              }
            }, 1000);
            return;
          }
          // 此处进行请求失败的提示
        })
        .catch((err) => {
          // 这里是请求发生错误的
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
      btndocument.getElementsByClassName(
        "button"
      ).disabled = !document.getElementById("cbox").checked;
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
    //绑定一个事件
    change() {
      this.show = !this.show;
      // 切换的时候记得清空密码或者验证码
      if (this.show) {
        this.value = "";
      } else {
        this.messageCheck = "";
      }
    },
    onClickLeft(path) {
      this.$router.replace(path);
    },
  },
  mounted() {
    // console.log("测试");
    // alert("222");
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
