<template>
  <div class="form">
    <div>
      <van-nav-bar title="订单"> </van-nav-bar>
    </div>
    <div>
      <van-tabs v-model="activeName">
        <van-tab title="外卖订单" name="order">
          <orderform
            v-for="(item, index) in order"
            :key="index"
            :order_one="item"
            :picAll="img[index]"
            :show="show"
          />
        </van-tab>
        <van-tab title="待评价" name="evaluate"></van-tab>
        <van-tab title="退款" name="refund"></van-tab>
      </van-tabs>
    </div>
    <div><tabbar /></div>
<van-empty
      class="custom-image none"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="空空如也"
      v-show="!order"
    />
  </div>
</template>

<script>
import { order_info, orderMenu_info } from "@/api/order_axios.js";
import tabbar from "@/components/user/Tabbar";
import orderform from "@/components/user/Orderform";
export default {
  data() {
    return {
      order: [],
      img: [],
      activeName: "order",
    };
  },

  created() {
    this.show();
  },

  methods: {
    show(){
      order_info(this.$store.state.uid).then((res) => {
      this.order = res.result;
      // console.log(this.order);
      if (this.order) {
      for (var i of this.order) {
        orderMenu_info(i.orderid).then((res) => {
          this.img.push(res.result);
          // console.log(this.img);
        });
      }
      }
    });
    },
  },
  components: {
    tabbar,
    orderform,
  },
};
</script>

<style lang="scss" scoped>
.form {
  background-color: #f6f6f6;
  // height: 100vh;
  margin-bottom: 50px;
  overflow-y: auto;
.none{
    height: 32.8125rem;
  }
}
</style>
