<template>
  <div class="home">
    <div id="row">
      <div @click.stop="showPop">
        <span>上海<van-icon name="arrow-down" size="5" /></span>
      </div>
      <!-- 顶部搜索框 -->
      <div id="input">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          shape="round"
          maxlength="10"
        />
      </div>
      <div>
        <van-popover
          v-model="showPopover"
          theme="dark"
          :actions="actions"
          trigger="click"
          placement="bottom-end"
          :offset="offset"
        >
          <template #reference>
            <van-icon name="plus" @click="Popover" />
          </template>
        </van-popover>
      </div>
    </div>

    <!-- 顶部轮播图 -->
    <swip :images="images" />

    <!-- 面板 -->
    <van-grid :column-num="3" :border="false">
      <!-- 外卖 -->
      <van-grid-item icon="/img/banner/004.png" text="外卖" to="/" />
      <!-- 预约 -->
      <van-grid-item icon="/img/banner/005.png" text="预约" to="/" />
      <!-- 领券 -->
      <van-grid-item
        icon="/img/banner/006.png"
        text="领券"
        @click.stop="showPopup"
      />
    </van-grid>

    <!-- 面板内容 -->
    <message />
    <!-- 底部导航栏   -->
    <tabbar nav="home" />
    <!-- 领券弹出 -->
    <div class="collect_pop">
      <van-popup
        v-model="show"
        round
        lock-scroll
        position="bottom"
        :style="{ height: '55%', background: '#f6f6f6' }"
      >
        <van-sticky style="width: 100%">
          <van-nav-bar title="优惠券">
            <template #right>
              <van-icon
                name="cross"
                size="18"
                color="grey"
                @click.stop="close"
              />
            </template>
          </van-nav-bar>
        </van-sticky>
        <div style="height: 80%; overflow-y: scroll">
          <couponmain />
          <couponmain />
          <couponmain />
          <couponmain />
          <couponmain />
          <couponmain />
        </div>
      </van-popup>
    </div>
    <!-- 点击上海旁边的icon弹出 -->
    
  </div>
</template>
<script>
import message from "@/components/user/message";
import swip from "@/components/user/swip";
import tabbar from "@/components/user/Tabbar";
import couponmain from "@/components/user/Couponsmain";

export default {
  data() {
    return {
      images: [
        "http://img.ztmnbt.xyz/image/lb1.jpg",
        "http://img.ztmnbt.xyz/image/lb2.jpg",
        "http://img.ztmnbt.xyz/image/lb3.jpg",
      ],
      value: "",
      showPopover: false,
      actions: [{ text: "扫一扫" }, { text: "分享" }, { text: "选项三" }],
      isLoading: false,
      count: 0,
      offset: [14, 7],
      show: false,
      container: null,
    };
  },

  methods: {
    //调用onSearch方法获取搜索框的值
    onSearch() {
      console.log(this.value);
    },
    Popover() {},
    onRefresh() {
      console.log(11);
    },
    showPopup() {
      this.show = true;
    },
    showPop() {
      this.show2 = true;
    },
    
    close() {
      this.show = false;
    },
    mounted() {
      this.container = this.$refs.container;
    },
  },

  components: {
    message,
    swip,
    tabbar,
    couponmain,
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/coupon") {
      this.$store.state.coupon_from = "/";
    }
    next();
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
.home {
  margin-bottom: 50px;
}
</style>
