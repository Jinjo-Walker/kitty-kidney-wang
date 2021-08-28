<template>
  <div class="htmls">
    <van-nav-bar
      class="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      style="background-color: #0baff0"
    />
    <van-address-list
      class="icons"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="sel"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      finish: false,
      chosenAddressId: "",
      list: this.$store.state.list, 
    };
  },

  methods: {
    sel(item, index) {
      this.$store.state.pay_click = 1;
      if(this.$store.state.address_from == '/mine'){
        return;
      }
      let chosen = this.list[index];
      this.$router.push({
        path: `/pay?id=${chosen}&address=${chosen.address}&name=${chosen.name}&tel=${chosen.tel}`,
      });
    },
    onClickLeft() {
      console.log(this.$store.state.address_from);
      this.$router.push(`${this.$store.state.address_from}`);
    },
    onAdd() {
      this.$router.push({
        path: `/address_add2`,
      });
    },
    onEdit(item, index) {
      let chosen = this.list[index];
      this.$router.push({
        path: `/address_add?id=${chosen.id}&name=${chosen.name}&tel=${chosen.tel}&address=${chosen.address}&index=${index}`,
      });
    },
  },
  
}
</script>

<style>
.bars2 .van-nav-bar__text {
  color: white;
}
.bars2 ::before {
  color: white;
}
.icons .van-radio__icon {
  display: none;
}
</style>