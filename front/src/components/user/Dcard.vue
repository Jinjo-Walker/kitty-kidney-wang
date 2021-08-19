<template>
  <div class="my-card">
    <van-card :thumb="menuIn.picture" :title="menuIn.cname">
      <template #tags>
        <div class="my-card-desc">{{ menuIn.cname }}</div>
        <div class="my-card-price-all my-card-price-n">
          ￥
          <span class="my-card-price">{{ menuIn.price }}</span>
        </div>
        <div class="my-two-btn">
          <van-tag>
            <button class="my-two-btn1" @click="minus">－</button>
          </van-tag>
          <span class="my-count">{{ menuIn.count }}</span>
          <van-tag>
            <button @click="add">＋</button>
          </van-tag>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  props: ["menu","i","del"],
  data() {
    return {
      img: "/img/banner/rourou.jpg",
      menuIn: this.menu,
    };
  },
  methods: {
    add() {
      console.log(this.menuIn["kindAll"]);
      var kindAll = this.menuIn["kindAll"].split("|");
      this.$store.state.menu[kindAll[0]][kindAll[1]].count++;
    },
    minus() {
      var kindAll = this.menuIn["kindAll"].split("|");
      let menu = this.$store.state.menu[kindAll[0]][kindAll[1]];      
      if (menu.count > 1) {
        menu.count--;
      }
      else{
        menu.count = 0;
        this.del(this.i);
      }
    },
  },
};
</script>

