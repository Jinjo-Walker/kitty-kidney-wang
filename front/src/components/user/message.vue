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
      imgs:['/banner/main1.gif','/banner/main2.gif','/banner/main3.gif','/banner/main4.gif'],
    }
  }
}
</script>

<style lang="sss" scoped>

</style>

