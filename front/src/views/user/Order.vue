<template>
  <div class="my-order">
    <!-- 页头 -->
    <van-nav-bar left-arrow fixed class="my-order-header">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="my-main">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../../assets/img/lb1.jpg" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/img/lb2.jpg" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/img/lb3.jpg" alt="" />
        </van-swipe-item>
      </van-swipe>

      <!-- 商品内容区 -->
      <div class="my-center" >
        <!-- 顶部导航栏 -->
        <van-tabs
          v-model="activeName"
          sticky
          :offset-top="45"
          :color="'#ba90e2'">
          <!-- 点餐界面 -->
          <van-tab title="点餐" name="a" >
            <!-- 商品列表 -->
            <div class="my-card-insert">
              <!-- 商品按类分割线 -->
              <!-- 海鲜类 -->
              <van-divider
                class="my-card-divide" id="haixian" title="海鲜"
                :style="{ color: '#d36dd3', borderColor: '#fff' }"
                content-position="left">海鲜</van-divider>
              <my-card v-for="cards of 6" :key="cards"></my-card>
              <!-- 牛羊肉类 -->
              <van-divider
                class="my-card-divide" id="niuyang"
                :style="{ color: '#d36dd3', borderColor: '#fff' }"
                content-position="left">牛羊肉</van-divider>
              <my-card v-for="cards of 4" :key="cards"></my-card>
              <!-- 猪肉类 -->
              <van-divider
                class="my-card-divide" id="zhurou"
                :style="{ color: '#d36dd3', borderColor: '#fff' }"
                content-position="left">猪肉</van-divider>
              <my-card v-for="cards of 3" :key="cards"></my-card>
              <!-- 素菜类 -->
              <van-divider
                class="my-card-divide" id="sucai"
                :style="{ color: '#d36dd3', borderColor: '#fff' }"
                content-position="left">素菜</van-divider>
              <my-card v-for="cards of 7" :key="cards"></my-card>
              <!-- 烤鱼类 -->
              <van-divider
                class="my-card-divide" id="kaoyu"
                :style="{ color: '#d36dd3', borderColor: '#fff' }"
                content-position="left">烤鱼</van-divider>
              <my-card v-for="cards of 2" :key="cards"></my-card>
              <!-- 牛蛙类 -->
              <van-divider
                class="my-card-divide" id="niuwa"
                :style="{ color: '#d36dd3', borderColor: '#fff' }"
                content-position="left">牛蛙</van-divider>
              <my-card v-for="cards of 5" :key="cards"></my-card>
              <!-- 鸡鸭肉类 -->
              <van-divider
                class="my-card-divide" id="jiya"
                :style="{ color: '#d36dd3', borderColor: '#fff' }"
                content-position="left">鸡鸭肉</van-divider>
              <my-card v-for="cards of 6" :key="cards"></my-card>
              <!-- 饮料类 -->
              <van-divider
                class="my-card-divide" id="yinliao"
                :style="{ color: '#d36dd3', borderColor: '#fff' }"
                content-position="left">饮料</van-divider>
              <my-card v-for="cards of 4" :key="cards"></my-card>
              <!-- 到底了 -->
              <van-divider class="my-card-divide" id="end">到底了</van-divider>
            </div>
            <!-- 侧边分类栏，吸顶 -->
            <van-sticky :offset-top="90" >
              <van-sidebar v-model="activeKey" class="my-order-side" >
                <!-- 包裹侧边栏限制宽度，使右侧商品栏不受padding-bottom影响 -->
                <div class="my-order-side-w">
                  <!-- 获取分类生成分类栏 -->
                <!-- <van-sidebar-item
                  :title="`${item}`"
                  v-for="item of types"
                  :key="item"/> -->
                  <a href="#haixian"><van-sidebar-item title="海鲜"/></a>
                  <a href="#niuyang"><van-sidebar-item title="牛羊肉"/></a>
                  <a href="#zhurou"><van-sidebar-item title="猪肉"/></a>
                  <a href="#sucai"><van-sidebar-item title="素菜"/></a>
                  <a href="#kaoyu"><van-sidebar-item title="烤鱼"/></a>
                  <a href="#niuwa"><van-sidebar-item title="牛蛙"/></a>
                  <a href="#jiya"><van-sidebar-item title="鸡鸭肉"/></a>
                  <a href="#yinliao"><van-sidebar-item title="饮料"/></a>
                  </div>
              </van-sidebar>
            </van-sticky>
            <!-- 底部结算区 -->
            <van-goods-action>
              <van-goods-action-icon
                icon="cart-o"
                badge="0"
                text="购物车"
                @click="chsheet"
              />
              <van-goods-action-icon text="￥10.0" />
              <van-goods-action-button
                class="my-action-button"
                type="danger"
                text="去结算"
              />
            </van-goods-action>
            <!-- 已选商品详情弹窗 -->
            <van-action-sheet v-model="show" title="已选商品">
              <div class="sheet-content">
                <my-dcard v-for="selected of 1" :key="selected"></my-dcard>
              </div>
            </van-action-sheet>
          </van-tab>
          <!-- 评论界面 -->
          <van-tab title="评论" name="b"> </van-tab>
          <!-- 商家界面 -->
          <van-tab title="商家" name="c">商家</van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "a",
      activeKey: 0,
      show: false,
      types: [
        "海鲜",
        "牛羊肉",
        "猪肉",
        "素菜",
        "烤鱼",
        "牛蛙",
        "鸡鸭肉",
        "饮料",
        "end",
      ],
    };
  },
  methods: {
    chsheet() {
      if(this.show==false){
        this.show = true;
      }else if(this.show==true){
        this.show=false;
      }
    }
  },
};
</script>