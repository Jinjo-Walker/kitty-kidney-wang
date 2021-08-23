<template>
  <div class="htmls">
    <van-nav-bar
      class="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      style="background-color: #e7e"
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
import { ContactList, Toast } from "vant";
export default {
  data() {
    return {
      finish: false,
      chosenAddressId: "",
      list: this.$store.state.list, //在全局store
    };
  },

  methods: {
    sel(item, index) {
      let chosen = this.list[index];
      this.$router.replace({
        path: `/pay?id=${chosen}&address=${chosen.address}&name=${chosen.name}&tel=${chosen.tel}`,
      });
    },
    onClickLeft() {
      this.$router.replace({ path: "/pay" });
    },
    onAdd() {
      this.$router.replace({
        path: `/address_add2`,
      });
    },
    onEdit(item, index) {
      let chosen = this.list[index];
      this.$router.replace({
        path: `/address_add?id=${chosen.id}&name=${chosen.name}&tel=${chosen.tel}&address=${chosen.address}&index=${index}`,
      });
    },
  },
  watch: {},
};
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