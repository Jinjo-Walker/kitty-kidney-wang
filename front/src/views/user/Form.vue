<template>
  <div class="form">
    <div>
      <van-nav-bar left-text="返回" left-arrow class="a"> </van-nav-bar>
    </div>
    <div>
      <van-tabs v-model="activeName">
        <van-tab title="外卖订单" name="order">
          <orderform />
        </van-tab>
        <van-tab title="待评价" name="evaluate"></van-tab>
        <van-tab title="退款" name="refund"></van-tab>
      </van-tabs>
    </div>
    <div><tabbar /></div>
  </div>
</template>

<script>
import tabbar from "@/components/user/Tabbar";
import orderform from "@/components/user/Orderform";
export default {
  data() {
    return {
      activeName: "order",
    };
  },

  mounted() {},

  methods: {},
  components: {
    tabbar,
    orderform,
  },
};
</script>

<style lang="scss" scoped>
.form {
  background-color: #f6f6f6;
  height: 100vh;
  .a {
    color: plum !important;
    // background: plum;
  }
}
</style>