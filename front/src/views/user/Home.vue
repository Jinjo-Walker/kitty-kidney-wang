<template>
  <div class="home">
    <div id="row">
      <div @click="showPop">
        <span v-html="$store.state.city"></span>
        <span id="a-down"><van-icon name="arrow-down" /></span>
      </div>
      <!-- 顶部搜索框 -->
      <div id="ipt">
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
      <van-grid-item icon="/img/banner/waimai.svg" text="外卖" to="/order" />
      <!-- 预约 -->
      <van-grid-item icon="/img/banner/yuyue.svg" text="预约" to="/" />
      <!-- 领券 -->
      <van-grid-item
        icon="/img/banner/youhui.svg"
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
        </div>
      </van-popup>
    </div>
    <!-- 点击上海旁边的icon弹出 -->
    <van-popup
      v-model="show2"
      lock-scroll
      position="bottom"
      :style="{ height: '100%', background: '#f6f6f6' }"
    >
      <div>
        <van-sticky style="width: 100%">
          <div id="address">
            <div class="address_head">
              <van-icon
                name="cross"
                size="18"
                color="grey"
                @click.stop="close"
                class="address_icon"
              />
            </div>
            <!-- 弹出框顶部搜索框 -->
            <div id="inpt">
              <van-search
                v-model="value2"
                placeholder="请输入搜索关键词"
                @search="onSearch2"
                shape="round"
                maxlength="10"
                @keyup.enter="scrollTo"
              />
            </div>
            <div class="address-search">搜索</div>
          </div>
          <div></div>
        </van-sticky>
        <div>
          <div class="current_city">
            <span>当前城市：{{ $store.state.city }}</span>
          </div>
          <tab @hide="hide"/>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import message from "@/components/user/message";
import swip from "@/components/user/swip";
import tabbar from "@/components/user/Tabbar";
import couponmain from "@/components/user/Couponsmain";
import tab from "@/components/user/Tab";

export default {
  data() {
    return {
      images: [
        "http://img.ztmnbt.xyz/image/lb1.jpg",
        "http://img.ztmnbt.xyz/image/lb2.jpg",
        "http://img.ztmnbt.xyz/image/lb3.jpg",
      ],
      value: "",
      value2: "",
      showPopover: false,
      actions: [{ text: "扫一扫" }, { text: "分享" }, { text: "选项三" }],
      isLoading: false,
      count: 0,
      offset: [14, 7],
      show: false,
      container: null,
      show2: false,
      active: "",
    };
  },

  methods: {
    scrollTo() {},
    //调用onSearch方法获取搜索框的值
    onSearch() {
      console.log(this.value);
    },
    onSearch2() {
      var scto = document.getElementById(`#${this.value2}`);
      scto.scrollIntoView();
      this.$nextTick(() => {
        scto.scrollTop = scto.offsetTop;
      });

      // document.documentElement.scrollTop = topVal;
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
      this.show2 = false;
    },
    hide(){
      this.show2 = false;
    },

    mounted() {
      this.container = this.$refs.container;
    },
    getLocation() {
      let _this = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 5000,
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);
        // data是具体的定位信息
        function onComplete(data) {
          console.log("具体的定位信息", data);
         _this.$store.state.city =  data.addressComponent.province;
         _this.$store.state.center = [data.position.lng,data.position.lat];
        }
        function onError(data) {
          // 失败 启用 ip定位
          AMap.plugin("AMap.CitySearch", function () {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function (status, result) {
              if (status === "complete" && result.info === "OK") {
                // 查询成功，result即为当前所在城市信息
                console.log("通过ip获取当前城市：", result);
              }
            });
          });
        }
      });
    },
  },
  watch: {},

  components: {
    message,
    swip,
    tabbar,
    couponmain,
    tab,
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/coupon") {
      this.$store.state.coupon_from = "/";
    }
    next();
  },
  created() {
    this.getLocation();
    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写
    //this.$store.state.city = this.getLocation();
  },
};
</script>
<style  lang="scss" >
.home {
  margin-bottom: 50px;
  #ipt {
    display: block;
    width: 70%;
  }
  #row,
  #address {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #address {
    background-color: white;
  }
  .address_head {
    position: relative;
  }
  #inpt {
    width: 80%;
  }
  .address_icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  #a-down {
    margin-top: 2px;
  }
  .address-search {
    font-size: 16px;
  }
  .current_city {
    background-color: white;
  }
  .van-popup{
    padding-bottom: 0px;
  }
}
</style>