<template>
  <div class="changeinfo">
    <van-nav-bar
      title="修改信息"
      left-arrow
      @click-left="$router.push('/mine')"
      class="nav"
    />
    <span class="ux">用户信息</span>
    <van-cell title="密码" arrow-direction is-link to="info_check?kw=密码" />
    <van-cell title="用户名" :value="$store.state.user_name" arrow-direction is-link to="info_check?kw=用户名" />
    <van-cell title="手机" :value="`${$store.state.phone.slice(0,4)}****${$store.state.phone.slice(7)}`" arrow-direction is-link to="info_check?kw=手机" />
    <van-cell title="头像" arrow-direction is-link to="info_check?kw=头像" />
    <van-cell title="地址" value="查看" arrow-direction is-link to="mine" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.changeinfo {
  background-color: #f7f7f7;
  height: 100vh;
  .nav .van-icon {
    color: black;
  }
  .van-cell{
      border-bottom: 1px solid #EBEBEB;
  }
  .ux{
      margin: 10px;
      font-size: 8px;
      line-height: 50px;
      color: #9C9C9C;
  }
}
</style>
