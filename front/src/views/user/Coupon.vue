<template>
  <div class="coup">
    <van-nav-bar title="优惠券" left-text="返回" left-arrow right-text="兑换"></van-nav-bar>
    <div id="input">
      <van-tag id="tag" type="primary" size="medium" v-for="(tag, i) in tags" :key="i">{{tag}}</van-tag>
    </div>
    <div>    
    <coupon />
    <coupon />
    <coupon />
    <coupon />
    </div>
  </div>
</template>

<script>
import coupon from '@/components/user/coupon.vue';
export default {
  components: { coupon },
  data() {
    return {
      value: "",
      tags:["推荐使用","新到","快到期","大额优先"],
    };
  },
  methods: {
    },
  
};
</script>

<style>
.coup{
  background-color: #F6F6F6;
  height: 100vh;
  
}
#input{
    display: flex;
    justify-content: center;
    
}
#tag{
    margin: 5% 5% 0 5%;
    border-radius: 11%;
    line-height:170%;
    background-color: rgb(197, 197, 197); 
}

</style>