<template>
  <div class="DL">
    <van-nav-bar
      title
      left-text="返回"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
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
      <div v-if="show">
        <van-divider
          :style="{
            color: '#808080',
            borderColor: '#808080',
            padding: '0 16px',
          }"
        />
        <p style="color: #808080; font-size: 14px; ">
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
            >{{ content }}</van-button
          >
        </div>
      </div>
      <div v-else>
        <van-password-input
        v-model="password"
          :value="value"
          info="密码为 6 位数字"
          :focused="showKeyboard"
          :error-message="passwordmsg"
          @focus="showKeyboard = true"
          @input="checkpassword"
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
            :class="{grey: !check}"
            >点击登陆</van-button
          >
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
    import axios from "axios";
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
      isChecked: false,
      show: true,
    };
  },
  methods: {
    checkphone () {
      if (!this.phone) {
        
      } else {
        this.phonemsg = ''
      }
    },
    checkpassword () {
      if (!this.password) {
        
      } else {
        this.passwordmsg = ''
      }
    },
    login () {
      if (this.phone && this.password && this.check) {
        console.log('success')
      }
    },
    countDown() {
      if (!this.canClick) return;
      if (!this.check()) return;
      this.canClick = false;
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
      this.isChecked = value;
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
    onClickLeft() {},
    onClickRight() {},
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
</style>
  