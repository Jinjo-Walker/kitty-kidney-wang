<template>
  <div class="DL">
    <van-nav-bar title left-text="返回" left-arrow @click-left="onClickLeft" />
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
            :class="{ disabled: !this.canClick }"
            round
            :block="true"
            type="default"
            :disabled="isChecked"
            color="linear-gradient(to right, #DF5FF1, #AE33CC)"
            @click="countDown"
            >{{ content }}
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
            id="TencentCaptcha"
            data-appid="2037762575"
            data-cbfn="callbackName"
            data-biz-state="data-biz-state"
            
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
      if (this.phone && this.password && this.check) {
        // 请求接口
        const api = "localhost:5050/user/account_login";
        // 请求入参
        const params = {
          account: this.phone,
          password: this.password,
        };
        console.log(1111, '111')
        this.axios
          .post(api, { ...params })
          .then((res) => {
            console.log("请求结果", res);
            // 请求成功
            if (res.code == 200) {
              console.log(res.result);
              // 针对登录的数据进行处理 然后进行跳转路由到首页
              return;
            }
            // 这里提示账号密码错误
          })
          .catch((err) => {
            // 请求报错
            console.log(err);
          });
        console.log("success");
      }
    },
    countDown() {
      if (!this.canClick) return;
      if (!this.check()) return;
      this.canClick = false;
      // 获取验证码的请求接口
      const api = "localhost:5050/user/yzm?phone=18651726785";
      const params = {
        phone: this.phone,
      };
      this.$axios
        .get(api)
        .then((res) => {
          // 请求成功
          if (res.code === 200) {
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
    //绑定一个事件
    change() {
      this.show = !this.show;
    },
    onClickLeft() {
      <router-link to="/mine" ></router-link>;
    },
  },
  mounted() {
    // console.log("测试");
    // alert("222");
  },
};
// 回调函数需要放在全局对象window下
window.callbackName = function (res) {
  // 返回结果
  // ret         Int       验证结果，0：验证成功。2：用户主动关闭验证码。
  // ticket      String    验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
  // CaptchaAppId       String    验证码应用ID。
  // bizState    Any       自定义透传参数。
  // randstr     String    本次验证的随机串，请求后台接口时需带上。
  console.log("callback:", res);
  // res（用户主动关闭验证码）= {ret: 2, ticket: null}
  // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
  if (res.ret === 0) {
    // 复制结果至剪切板
    let str = `【randstr】->【${res.randstr}】      【ticket】->【${res.ticket}】`;
    let ipt = document.createElement("input");
    ipt.value = str;
    document.body.appendChild(ipt);
    ipt.select();
    document.execCommand("Copy");
    document.body.removeChild(ipt);
    console.log(验证成功);
  }
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
</style>
