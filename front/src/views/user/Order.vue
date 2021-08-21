<template>
  <div class="my-order">
    <!-- 页头 -->
    <van-nav-bar 
    left-arrow 
    color="#b3f"
    fixed 
    @click-left="$router.push('/')"
    class="my-order-header">
      <template #right
      ><van-search v-model="value" placeholder="请输入搜索关键词" />
        <van-icon name="search" color="black" size="18" />
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
      <div class="my-center">
        <!-- 顶部导航栏 -->
        <van-tabs v-model="activeName" sticky :offset-top="45" :color="'#b3f'">
          <!-- 点餐界面 -->
          <van-tab title="点餐" class="my-three-top" name="a">
            <van-sticky :offset-top="90">
              <!-- 商品列表 -->
              <div class="my-card-insert">
                <!-- 商品按类分割线 -->
                <!-- 素菜类 -->
                <van-divider
                  class="my-card-divide"
                  id="sucai"
                  title="素菜"
                  :style="{ borderColor: '#b6f' }"
                  >素菜</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['素菜']"
                  :key="`素菜${index}`"
                  kind="素菜"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 荤菜类 -->
                <van-divider
                  class="my-card-divide"
                  id="huncai"
                  :style="{ borderColor: '#b6f' }"
                  >荤菜</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['荤菜']"
                  :key="`荤菜${index}`"
                  kind="荤菜"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 牛羊肉类 -->
                <van-divider
                  class="my-card-divide"
                  id="niuyang"
                  :style="{ borderColor: '#b6f' }"
                  >牛羊肉</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['牛羊肉']"
                  :key="`牛羊肉${index}`"
                  kind="牛羊肉"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 猪肉类 -->
                <van-divider
                  class="my-card-divide"
                  id="zhurou"
                  :style="{ borderColor: '#b6f' }"
                  >猪肉</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['猪肉']"
                  :key="`猪肉${index}`"
                  kind="猪肉"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 海鲜类 -->
                <van-divider
                  class="my-card-divide"
                  id="haixian"
                  :style="{ borderColor: '#b6f' }"
                  >海鲜</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['海鲜']"
                  :key="`海鲜${index}`"
                  kind="海鲜"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 烤鱼类 -->
                <van-divider
                  class="my-card-divide"
                  id="kaoyu"
                  :style="{ borderColor: '#b6f' }"
                  >烤鱼</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['烤鱼']"
                  :key="`烤鱼${index}`"
                  kind="烤鱼"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 牛蛙类 -->
                <van-divider
                  class="my-card-divide"
                  id="niuwa"
                  :style="{ borderColor: '#b6f' }"
                  >牛蛙</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['牛蛙']"
                  :key="`牛蛙${index}`"
                  kind="牛蛙"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 鸡鸭肉类 -->
                <van-divider
                  class="my-card-divide"
                  id="jiya"
                  :style="{ borderColor: '#b6f' }"
                  >鸡鸭肉</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['鸡鸭肉']"
                  :key="`鸡鸭肉${index}`"
                  kind="鸡鸭肉"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 饮料类 -->
                <van-divider
                  class="my-card-divide"
                  id="yinliao"
                  :style="{ borderColor: '#b6f' }"
                  >饮料</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['饮料']"
                  :key="`饮料${index}`"
                  kind="饮料"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <!-- 酒水类 -->
                <van-divider
                  class="my-card-divide"
                  id="jiushui"
                  :style="{ borderColor: '#b6f' }"
                  >酒水</van-divider
                >
                <my-card
                  v-for="(card, index) of menu['酒水']"
                  :key="`酒水${index}`"
                  kind="酒水"
                  :i="index"
                  :fun="add_cart"
                  :del="del_card"
                ></my-card>

                <van-divider
                  class="my-card-divide"
                  :style="{ borderColor: '#b6f' }"
                  >到底了···</van-divider
                >
              </div>
            </van-sticky>

            <!-- 侧边分类栏，吸顶 -->
            <van-sticky :offset-top="90">
              <van-sidebar v-model="activeKey" class="my-order-side">
                <!-- 包裹侧边栏限制宽度，使右侧商品栏不受padding-bottom影响 -->
                <div class="my-order-side-w">
                  <!-- 获取分类生成分类栏 -->
                  <a
                    @click="goto(`#${type.id}`)"
                    v-for="(type, i) of types"
                    :key="i"
                  >
                    <van-sidebar-item :title="`${type.name}`"
                  /></a>
                </div>
              </van-sidebar>
            </van-sticky>
            <!-- 底部结算区 -->
            <van-goods-action>
              <van-goods-action-icon
                icon="cart-o"
                color="#b3f"
                :badge="num"
                @click="chsheet"
              />
              <van-goods-action-icon :text="`￥${price}`" />
              <van-goods-action-button
                class="my-action-button"
                type="danger"
                text="去结算"
              />
            </van-goods-action>
            <!-- 已选商品详情弹窗 -->
            <van-action-sheet v-model="show" title="已选商品">
              <div class="sheet-content">
                <my-dcard
                  v-for="(selected, index) of arr"
                  :key="selected['kindAll']"
                  :menu="selected"
                  :i="index"
                  :del="del_arr"
                ></my-dcard>
              </div>
            </van-action-sheet>
          </van-tab>
          <!-- 评论界面 -->
          <van-tab title="评论" class="my-three-top" name="b">评论</van-tab>
          <!-- 商家界面 -->
          <van-tab title="商家" class="my-three-top" name="c">商家</van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { pro } from "@/api/product_axios.js";
