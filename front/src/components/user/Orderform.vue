<template>
  <div class="order">
    <div class="order_top">
      <div class="order_img"><img src="/img/banner/icon3.png" alt="" /></div>
      <div class="commodity">
        <ul>
          <li><span>望京小腰</span></li>
          <li><span>2021/02/17 11:04</span></li>
          <li><span>龙虾...等2件商品</span></li>
        </ul>
      </div>
      <div class="details">
        <ul>
          <li>已送达</li>
          <li>￥100.9</li>
          <li><button class="btn1">删除订单</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.order {
  //   line-height: 160%;
  //   display: flex;
  //   align-items: center;
  background-color: #ffff;
  border-radius: 10px;
  margin: 12px 12px 0 12px;
  //   display: flex;
  //   justify-content: space-between;
  .order_top {
    display: flex;
    justify-content: space-between;
  }
  .order_img{
    padding: 10px 0 0 15px;
  }
  .commodity{
    padding: 10px 60px 0 0;
  }
  .details{
   padding-right: 15px;
  }
  .details ul li {
    text-align: right;
  }

  .commodity ul :nth-last-child(3) {
    font-size: 20px;
    font-weight: bold;
  }
  .commodity ul :nth-last-child(2) {
    font-size: 5px;
    color: grey;
  }
  .commodity ul :nth-child(3) {
    font-size: 10px;
    padding-top: 15px;
  }
  .details ul :nth-last-child(3) {
    font-size: 10px;
    color: rgb(209, 144, 23);
    padding-top: 15px;
  }
  .details ul :nth-last-child(2){
    padding-top:29px;

  }
  .details .btn1 {
    border-radius: 20px;
    height: 33px;
    width: 95px;
    border: 1px solid grey;
    margin: 15px 0 10px 0;
    background-color: #ffff;
  }
}
</style>