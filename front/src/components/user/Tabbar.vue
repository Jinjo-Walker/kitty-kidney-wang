<template>
  <div>
      <van-tabbar v-model="active" fixed>
      <van-tabbar-item id="box" to="/" name="home">
        首页
        <img slot="icon" src="/img/banner/shouye2.png" />
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/vip" name="vip">
        会员
        <img slot="icon" src="/img/banner/huiyuan.png" />
      </van-tabbar-item> -->
      <van-tabbar-item to="/form" name="form">
        订单
        <img slot="icon" src="/img/banner/dingdan.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/mine" name="mine">
        我的
        <img slot="icon" src="/img/banner/wode.png" />
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