export default {
  data() {
    return {
      // 顶部导航默认标签
      activeName: "a",
      // 左侧分类默认标签
      activeKey: 0,
      // 底部商品弹窗默认选项
      show: false,
      // 搜索栏
      value:'',
      // 菜品分类及id
      types: [
        { name: "素菜", id: "sucai" },
        { name: "荤菜", id: "huncai" },
        { name: "牛羊肉", id: "niuyang" },
        { name: "猪肉", id: "zhurou" },
        { name: "海鲜", id: "haixian" },
        { name: "烤鱼", id: "kaoyu" },
        { name: "牛蛙", id: "niuwa" },
        { name: "鸡鸭肉", id: "jiya" },
        { name: "饮料", id: "yinliao" },
        { name: "酒水", id: "jiushui" },
      ],
      //备用存储已选商品
      arr: this.$store.state.arr,
      // 商品后台数据
      menu: this.$store.state.menu,
    };
  },
  computed: {
    num: function () {
      var total_num = 0;
      for (var i in this.$store.state.menu) {
        for (var j of this.$store.state.menu[i]) {
          if (j.count != 0) {
            // 计算已选商品总数
            total_num += j.count;
          }
        }
      }
      return total_num;
    },
    price: function () {
      var total_prc = 0;
      for (var i in this.$store.state.menu) {
        for (var j of this.$store.state.menu[i]) {
          if (j.count != 0) {
            // 计算已选商品总价
            total_prc += new Number((j.count * j.price).toFixed(1));
            // 保留一位有效数字
            total_prc = Math.round(total_prc * 100) / 100;
          }
        }
      }
      return total_prc;
    },
  },
  methods: {
    // 锚点
    goto(idname) {
      document.querySelector(idname).scrollIntoView(true);
    },
    // 底部已选商品弹窗开关
    chsheet() {
      if (this.show == false) {
        this.show = true;
      } else if (this.show == true) {
        this.show = false;
      }
    },
    add_cart(arr, kind, i) {
      var flag = true;
      arr["kindAll"] = kind +"|" +i;
      //this.$set(this.$store.state.arr,kind+i,arr)
      for (let i = 0; i < this.$store.state.arr.length; i++) {
        if (arr.cid == this.$store.state.arr[i].cid) {
          flag = false;
          this.$store.state.arr.splice(i, 1);
          this.$store.state.arr.splice(i, 0, arr);
          break;
        }
      }
      if (flag) {
        this.$store.state.arr.push(arr);
      }
    },
    del_arr(i){
      this.$store.state.arr.splice(i,1);
    },
    del_card(id){
      for (var i of this.$store.state.arr) {
        if(i.cid == id){
          this.$store.state.arr.splice(this.$store.state.arr.indexOf(i),1);
          break;
        }
      }
    }
  },
  created() {
    pro().then((res) => {
      for (var key of res.result) {
        if (key.kind2 == 1) {
          key.count = 0;
          this.$store.state.menu["素菜"].push(key);
        } else if (key.kind2 == 2) {
          key.count = 0;
          this.$store.state.menu["荤菜"].push(key);
        } else if (key.kind2 == 3) {
          key.count = 0;
          this.$store.state.menu["牛羊肉"].push(key);
        } else if (key.kind2 == 4) {
          key.count = 0;
          this.$store.state.menu["猪肉"].push(key);
        } else if (key.kind2 == 5) {
          key.count = 0;
          this.$store.state.menu["海鲜"].push(key);
        } else if (key.kind2 == 6) {
          key.count = 0;
          this.$store.state.menu["烤鱼"].push(key);
        } else if (key.kind2 == 7) {
          key.count = 0;
          this.$store.state.menu["牛蛙"].push(key);
        } else if (key.kind2 == 8) {
          key.count = 0;
          this.$store.state.menu["鸡鸭肉"].push(key);
        } else if (key.kind2 == 9) {
          key.count = 0;
          this.$store.state.menu["饮料"].push(key);
        } else if (key.kind2 == 10) {
          key.count = 0;
          this.$store.state.menu["酒水"].push(key);
        }
      }
    });
    console.log(this.menu);
  },
  watch:{
    arr(){
      if(this.$store.state.arr.length == 0){
        this.show = false;
      }
    }
  }
};
</script>