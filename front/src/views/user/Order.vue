<template>
  <div>
    <van-nav-bar left-arrow fixed>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
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
    <div class="my-center">
      <van-tabs v-model="activeName" sticky :offset-top="45" :color="'#ba90e2'">
        <van-tab title="点餐" name="a">
          <div class="my-card-insert">
            <my-card v-for="cards of 20" :key="cards"></my-card>
          </div>
          <van-sticky :offset-top="90">
            <van-sidebar v-model="activeKey" class="my-side" >
              <van-sidebar-item
                :title="`${item}`"
                v-for="item of types"
                :key="item"
              />
            </van-sidebar>
          </van-sticky>
          <van-goods-action>
            <van-goods-action-icon icon="cart-o" badge="0" text="购物车" @click="chsheet"/>
            <van-goods-action-icon text="￥10.0" />
            <van-goods-action-button type="danger" text="去结算" />
          </van-goods-action>
          <van-action-sheet v-model="show" title="已选商品">
            <div class="sheet-content">
              <my-dcard v-for="selected of 1" :key="selected"></my-dcard>
            </div>
          </van-action-sheet>
        </van-tab>
        <van-tab title="评论" name="b"> </van-tab>
        <van-tab title="商家" name="c">商家</van-tab>
      </van-tabs>
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
        "烤",
        "牛",
        "肉",
      ],
    };
  },
  methods:{
    chsheet(){
      this.show="true"
    }
  }
};
</script>

<style scoped>
.my-center {
  margin: 0 6px;
  height: 580px;
}
.my-swipe img {
  width: 100%;
  height: 175px;
}
.my-card-insert {
  background-color: violet;
  width: 74%;
  float: right;
  height: 520px;
  overflow-y: auto;
}
.van-sidebar {
  width: 25%;
  /* z-index: -1; */
  background-color: tomato;
}
.van-swipe-item {
  margin: 0;
}
.my-side {
  height: 400px;
}
.van-goods-action {
  z-index: 10000;
}
.van-goods-action-icon {
  margin-left: 30px;
}
.van-goods-action-button {
  margin-left: 105px;
  margin-right: 20px;
}

.sheet-content{
  padding: 16px 16px 50px;
}
</style>