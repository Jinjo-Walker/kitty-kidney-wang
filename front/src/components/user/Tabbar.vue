<template>
  <div>
      <van-tabbar v-model="active" fixed>
      <van-tabbar-item id="box" to="/" name="home">
        首页
        <img slot="icon" src="/img/banner/icon1.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/member" name="member">
        会员
        <img slot="icon" src="/img/banner/icon2.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/">
        订单
        <img slot="icon" src="/img/banner/icon3.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/mine" name="mine">
        我的
        <img slot="icon" src="/img/banner/icon4.png" />
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

<style>

</style>