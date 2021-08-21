<template>
  <div class="my-card">
    <van-card
      :thumb="`http://${$store.state.menu[kind][i].picture}`"
      :title="$store.state.menu[kind][i].cname"
      :desc="$store.state.menu[kind][i].cname"
    >
      <template #tags>
        <div class="my-card-price-all">
          ￥
          <span class="my-card-price">{{
            $store.state.menu[kind][i].price
          }}</span>
        </div>
        <div class="my-two-btn">
          <van-tag>
            <button
              class="my-two-btn1"
              @click="minus"
              v-show="$store.state.menu[kind][i].count > 0"
            >
              －
            </button>
          </van-tag>
          <span
            class="my-count"
            v-show="$store.state.menu[kind][i].count > 0"
            >{{ $store.state.menu[kind][i].count }}</span
          >
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
  props: ["kind", "i","fun","del"],
  data() {
    return {};
  },
  methods: {
    add() {
      let menu = this.$store.state.menu[this.kind][this.i];
      menu.count++;
      this.fun(menu,this.kind,this.i);
    },
    minus() {
      let menu = this.$store.state.menu[this.kind][this.i];
      if (menu.count > 1) {
        menu.count--;
      }
      else if(menu.count == 1){
        menu.count--;
        this.del(menu.cid);
      }
    },
  },
};
</script>
