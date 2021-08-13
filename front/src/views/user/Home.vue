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
<<<<<<< HEAD
      <van-grid-item icon="/img/banner/004.png" text="外卖" to="/" />
      <van-grid-item icon="/img/banner/005.png" text="预约" to="/" />
      <van-grid-item icon="/img/banner/006.png" text="领券" to="/coupon" />
=======
      <van-grid-item icon="/banner/001.png" text="外卖" to="/" />
      <van-grid-item icon="/banner/002.png" text="预约" to="/" />
      <van-grid-item icon="/banner/003.png" text="领券" to="/coupon" />
>>>>>>> edb225f35c6abe8518388df0fbc850a437df1b9d
    </van-grid>
    <!-- 面板内容 -->
    <message />

    <!-- 底部导航栏   -->
    <tabbar nav="home" />
  </div>
</template>


<script>
import message from "@/components/user/message";
import swip from "@/components/user/swip";
<<<<<<< HEAD
import tabbar from "@/components/user/Tabbar";
=======
import tabbar from "@/components/user/tabbar";
>>>>>>> edb225f35c6abe8518388df0fbc850a437df1b9d

export default {
  data() {
    return {

<<<<<<< HEAD
      images: ["http://img.ztmnbt.xyz/image/lb1.jpg", "http://img.ztmnbt.xyz/image/lb2.jpg", "http://img.ztmnbt.xyz/image/lb3.jpg"],
=======
      images: ["/banner/1.jpg", "/banner/2.jpg", "/banner/3.jpg"],
>>>>>>> edb225f35c6abe8518388df0fbc850a437df1b9d
      value: "",
      showPopover: false,
      actions: [{ text: "扫一扫" }, { text: "分享" }, { text: "选项三" }],
      isLoading: false,
      count: 0,
      offset:[14,7]
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
  },

  components: {
    message,
    swip,
    tabbar,
  },
  beforeRouteLeave(to,from,next){
    if(to.path=='/coupon'){
<<<<<<< HEAD
      this.$store.state.coupon_from='/'
=======
      this.$store.state.coupon_from='/home'
>>>>>>> edb225f35c6abe8518388df0fbc850a437df1b9d
    }
    next();
  }
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
.home{
  margin-bottom: 50px;
}
<<<<<<< HEAD

=======
>>>>>>> edb225f35c6abe8518388df0fbc850a437df1b9d
</style>
