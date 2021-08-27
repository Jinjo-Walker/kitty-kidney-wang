<template>
  <div class="htmls">
    <!-- 页头 -->
    <van-nav-bar
      class="title"
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      style="background-color: #0baff0"
      fixed
    />
    <!-- 用户收货信息 -->
    <van-tabs class="tabss">
      <van-cell
        class="cells"
        :title="
          `${$route.query.address ? $route.query.address : '请选择收货地址'}`
        "
        icon="location-o"
        is-link
        @click="onclick"
      />
      <van-cell
        class="cellss"
        :title="
          `${
            $route.query.name + $route.query.tel
              ? $route.query.name + ' ' + $route.query.tel
              : ''
          }`
        "
        icon="phone-o"
        @click="onclick"
      />
      <!-- 时间 -->
      <van-cell
        is-link
        @click="showPopup"
        title="立即送出"
        :value="this.$store.state.time"
      >
      </van-cell>
      <van-popup v-model="show1" position="bottom" :style="{ height: '34%' }">
        <!-- <van-datetime-picker
        @confirm="click"
        @cancel="cancel"
        type="time"
        title="预约送达时间"
        :min-hour=this.nowDateH
        :min-minute=this.nowDateM
        :max-hour="22"
      /> -->
        <div class="txt">预约送达时间</div>
        <el-time-select class="time_s"
          v-model="value"
          :picker-options="{
            start: this.nowDate,
            step: '00:20',
            end: '23:30',
          }"
          placeholder="选择时间"
          size="medium"
          align="right"
          :clearable="false"
          @change="change"
          @focus="myfocus"
          :editable="false"
        >
        </el-time-select>
      </van-popup>
    </van-tabs>

    <!-- 订单列表 -->
    <div class="cardss">
      <van-card
        v-for="(item, i) in list"
        :key="i"
        :num="item.count"
        :price="item.price"
        :title="item.cname"
        :thumb="`http://${item.picture}`"
      >
      </van-card>
    </div>
    <!-- 商品提交订单栏 -->
    <van-goods-action class="bars">
      <van-goods-action-icon :text="`合计: ￥${price}`" class="barss" />
      <van-goods-action-button text="去结算" @click="onSubmit" />
    </van-goods-action>
    <!-- 遮罩 -->
    <van-overlay :show="show" @click="show1 = false">
      <div class="wrapper" @click.stop></div>
    </van-overlay>
    <!-- 密码输入框 -->
    <van-action-sheet v-model="show">
      <div class="content">
        <van-password-input
          :value="value2"
          :focused="showKeyboard"
          gutter="20px"
          info="请输入支付密码"
          @focus="showKeyboard = true"
          :length="6"
        />
        <!-- 键盘 -->
        <van-number-keyboard v-model="value2" :show="showKeyboard" />
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { order_add } from "@/api/order_axios.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      show1: false,
      editable:false,
      value: '',
      value2: "",
      focused: false,
      showKeyboard: true,
      currentData: [],
      nowDate: "", // 当前日期
      list: this.$store.state.arr,
    };
  },
  computed: {
    // 计算订单商品价格
    price: function() {
      var total_prc = 0;
      for (var i in this.$store.state.menu) {
        for (var j of this.$store.state.menu[i]) {
          if (j.count != 0) {
            // 计算已选商品总价
            total_prc += new Number((j.count * j.price).toFixed(1));
            // 保留一位有效数字
            total_prc = Math.round(total_prc * 100) / 100;
          }
        }
      }
      return total_prc;
    },
  },

  methods: {
    //预约时间选择
    change(value){
      this.$store.state.time = value;
      this.show1 = false;
    },
    // myfocus(value){
    //   this.$store.state.time = value;
    //   this.show1 = false;
    // },
    showPopup() {
      this.show1 = true;
    },
    // 地址点击跳转
    onclick() {
      this.$router.replace({ path: "/addressList" });
      this.$store.state.address_from = "/pay";
    },

    // 点击结算显示弹框
    onSubmit() {
      if (this.$store.state.pay_click == 1) {
        this.show = true;
      }
    },
    // 点击页头返回到商品列表
    onClickLeft() {
      this.$router.push({ path: "/order" });
    },
    currentTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      if (minute + 40 < 60) {
        minute = minute + 40;
      } else if (minute + 40 > 60) {
        minute = minute - 20;
        hour = hour + 1;
      }
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = ` ${hour}:${minute}`;
    },
  },

  watch: {
    //密码
    value2(value) {
      if (value.length === 6 && value !== "123456") {
        this.value2 = "";
        Toast({
          message: "密码错误",
          icon: "cross",
        });
      } else if (value.length === 6 && value === "123456") {
        sessionStorage.removeItem("arr");
        sessionStorage.removeItem("menu");
        let str = "";
        for (let a of this.$store.state.arr) {
          if (
            this.$store.state.arr.indexOf(a) !=
            this.$store.state.arr.length - 1
          ) {
            str += `${a.cid},${a.count},${a.price}|`;
          } else {
            str += `${a.cid},${a.count},${a.price}`;
          }
        }
        order_add(
          `id=${this.$store.state.uid}&total=${this.price}&str=${str}`
        ).then((res) => {
          // console.log(res);
        });

        this.$store.state.arr = [];
        for (var i in this.$store.state.menu) {
          for (var j of this.$store.state.menu[i]) {
            j.count = 0;
          }
        }
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "支付中...",
        });
        let second = 1;
        const timer = setInterval(() => {
          second--;
          if (second) {
          } else {
            clearInterval(timer);
            // 手动清除 Toast
            Toast.clear(
              Toast({
                message: "支付成功",
                icon: "success",
              }),
              this.$router.replace({ path: "/form" })
            );
          }
        }, 1000);
      }
    },
  },
  mounted() {
    this.currentTime();
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  },
  created(){
    this.$store.state.time="";
  }
};
</script>

