<template>
  <div class="my-goods">
    <!-- 页头 -->
    <van-sticky>
      <van-nav-bar
        title="商品管理"
        left-arrow
        @click-left="$router.push('/merchant')"
      />
    </van-sticky>
    <van-sticky :offset-top="46">
      <div class="my-goods-main">
        <!-- 顶部导航 -->
        <van-tabs v-model="active">
          <van-badge :content="59" class="my-one-badge" color="#b6f" />
          <van-badge :content="59" class="my-two-badge" color="#b6f" />
          <van-badge :content="0" class="my-three-badge" color="#b6f" />
          <van-tab title="全部商品">
            <!-- 侧边分类栏，吸顶 -->
            <van-sidebar v-model="activeKey" class="my-goods-side">
              <a @click="goto(`#${pro.id}`)" v-for="(pro, i) of types" :key="i">
                <van-badge :content="menu[`${pro.name}`].length" color="#b6f">
                  <van-sidebar-item
                    :title="`${pro.name}`"
                    class="my-child"
                  /> </van-badge
              ></a>
            </van-sidebar>
            <van-sticky :offset-top="90">
              <div class="my-right">
                <div class="my-gcard-insert">
                  <!-- 商品按类分割线 -->
                  <!-- 素菜类 -->
                  <van-divider
                    class="my-card-divide"
                    id="sucai"
                    :style="{ borderColor: '#b6f' }"
                    >素菜</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['素菜']"
                    :key="`素菜${index}`"
                    kind="素菜"
                    :i="index"
                  ></gcard>

                  <!-- 荤菜类 -->
                  <van-divider
                    class="my-card-divide"
                    id="huncai"
                    :style="{ borderColor: '#b6f' }"
                    >荤菜</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['荤菜']"
                    :key="`荤菜${index}`"
                    kind="荤菜"
                    :i="index"
                  ></gcard>

                  <!-- 牛羊肉类 -->
                  <van-divider
                    class="my-card-divide"
                    id="niuyang"
                    :style="{ borderColor: '#b6f' }"
                    >牛羊肉</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['牛羊肉']"
                    :key="`牛羊肉${index}`"
                    kind="牛羊肉"
                    :i="index"
                  ></gcard>

                  <!-- 猪肉类 -->
                  <van-divider
                    class="my-card-divide"
                    id="zhurou"
                    :style="{ borderColor: '#b6f' }"
                    >猪肉</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['猪肉']"
                    :key="`猪肉${index}`"
                    kind="猪肉"
                    :i="index"
                  ></gcard>

                  <!-- 海鲜类 -->
                  <van-divider
                    class="my-card-divide"
                    id="haixian"
                    :style="{ borderColor: '#b6f' }"
                    >海鲜</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['海鲜']"
                    :key="`海鲜${index}`"
                    kind="海鲜"
                    :i="index"
                  ></gcard>

                  <!-- 烤鱼类 -->
                  <van-divider
                    class="my-card-divide"
                    id="kaoyu"
                    :style="{ borderColor: '#b6f' }"
                    >烤鱼</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['烤鱼']"
                    :key="`烤鱼${index}`"
                    kind="烤鱼"
                    :i="index"
                  ></gcard>

                  <!-- 牛蛙类 -->
                  <van-divider
                    class="my-card-divide"
                    id="niuwa"
                    :style="{ borderColor: '#b6f' }"
                    >牛蛙</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['牛蛙']"
                    :key="`牛蛙${index}`"
                    kind="牛蛙"
                    :i="index"
                  ></gcard>

                  <!-- 鸡鸭肉类 -->
                  <van-divider
                    class="my-card-divide"
                    id="jiya"
                    :style="{ borderColor: '#b6f' }"
                    >鸡鸭肉</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['鸡鸭肉']"
                    :key="`鸡鸭肉${index}`"
                    kind="鸡鸭肉"
                    :i="index"
                  ></gcard>

                  <!-- 饮料类 -->
                  <van-divider
                    class="my-card-divide"
                    id="yinliao"
                    :style="{ borderColor: '#b6f' }"
                    >饮料</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['饮料']"
                    :key="`饮料${index}`"
                    kind="饮料"
                    :i="index"
                  ></gcard>

                  <!-- 酒水类 -->
                  <van-divider
                    class="my-card-divide"
                    id="jiushui"
                    :style="{ borderColor: '#b6f' }"
                    >酒水</van-divider
                  >
                  <gcard
                    v-for="(card, index) of menu['酒水']"
                    :key="`酒水${index}`"
                    kind="酒水"
                    :i="index"
                  ></gcard>

                  <van-divider
                    class="my-card-divide"
                    :style="{ borderColor: '#b6f' }"
                    >到底了···</van-divider
                  >
                </div>
              </div>
            </van-sticky>
          </van-tab>
          <van-tab title="售卖中"> </van-tab>
          <van-tab title="未上架"></van-tab>
        </van-tabs>
        <van-goods-action>
          <van-goods-action-button
            color="#0baff0"
            type="danger"
            text="分类管理"
          />
          <van-goods-action-button
            color="#0baff0"
            type="danger"
            text="添加商品"
          />
        </van-goods-action>
      </div>
    </van-sticky>
  </div>
</template>

<script>
import { pro } from "@/api/product_axios.js";
// 引入goodUi组件
import "@/assets/shop/goodsUi.scss";
import gcard from "@/components/shop/gcard.vue";
export default {
  components: {
    gcard,
  },
  data() {
    return {
      // num,
      active: 0,
      activeKey: 0,
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
  methods: {
    // 锚点
    goto(idname) {
      document.querySelector(idname).scrollIntoView(true);
    },
  },
  created() {
    pro().then((res) => {
      if (this.$store.state.firstmenu == 0) {
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
        this.$store.state.firstmenu = 1;
      }
    });
    console.log(this.menu);
  },
  computed: {
    // num: function () {
    //   var total_num = 0;
    //   for (var i in this.$store.state.menu) {
    //         // 计算已选商品总数
    //         total_num += i.count;
    //   }
    //   this.num=total_num
    //   return total_num;
    // },
  },
};
</script>
