<template>
  <div class="infocheck">
    <van-nav-bar
      :title="`设置${$route.query.kw}`"
      left-arrow
      :right-text="$route.query.kw ? '保存' : ''"
      @click-left="$router.push('/change_info')"
      class="nav"
    />
    <div v-if="$route.query.kw == '用户名'">
      <van-cell-group>
        <van-field v-model="user_name" placeholder="请输入用户名" />
      </van-cell-group>
      <span class="rule">限6-15位中文、数字或英文</span>
    </div>
    <div v-else-if="$route.query.kw == '手机'">
      <van-cell-group>
        <van-field v-model="old_phone" placeholder="请输入旧手机号" />
      </van-cell-group>
      <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <van-cell-group>
        <van-field v-model="new_phone" placeholder="请输入新手机号" />
      </van-cell-group>
      <span class="rule">手机号限11位数字</span>
    </div>
    <div v-else-if="$route.query.kw == '头像'">
      <van-uploader v-model="fileList" multiple max-count="1"/>
      <span class="rule">限jpg、png、jpeg等图片文件</span>
    </div>
    <div v-else>
      <van-empty description="空空如也" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_name: "",
      old_phone: "",
      sms: "",
      new_phone: "",
      fileList:[]
    };
  },
};
</script>

<style lang="scss">
.infocheck {
  background-color: #f7f7f7;
  height: 100vh;
  .nav .van-icon,
  .van-nav-bar__text,
  .van-nav-bar__title {
    color: black;
    font-weight: 800;
    font-size: 16px;
  }
  .van-cell-group {
    margin: 10px 0px;
  }
  .rule {
    margin: 10px;
    font-size: 8px;
    color: #9c9c9c;
  }
  .van-button {
    background-color: #d12ee6;
    border: none;
  }
   .van-uploader{
    margin: 10px;
    display: block;
  }
}
</style>
