
<template>
  <div>
    <van-nav-bar left-arrow title="遇到问题"></van-nav-bar>
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
      activeName: "1"
    };
  }, 
  mounted() {
    
  }
};
</script>


