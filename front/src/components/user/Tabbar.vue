<template>
  <div>
      <van-tabbar v-model="active" fixed>
      <van-tabbar-item id="box" to="/" name="home">
        首页
        <img slot="icon" src="http://img.ztmnbt.xyz/image/biaoqian1.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/member" name="member">
        会员
        <img slot="icon" src="http://img.ztmnbt.xyz/image/biaoqian2.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/form" name="form">
        订单
        <img slot="icon" src="http://img.ztmnbt.xyz/image/biaoqian3.png" />
      </van-tabbar-item>
      <van-tabbar-item to="/mine" name="mine">
        我的
        <img slot="icon" src="http://img.ztmnbt.xyz/image/biaoqian4.png" />
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