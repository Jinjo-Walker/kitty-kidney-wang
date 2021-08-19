<template>
  <div class="vip">
    <van-nav-bar
      title="大会员"
      left-text="返回"
      right-text="..."
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="box">
      <div class="cover_box">
        <van-image
          round
          cover
          width="5rem"
          height="5rem"
          src="img/banner/TBrx.png"
        />
      </div>
      <div>
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
        <van-divider />
        <div>
          <span>我的会员</span> <span>会员积分</span>
          <van-divider />
          <van-progress
            pivot-text="9927"
            color="#ae33cc"
            :percentage="77"
            stroke-width="12"
          />
        </div>
        <p>我的特权</p>
        <div><van-icon name="img/banner/TBsw.png" size="4em" />
        <span>免费试吃</span></div>
       <div><van-icon name="img/banner/TBlw.png" size="4em"/>
        <span>积分兑换</span></div>
        <div>
          <van-icon name="img/banner/TBrx.png" size="4em"/>
        <span>身份铭牌</span>
        </div>
       
      </div>
    </div>
  </div>
</template>
<script>
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};
export default {
  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
  onChange(index) {
    this.showList = false;
    this.chosenCoupon = index;
  },
  onExchange(code) {
    this.coupons.push(coupon);
  },
};
</script>
<style scoped>
.vip /deep/ .van-nav-bar__left .van-icon,
.vip /deep/ .van-nav-bar__left .van-nav-bar__text,
.vip /deep/ .van-nav-bar__right {
  color: #000 !important;
}
.box {
  margin: 20px 20px;
 
}
.cover_box {
  
  height: 10rem;
  background-image: -webkit-linear-gradient(
    45deg,
    rgb(223, 95, 241),
    rgb(174, 75, 255)
  );
 
  border: 1px solid #9632af;
  border-radius: 10px;
  box-shadow: 3px 3px 2px rgb(131, 103, 158);
}
</style>
