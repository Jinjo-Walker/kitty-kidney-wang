<template>
  <div class="my-card">
    <van-card :thumb="img" title="肉肉">
      <template #tags>
        <div class="my-card-desc">来数肉肉一二三西五六七八九十块来数肉肉一二三西五六七八九十块来数肉肉一二三西五六七八九十块</div>
        <div class="my-card-price-all my-card-price-n">￥
          <span class="my-card-price">3.1</span>
        </div>
        <div class="my-two-btn">
          <van-tag>
            <button class="my-two-btn1">－</button>
          </van-tag>
          <span class="my-count">1</span>
          <van-tag>
            <button>＋</button>
          </van-tag>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "/img/banner/rourou.jpg",
    };
  },
};
</script>

