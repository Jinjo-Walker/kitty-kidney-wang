<template>
  <div class="home">
    <div id="row">
      <div>
        <span>上海<van-icon name="arrow-down" size="5" /></span>
      </div>
      <!-- 顶部搜索框 -->
      <div id="input">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
      </div>
      <div><van-icon name="plus" @click="Icon"/></div>
    </div>
    <!-- 顶部轮播图 -->
    <swip :images="images" />

    <!-- 面板 -->
    <van-grid :column-num="3" :border="false">
      <van-grid-item icon="/img/banner/001.png" text="外卖" />
      <van-grid-item icon="/img/banner/002.png" text="预约" />
      <van-grid-item icon="/img/banner/003.png" text="领券" />
    </van-grid>
    <!-- 面板内容 -->
    <message />
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item id="box">
        <span>首页</span>
        <img slot="icon" src="/img/banner/icon1.png" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>会员</span>
        <img slot="icon" src="/img/banner/icon2.png" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>订单</span>
        <img slot="icon" src="/img/banner/icon3.png" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的</span>
        <img slot="icon" src="/img/banner/icon4.png" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
import message from "@/components/user/message";
import swip from "@/components/user/swip";

export default {
  components: {
    message,
    swip,
  },
  data() {
    return {
      images: ["/img/banner/1.jpg", "/img/banner/2.jpg", "/img/banner/3.jpg"],
      active: 0,
      value: "",
    };
  },
  methods: {
    //调用onSearch方法获取搜索框的值
    onSearch() {
      console.log(this.value);
    },
    Icon(){

    }
  },
};
</script>
<style  scoped >
#input {
  display: block;
  width: 75%;
}
#row {
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
