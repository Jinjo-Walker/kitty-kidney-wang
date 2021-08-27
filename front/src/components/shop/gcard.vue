<template>
  <div class="my-card">
    <van-card
      :thumb="`http://${$store.state.menu[kind][i].picture}`"
      :title="$store.state.menu[kind][i].cname"
      :desc="$store.state.menu[kind][i].cname"
    >
      <template #tags>
        <div class="my-card-price-all">
          ￥
          <span class="my-card-price">{{
            $store.state.menu[kind][i].price
          }}</span>
        </div>
        
        <div class="my-two-btn">
          <van-tag>
            <button class="my-two-btn1"><van-icon name="setting-o" /></button>
          </van-tag>
          <van-tag>
            <button><van-icon name="delete-o" /></button>
          </van-tag>
        </div>
      </template>
      <template #footer>
        <van-tag type="white">
          <van-switch :value="checked" @input="onInput" size="22px" active-color="#b6f" inactive-color="#dcdee0" />
        </van-tag>
        </template>
    </van-card>
    
  </div>
</template>

<script>
export default {
  props: ["kind", "i"],
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    onInput(checked) {
      this.$dialog.confirm({
        title: '提醒',
        message: '是否切换在售状态？',
      }).then(() => {
        this.checked = checked;
      });
    },
  },
};
</script>