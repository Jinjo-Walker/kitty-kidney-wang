<template>
  <div class="infocheck">
    <van-nav-bar
      :title="`设置${$route.query.kw}`"
      left-arrow
      @click-left="$router.push('/change_info')"
      class="nav"
      ><template #right>
        <button
          class="right"
          v-text="$route.query.kw && $route.query.kw != '头像' ? '保存' : ''"
          :disabled="disabled"
          @click="onClickRight"
        ></button> </template
    ></van-nav-bar>
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
      <van-field
        v-model="user_yzm"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
            ref="yzm_btn"
            size="small"
            type="primary"
            @click="send_yzm(old_phone)"
            >发送验证码</van-button
          >
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
    <div v-else-if="$route.query.kw == '密码'">
      <van-cell-group>
        <van-field v-model="old_pwd" placeholder="请输入旧密码" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="new_pwd" placeholder="请输入新密码" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="con_pwd" placeholder="重新输入新密码" />
      </van-cell-group>
      <span class="rule">密码限6-10位数字或英文</span>
    </div>
    <div v-else>
      <van-empty description="空空如也" />
    </div>
  </div>
</template>

<script>
import { upload, change_info, yzm, change_private } from "@/api/user_axios.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      user_name: "",
      old_phone: "",
      new_phone: "",
      user_yzm: "",
      yzm: -1,
      old_pwd: "",
      new_pwd: "",
      con_pwd: "",
      fileList: [{url:this.$store.state.avatar}],
      disabled: false,
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
    send_yzm(info) {
      if (this.old_phone) {
        yzm(info).then((res) => {
          var count = 60;
          var btn = this.$refs.yzm_btn;
          btn.disabled = true;
          var t = setInterval(() => {
            if (count > 1) {
              count--;
              btn.innerHTML = `${count}s`;
            } else {
              btn.innerHTML = `发送验证码`;
              btn.disabled = false;
              this.yzm = -1;
              clearInterval(t);
            }
          }, 1000);
          if (res.yzm) {
            this.yzm = res.yzm;
          }
        });
      } else {
        Toast.fail("请输入原手机号");
      }
    },
    onClickRight() {
      var info = "";
      if (this.$route.query.kw == "用户名") {
        if (this.user_name) {
          info = { user_name: this.user_name, id: this.$store.state.uid };
          change_info(info).then((res) => {
            if (res.code == 200) {
              Toast.success("修改成功");
            } else {
              Toast.fail("修改失败");
            }
          });
        } else {
          return;
        }
      } else if (this.$route.query.kw == "手机") {
        if (this.old_phone && this.user_yzm && this.new_phone) {
          if (this.user_yzm == this.yzm && this.yzm != -1) {
            info = {
              old_phone: this.old_phone,
              new_phone: this.new_phone,
              id: this.$store.state.uid,
            };
            change_private(info).then((res) => {
              if (res.code == 200) {
                Toast.success("修改成功");
              } else {
                Toast.fail(res.message);
              }
            });
          } else {
            console.log(this.user_yzm, this.yzm);
            Toast.fail("验证码错误");
          }
        } else {
          Toast.fail("输入项不能为空");
        }
      } else if (this.$route.query.kw == "密码") {
        if (this.old_pwd && this.new_pwd && this.con_pwd) {
          if (this.new_pwd == this.con_pwd) {
            info = {
              old_password: this.old_pwd,
              new_password: this.new_pwd,
              id: this.$store.state.uid,
            };
            change_private(info).then((res) => {
              if (res.code == 200) {
                Toast.success("修改成功");
              } else {
                Toast.fail(res.message);
              }
            });
          } else {
            Toast.fail("两次输入密码不一致");
          }
        } else {
          Toast.fail("输入项不能为空");
        }
      }
    },
  },
  watch: {
    user_name(newv, oldv) {
      if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{6,15}$/.test(newv)) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    old_phone(newv, oldv) {
      if (!/^1[3-9]\d{9}$/.test(newv)) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    new_phone(newv, oldv) {
      if (!/^1[3-9]\d{9}$/.test(newv)) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    old_pwd(newv, oldv) {
      if (!/^[0-9a-zA-Z]{6,10}$/.test(newv)) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    new_pwd(newv, oldv) {
      if (!/^[0-9a-zA-Z]{6,10}$/.test(newv)) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
  },
};
</script>

<style lang="scss">
.infocheck {
  background-color: #f7f7f7;
  height: 100vh;
  .nav .van-icon,
  .van-nav-bar__title,
  .right {
    color: black;
    font-weight: 800;
    font-size: 16px;
  }
  .right {
    border: none;
    background-color: #f7f7f7;
  }
  .right:disabled {
    color: lightgrey;
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
    padding: 0px 10px;
  }
  .van-button:disabled {
    background-color: rgb(204, 199, 199);
    padding: 0px 10px;
    border: none;
  }
  .van-uploader {
    margin: 10px;
    display: block;
  }
}
</style>
