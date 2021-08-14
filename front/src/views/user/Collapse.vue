
<template>
  <div>
    <van-nav-bar  left-text="返回" name="arrow-left"  left-arrow @click-left="onClickLeft" />
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="找回密码" name="1">找回密码</van-collapse-item>
      <van-collapse-item title="手机号无法接收短信" name="2">手机号无法接收短信</van-collapse-item>
      <van-collapse-item title="找回原账号" name="3">找回原账号</van-collapse-item>
      <van-collapse-item title="询问在线客服" name="4">询问在线客服</van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
   
  }
};
</script>


