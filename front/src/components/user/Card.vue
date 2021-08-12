<template>
  <div>
    <van-card
  :thumb='img'
  title="商品标题"
  desc="描述信息"
  price="2.0"
  num="0"
  class="my-btn-one"
>
  <!-- <template #tags>
    <van-tag plain type="danger">标签</van-tag>
    <van-tag plain type="danger">标签</van-tag>
  </template> -->
  <template #footer>
    <van-button size="mini">十</van-button>
  </template>
</van-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      img:'/img/banner/rourou.jpg'
    }
  }
}
</script>

<style scoped>
.van_card{
  border-bottom: 1px solid black;
}
.van-card__price{
  background-color: rgb(235, 171, 235);
}
</style>