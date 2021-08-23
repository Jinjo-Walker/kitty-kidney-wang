<template>
  <div>
      <van-tabbar v-model="active" fixed>
      <van-tabbar-item id="box" to="/" name="home">
        首页
        <img slot="icon" src="/img/banner/home.svg" />
      </van-tabbar-item>
      <van-tabbar-item to="/vip" name="vip">
        会员
        <img slot="icon" src="/img/banner/VIP.svg" />
      </van-tabbar-item>
      <van-tabbar-item to="/form" name="form">
        订单
        <img slot="icon" src="/img/banner/dingdan.svg" />
      </van-tabbar-item>
      <van-tabbar-item to="/mine" name="mine">
        我的
        <img slot="icon" src="/img/banner/mine.svg" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props:['nav'],
  data(){
    return{
    active:this.nav
    }
  },
}
</script>

<style lang="scss" scoped>
  .van-tabbar{
    border-top: 1px solid #ececec;
  }
</style>