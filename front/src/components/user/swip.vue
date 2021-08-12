<template>
  <div>
      <!-- 顶部轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" :style="{'height':h}">
    <!-- 给轮播图设置懒加载 -->
      <van-swipe-item v-for="(image, i) in images" :key="i">
      <img v-lazy="image" />
      </van-swipe-item>
      </van-swipe>
  </div>
</template>

<script>
export default {
    props:['images'],
    data(){
        return{
       h:'0px',
        }
    },
    methods:{
         //初始化轮播图高度
    initSwipeHeight(){
      //计算轮播图高度，对h进行变量赋值
      let picw =1920;//图片宽度
      let pich=800;//图片高度
      let imgw=window.screen.width;//屏幕宽度
      let imgh=((imgw*pich)/picw)+'px';
      this.h=imgh;
    
     }
    },
    mounted(){
    this.initSwipeHeight();
  }
}
</script>

<style scoped>
img{width: 100%;}
</style>