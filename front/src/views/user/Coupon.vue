<template>
  <div class="coup">
    <van-nav-bar
      title="优惠券"
      fixed
      left-arrow
      right-text="兑换"
      @click-left="$router.push(`${ $store.state.coupon_from}`)"
      @click-right="onClickRight"
    ></van-nav-bar>
    <div class="vbt_top">
      <van-button id="vbt1" size="mini" color="grey"><span>推荐使用</span></van-button> 
      <van-button id="vbt2" size="mini" color="grey"><span>新到</span></van-button> 
      <van-button id="vbt3" size="mini" color="grey"><span>快到期</span></van-button> 
      <van-button id="vbt4" size="mini" color="grey"><span>大额优先</span></van-button> 
    </div>
    <div>
      <coupon v-for="(item, index) in coupons" :key="index" :coupon="item"/>
    </div>
    <van-dialog v-model="show" title="优惠券" show-cancel-button :show-confirm-button="false">
      <van-field
        v-model="sms"
        center
        clearable
        label="兑换码"
        placeholder="请输入兑换码"
        maxlength="10"
      >
        <template #button>
          <van-button size="small" type="primary">兑换</van-button>
        </template>
      </van-field>
    </van-dialog>
  </div>
</template>

<script>
import {coupon_search} from "@/api/user_axios.js"
import coupon from "@/components/user/Coupons.vue";
export default {
  components: { coupon },
  data() {
    return {
      from:'',
      show: false,
      value: "",
      sms:"",
      active:"推荐使用",
      coupons:[]
    };
  },
  methods: {
    onClickRight() {
      this.show = !this.show;
    },
  },
  created(){
    coupon_search(`id=${this.$store.state.uid}`).then(res=>{
      this.coupons = res.result;
      // console.log(this.coupons);
    })
  }
 
};
</script>

<style lang="scss">
.coup {
  background-color: #f6f6f6;
  height: 250vh;
  padding-bottom:250px ;
  
  #input {
  display: flex;
  justify-content: center;
}
#vbt1{
  width: 18%;
  margin: 12px 0 0 30px;
  border-radius: 5px;
}
#vbt4{
  width: 18%;
  margin: 12px 30px 0 0;
  border-radius: 5px;
}
.vbt_top{
  display: flex;
  justify-content: space-between;
  margin: 40px 0 0 0;
}
.vbt_top span{
  font-size: 14px;
}
#vbt2{
  width: 12%;
  margin: 12px 0 0 0;
  border-radius: 5px;
}
#vbt3{
  width: 15%;
  margin: 12px 0 0 0;
  border-radius: 5px;
}

}

</style>