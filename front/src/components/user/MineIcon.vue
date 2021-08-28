<template>
  <div>
    <van-icon :name="name" :color="color" :size="size" class="vi" @click="route_to"/><span
      v-text="str"
    ></span>
  </div>
</template>

<script>
export default {
  props: ["name", "color", "size", "to", "str"],
  methods: {
    route_to() {
      if(this.str == "我的客服"){
        location.href = this.to;
      }
      else if(this.str == "我的地址"){
        this.$store.state.address_from = "/mine";
        sessionStorage.setItem('address_from',"/mine");
        this.$router.push(`${this.to}`);
      }
      else{
        this.$router.push(`${this.to}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.vi {
  display: block;
  margin: 5px;
}
.vi + span {
  font-size: 8px;
}
</style>
