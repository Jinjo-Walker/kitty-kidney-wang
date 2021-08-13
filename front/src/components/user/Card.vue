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

