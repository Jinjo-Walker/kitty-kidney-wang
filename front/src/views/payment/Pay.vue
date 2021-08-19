<template>
  <div class="htmls">
    <van-nav-bar
      class="title"
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      style="background-color: #ae57a4"
      fixed
    />
    <van-tabs class="tabss">
      <van-cell
        class="cells"
        :title="`${
          $route.query.address ? $route.query.address : '请选择收货地址'
        }`"
        icon="location-o"
        is-link
        to="addressList"
      />
      <van-cell
        class="cellss"
        :title="`${
          $route.query.name + $route.query.tel
            ? $route.query.name + ' ' + $route.query.tel
            : ''
        }`"
        icon="phone-o"
        to="addressList"
      />

      <van-cell title="立即送出">
        <div>大约{{ nowDate }} 送达</div>
      </van-cell>
    </van-tabs>

    <div class="cardss">
      <van-card
        v-for="(item, i) in list"
        :key="i"
        :num="item.num"
        :price="item.price"
        :title="item.title"
        :thumb="item.thumb"
      >
      </van-card>
    </div>
    <van-submit-bar
      class="bars"
      :price="11800"
      button-text="提交订单"
      @submit="onSubmit"
    />

    <van-overlay :show="show" @click="show1 = false">
      <div class="wrapper" @click.stop></div>
    </van-overlay>
    <!-- 密码输入框 -->
    <van-action-sheet v-model="show">
      <div class="content">
        <van-password-input
          :value="value"
          :focused="showKeyboard"
          gutter="20px"
          info="请输入支付密码"
          @focus="showKeyboard = true"
          :length="6"
        />
        <!-- 键盘 -->
        <van-number-keyboard v-model="value" :show="showKeyboard" />
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      show: false,
      value: "",
      focused: false,
      showKeyboard: true,
      currentData: [],
      nowDate: "", // 当前日期
      list: [
        {
          num: "8",
          price: "6.00",
          title: "招牌小腰",
          thumb:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181201%2F957283799ee944e9adf3396511db2670.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631345478&t=fb8ab12095c57d4a9f9684cd1fdd592d",
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    };
  },

  methods: {
    onSubmit() {
      this.show = true;
    },
    onEdit() {
      Toast("编辑");
    },
    onClickLeft() {
      this.$router.replace({ path: "/index" });
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
    value(value) {
      if (value.length === 6 && value !== "123456") {
        this.value = "";
        Toast({
          message: "密码错误",
          icon: "cross",
        });
      } else if (value.length === 6 && value === "123456") {
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
              this.$router.replace({ path: "/" })
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
.tabss .van-cell--clickable {
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
  position: relative;
  .van-card {
    font-size: 15px;
    height: 65px;
    margin: 20px 10px 0px 10px;
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
  .van-card__num{
    position: absolute;
    right:0%;
    bottom: 25%;
  }
}

.bars .van-submit-bar__bar {
  background-color: #ae57a4;
  height: 60px;
}

.bars .van-submit-bar__price {
  color: white;
  text-align: left;
  font-size: 20px;
}
.bars .van-submit-bar__text {
  color: white;
  text-align: left;
  font-size: 20px;
  font-weight: 500;
}
div .van-password-input__security li {
  border: 1px solid #e0e0e0;
}
.htmls {
  background-image: linear-gradient(#ae57a4, #ffffff);
}
</style>