<style lang="scss">
van-overlay {
  position: relative;
}
.content {
  padding: 16px 16px 280px;
}

.wrapper {
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}

.title ::before {
  color: white;
}
.title .van-nav-bar__title {
  color: white;
  font-size: 20px;
}
.title .van-nav-bar__content {
  height: 50px;
}
.title .van-nav-bar__text {
  color: white;
}
.tabss .van-tabs__line {
  display: none;
}
.tabss .van-tab {
  border-bottom: 2px solid black;
}
.tabss .van-tabs__nav {
  height: 0px;
  border-radius: 10px;
}

.tabss .van-tab__pane {
  text-align: left;
}
.tabss .van-tabs__content {
  margin: 0px 10px 30px 10px;
}

.tabss .van-tabs__content .van-cell:nth-child(3) {
  border-radius: 0px 0px 10px 10px;
}
.tabss .van-cell--clickable:nth-child(1) {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 550;
  color: black;
  border-radius: 10px 10px 0px 0px;
}
div .cellss span {
  font-size: 14px;
  color: #9b9b9b;
}
.cardss {
  margin-bottom: 55px;
  position: relative;

  .van-card {
    font-size: 15px;
    height: 65px;
    margin: 5px 10px 0px 10px;
    border-radius: 10px;
  }
  .van-card__thumb {
    height: 50px;
  }
  .van-card__price {
    font-size: 16px;
    position: absolute;
    bottom: 25%;
  }
  .van-card__desc {
    font-size: 8px;
  }
  .van-card__title {
    text-align: left;
  }
  .van-card__desc {
    text-align: left;
  }
  .van-card__content {
    min-height: 70px;
  }
  .van-card__num {
    position: absolute;
    right: 0%;
    bottom: 25%;
  }
}

.bars .van-goods-action-button {
  background-image: linear-gradient(to right, #5acefc, #0baff0);
}
.bars .van-button--default {
  color: white;
  font-size: 15px;
}
.bars .van-goods-action-icon {
  width: 40%;
  color: #0baff0;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  margin: 0px 50px 0px 50px;
  background-color: #f3f3f3;
}

.bars {
  background-color: #f3f3f3;
}
div .van-password-input__security li {
  border: 1px solid #e0e0e0;
}
div .van-button .button_pay {
  width: 40px;
}
div .txt{
  text-align: center;
}
div .time_s .el-input{
  margin-left: 50%;
}
div .el-input__inner{
  text-align: center;
}
div .time-select-item{
  text-align: center;
}
div .el-date-editor.el-input, .el-date-editor.el-input__inner{
  text-align: center;
  width: 100%;
}
.htmls {
  height: 100%;
  background-image: linear-gradient(#0baff0,#ffffff );
}
</style>
