<template>
  <div class="cla">
    <div id="div" v-for="(couponid, index) in couponlist" :key="index">
      <div class="coupon">
        <div class="money">
          <span>￥</span>
          <span>{{couponid.money}}</span>
        </div>
        <div class="cpn">{{couponid.couponname}}</div>
      </div>
      <div class="item_i">
        <ul>
          <li>
            <van-tag class="tag">外卖券</van-tag
            ><span class="content">{{couponid.information}}</span>
          </li>
          <li>{{moment(couponid.Start_date).format('YYYY/MM/DD')}}~{{moment(couponid.end_date).format('YYYY/MM/DD')}}</li>
          <li @click="dialog">使用规则></li>
        </ul>
      </div>
      <div class="btn">
        <button @click="Couponreceive"><span>领取</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import { coupon_recive } from "@/api/coupon_axios.js";
import { coupon_search2 } from "@/api/coupon_axios.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      couponlist: [],
    };
  },
  mounted() {
    this.Couponsearch();
  },
  methods: {
    Couponreceive() {
      coupon_recive(1, this.$store.state.uid).then((res) => {
        if (res.code == 200) {
          //弹出消息
          const toast = Toast.success({
            message: "领取成功宝贝",
            icon: "like-o",
          });
        }
      });
    },
    Couponsearch() {
      coupon_search2().then((res) => {
        console.log(res.result);
        this.couponlist = res.result;
        //  console.log(this.couponlist)
      });
    },
    // open() {
    //   this.$router.push(`${"/"}`);
    // },
    dialog() {
      this.$dialog.alert({
        message:
          "第一条【制定目的】为保障小腰外卖用户的权益，维护平台的正常秩序，根据国家法律法规和或《小腰外卖用户服务条款》等小腰外卖在线条款、规则相关约定制定本规范。",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.cla {
  padding: 12px 12px 0 12px;
}
#div {
  width: 100%;
  line-height: 160%;
  display: flex;
  align-items: center;
  background-color: #ffff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.money,
.cpn {
  text-align: center;
  margin-left: 10px;
}

.coupon,
.item_i {
  margin: 10px 10px;
}
.coupon span:nth-child(2) {
  font-size: 30px;
  font-weight: bold;
}
.coupon span {
  color: rgb(231, 25, 25);
}
.tag {
  background-color: rgb(235, 216, 45);
  margin-bottom: 10px;
}

.item_i li {
  font-size: 12px;
  :first-child {
    color: rgb(231, 25, 25);
  }
}

.btn button {
  margin-right: 30px;
  width: 80%;
  border: 0;
  background-color: rgb(238, 121, 67);
  border-radius: 5px;
}
.btn button span {
  line-height: 27px;
  font-size: 15px;
  color: #fff;
}
.content {
  font-size: 18px;
  padding-left: 5px;
}
.btn {
  padding-right: 4px;
}
</style>

