<template>
  <div class="mine">
    <van-row class="top" type="flex" justify="space-between" align="center">
      <van-col class="user_info"
        ><van-image round width="60" height="60" src="./banner/1.jpg"/><span
          class="uname"
          v-text="user_name"
        ></span
      ></van-col>
      <van-col
        ><span class="logout" v-if="flag" v-text="`注销`"></span>
        <span class="login" v-else v-text="`登录/注册`"></span>
      </van-col>
    </van-row>
    <van-row class="row_vip" type="flex" justify="space-between" align="center">
      <van-col span="16" offset="1"
        ><div class="vip">超级会员 | 立即领取</div></van-col
      >
      <van-col span="2" offset="2"><div>></div></van-col></van-row
    >
    <div class="changyong">
      <span>常用功能</span>
      <div class="gongneng">
        <mine-icon
          v-for="(item, index) in gongneng"
          :key="index"
          :name="item.name"
          :color="item.color"
          :size="item.size"
          :to="item.to"
          :str="item.str"
        ></mine-icon>
      </div>
    </div>

    <div class="money">
      <van-row type="flex" justify="space-between" align="center">
        <van-col><span>我的钱包</span></van-col>
        <van-col><span class="in">进入钱包 ></span></van-col>
      </van-row>
      <div class="money_info">
        <div><span>余额</span><span>0</span><span>账户钱包</span></div>
        <div><span>福利</span><span>0</span><span>外卖红包</span></div>
        <div><span>优惠</span><span>0</span><span>绑卡立减</span></div>
      </div>
    </div>

    <div class="more changyong">
      <span>更多推荐</span>
      <div class="gongneng">
        <mine-icon
          v-for="(item, index) in more"
          :key="index"
          :name="item.name"
          :color="item.color"
          :size="item.size"
          :to="item.to"
          :str="item.str"
        ></mine-icon>
      </div>
    </div>
    <!-- 底部导航栏   -->
    <tabbar nav="mine" />
  </div>
</template>
<script>
import mineIcon from "@/components/user/MineIcon.vue";
import tabbar from "@/components/user/tabbar";
export default {
  name: "mine",
  data() {
    return {
      user_name: "用户名",
      flag: false,
      gongneng: [
        {
          name: "gift",
          color: "#3EB0EF",
          size: "25",
          to: `/coupon?id=${this.$store.state.uid}`,
          str: "红包优惠",
        },
        {
          name: "friends",
          color: "#3EB0EF",
          size: "25",
          to: "/change_info",
          str: "修改信息",
        },
        {
          name: "like",
          color: "#3EB0EF",
          size: "25",
          to: "/",
          str: "店铺关注",
        },
        {
          name: "comment",
          color: "#3EB0EF",
          size: "25",
          to: "/",
          str: "评价中心",
        },
      ],
      more: [
        {
          name: "location-o",
          color: "black",
          size: "25",
          to: "/",
          str: "我的地址",
        },
        {
          name: "manager-o",
          color: "black",
          size: "25",
          to: "/info_check?kw=头像",
          str: "我的头像",
        },
        {
          name: "service-o",
          color: "black",
          size: "25",
          to: "/",
          str: "我的客服",
        },
                {
          name: "shop-o",
          color: "black",
          size: "25",
          to: "/",
          str: "招商加盟",
        },
      ],
    };
  },
  components: {
    mineIcon,
    tabbar
  },
   beforeRouteLeave(to,from,next){
    if(to.path=='/coupon'){
      this.$store.state.coupon_from='/mine'
    }
    next();
  }
};
</script>

<style scoped lang="scss">
.mine {
  padding: 5px 10px 0px;
  background-color: #F6F6F6;
  height: 100vh;
}
.top {
  margin: 30px 0px 20px;
}
.user_info {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin: 0px 5px 0px;
  }
}
.uname {
  font-size: 18px;
  font-weight: 700;
}
.row_vip {
  line-height: 60px;
  border-radius: 10px;
  background-color: blanchedalmond;
}
.changyong {
  margin-top: 5px;
  background-color: white;
  border-radius: 6px;
  padding: 10px 5px 10px;
  & > span {
    font-weight: 550;
  }
}
.gongneng {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px 0px;
  padding: 10px;
  text-align: center;
}
.money {
  margin-top: 5px;
  background-color: white;
  border-radius: 6px;
  padding: 10px 5px 10px;
  .van-row span {
    font-weight: 550;
  }
  .in {
    font-size: 8px;
    color: lightgrey;
  }
}
.money_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 30px 10px;
  text-align: center;
  span {
    font-size: 8px;
    display: block;
  }
  & > div > :nth-child(2) {
    font-weight: 800;
  }
  & > div > :nth-child(2)::after {
    font-weight: 400;
    content: "元";
  }
  & > div > :nth-child(3) {
    color: lightgrey;
  }
}
</style>
