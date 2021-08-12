<template>
  <div class="coup">
    <van-nav-bar
      title="优惠券"
      left-text="返回"
      left-arrow
      right-text="兑换"
      @click-left="$router.push(`${ $store.state.coupon_from}`)"
      @click-right="onClickRight"
    ></van-nav-bar>
    <div id="input">
      <van-tag
        id="tag"
        type="primary"
        size="medium"
        v-for="(tag, i) in tags"
        :key="i"
        >{{ tag }}</van-tag
      >
    </div>
    <div>
      <coupon />
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
import coupon from "@/components/user/coupon.vue";
export default {
  components: { coupon },
  data() {
    return {
      from:'',
      show: false,
      value: "",
      tags: ["推荐使用", "新到", "快到期", "大额优先"],
      sms:"",
    };
  },
  methods: {
    onClickRight() {
      this.show = !this.show;
    },
  },
 
};
</script>

<style>
.coup {
  background-color: #f6f6f6;
  height: 100vh;
}
#input {
  display: flex;
  justify-content: center;
}
#tag {
  margin: 5% 5% 0 5%;
  border-radius: 11%;
  line-height: 170%;
  background-color: rgb(197, 197, 197);
}
</style>