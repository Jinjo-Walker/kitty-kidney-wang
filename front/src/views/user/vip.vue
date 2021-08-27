<template>
  <div class="vip">
    <van-nav-bar
      title="大会员"
    />
    <div class="cover_box"></div>
    <div class="vip_tx">
      <div class="TX"></div>
      <p class="TX_P">张三</p>
    </div>

    <span class="SP">我的会员</span> <span>会员积分</span>
    <van-divider />
    <van-progress
      pivot-text="321"
      color="#ae33cc"
      :percentage="50"
      stroke-width="10"
    />
    <p>我的特权</p>
    <div class="box">
      <div class="box_item">
        <van-icon name="img/banner/TBsw.png" size="4em" /> <p>免费试吃</p>
      </div>
      <div class="box_item">
        <van-icon name="img/banner/TBlw.png" size="4em" /> <p>积分兑换</p>
      </div>
      <div class="box_item">
        <van-icon name="img/banner/TBrx.png" size="4em" />
        <p>身份铭牌</p>
      </div>
    </div>
    <tabbar/>
  </div>
</template>
<script>
import tabbar from "@/components/user/Tabbar";
export default {
  data() {
    return {};
  },
  methods: {
  },
  components:{
    tabbar
  }

};
</script>
<style scoped>
.vip /deep/ .van-nav-bar__left .van-icon,
.vip /deep/ .van-nav-bar__left .van-nav-bar__text,
.vip /deep/ .van-nav-bar__right {
  color: #000 !important;
}

.cover_box {
  background-image: url("/img/banner/2.jpg");
  height: 10rem;
  width: 100%;
  /* border: 1px solid;
  border-radius: 20px; */
  background-repeat: no-repeat;
  background-size: 30rem;
  background-origin: right;
}
.TX {
  background-image: url("/img/banner/tx.jpg");
  width: 5rem;
  height: 5rem;
  border: 1px solid;
  border-radius: 50%;
  background-size: cover;
  position: absolute;
}
.vip_tx {
  float: left;
  height: 7rem;
  width: 90%;
  vertical-align: middle;
  margin: 0 1rem;
}
.vip_tx .TX_P {
  width: 200px;
  margin-left: 6rem;
  display: block;
  line-height: 5rem;
}
.SP {
  margin-left: 20px;
  margin-right: 12rem;
}
.box :after {
  display: block;
  height: 0;
  clear: both;
}
.box_item {
  width: 31%;
  float: left;
  text-align: center;
  padding: 40px 0 60px 0;
}
.vip p{
  margin-left: 10px;
}
</style>
