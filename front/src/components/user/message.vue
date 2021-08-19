<template>
  <div>
    <img v-for="(img,i) in imgs" :key="i" v-lazy="img" width="100%" height="100%" />
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from 'vant';
Vue.use(Lazyload);

export default {
  
  data(){
    return{
      imgs:['http://img.ztmnbt.xyz/banner/main1.gif','http://img.ztmnbt.xyz/banner/main2.gif','http://img.ztmnbt.xyz/banner/main3.gif','http://img.ztmnbt.xyz/banner/main4.gif'],
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

