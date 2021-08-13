<template>
  <div class="infocheck">
    <van-nav-bar
      :title="`设置${$route.query.kw}`"
      left-arrow
      :right-text="$route.query.kw && $route.query.kw != '头像' ? '保存' : ''"
      @click-left="$router.push('/change_info')"
      @click-right="onClickRight"
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
      <van-uploader
        v-model="fileList"
        multiple
        max-count="1"
        :after-read="uploadAvatar"
      />
      <span class="rule">限jpg、png、jpeg等图片文件</span>
    </div>
    <div v-else>
      <van-empty description="空空如也" />
    </div>
  </div>
</template>

<script>
import { upload,change_info } from "@/api/user_axios.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      user_name: "",
      old_phone: "",
      sms: "",
      new_phone: "",
      fileList: [],
    };
  },
  methods: {
    uploadAvatar(file) {
      let fd = new FormData();
      fd.append("avatar", file.file);
      fd.append("id", this.$store.state.uid);
      upload(fd).then((res) => {
        if (res.code == 200) {
          Toast.success("上传成功");
        } else {
          Toast.fail("上传失败");
        }
      });
    },
    onClickRight() {
      var info = "";
      var flag_name = /^[\u4e00-\u9fa5a-zA-Z0-9]{6,15}$/.test(this.user_name);
      var flag_phone = /^1[3-9]{11}$/.test(this.old_phone) && /^1[3-9]{11}$/.test(this.new_phone);
      console.log(flag_phone);
      if (this.$route.query.kw == "用户名" && flag_name) {
        info = `user_name=${this.user_name}`;
      }
      // else if(this.$route.query.kw == "手机" && flag_phone){
      //   info = `phone=${this.new_phone}`;
      // }
      change_info(info).then((res) => {
        if (res.code == 200) {
          Toast.success("修改成功");
        } else {
          Toast.fail("修改失败");
        }
      });
    },
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
  .van-uploader {
    margin: 10px;
    display: block;
  }
}
</style>
