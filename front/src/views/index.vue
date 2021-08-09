<template>
  <div class="index">
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <van-grid square>
        <van-grid-item
          v-for="value in 8"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </van-grid>
    </div>
  </div>
</template>
<script>
import Tabbar from "../components/Tabbar.vue";
export default {
  name: "index",
  components: {
    Tabbar,
  },
};
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>