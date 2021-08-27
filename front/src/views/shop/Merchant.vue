<template>
  <div class="mer">
    <div class="header">
      <div class="header-pop">
        <van-popover
          v-model="showPopover"
          trigger="click"
          placement="bottom-start"
          :actions="actions"
          theme="dark"
        >
          <template #reference>
            <van-icon name="wap-nav" size="23" />
          </template>
        </van-popover>
      </div>

      <div class="it">
        <van-search
          background="#FB451D"
          v-model="value"
          maxlength="8"
          shape="round"
          show-action
          placeholder="请输入订单号/手机号查询"
          @search="onSearch3"
        >
          <template #action>
            <div @click="onSearch3">搜索</div>
          </template>
        </van-search>
      </div>
    </div>
    <div class="bod">
      <div class="btns">
        <div class="btn1">
          <span style="font-size: 22px">{{ count }}</span>
          <span style="font-size: 12px">待接单</span>
        </div>
        <div class="btn2">
          <span style="font-size: 22px">{{ count }}</span
          ><span style="font-size: 12px">待配送</span>
        </div>
        <div class="btn3">
          <span style="font-size: 22px">{{ count }}</span
          ><span style="font-size: 12px">已完成</span>
        </div>
      </div>
      <div class="square">
        <div class="get">
          <div class="get-sp">
            今日收款<span>&nbsp;{{ count }}&nbsp;</span>笔，共计
          </div>
          <div class="get-money">￥{{ total.toFixed(2) }}</div>
        </div>

        <van-divider
          :style="{
            color: '#1989fa',
            borderColor: '#DEDEDE',
            padding: '0 16px',
            margin: '0px',
          }"
        />
        <div class="txt">
          <div class="txt-div">
            <div class="txt-name">
              <div>
                <van-icon name="/img/banner/sk.png" size="25" />
              </div>
              <div>收款记录</div>
            </div>
            <div class="txt-name">
              <div>
                <van-icon name="/img/banner/baobiao.png" size="25" />
              </div>
              <div @click="$router.push('/shopchart')">经营报表</div>
            </div>
            <div class="txt-name">
              <div>
                <van-icon name="/img/banner/tixing.png" size="25" />
              </div>
              <div>收款提醒</div>
            </div>
          </div>
          <div class="txt-name">
            <div>
              <van-icon name="/img/banner/person.png" size="25" />
            </div>
            <div>收款店员</div>
          </div>
        </div>
      </div>
      <div class="cell">
        <div class="cell-three">
          <div class="cell-span">
            <div>
              <span>门店日记</span>
            </div>
            <div><van-icon name="arrow" /></div>
          </div>
          <van-divider
            :style="{
              color: '#1989fa',
              borderColor: '#DEDEDE',

              margin: '20px',
            }"
          />
          <div class="cell-span">
            <div>
              <span>收款工具</span>
            </div>
            <div><van-icon name="arrow" /></div>
          </div>
          <van-divider
            :style="{
              color: '#1989fa',
              borderColor: '#DEDEDE',

              margin: '20px',
            }"
          />
          <div class="cell-span">
            <div>
              <span>海报中心</span>
            </div>
            <div><van-icon name="arrow" /></div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <van-tabbar v-model="active" fixed style="height: 55px">
        <van-tabbar-item icon="shop-o" @click="$router.push('/goods')">管理</van-tabbar-item>
        <van-tabbar-item icon="chat-o" @click="changeurl">消息</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { shop_info } from "@/api/shop_axios.js";
export default {
  data() {
    return {
      actions: [
        { text: "订单管理" },
        { text: "菜单管理" },
        { text: "营收统计" },
        { text: "资金管理" },
        { text: "客户管理" },
        { text: "评价管理" },
      ],
      value: "",
      active: "",
      showPopover: false,
      shop_info: [],
      count: 0,
      total: 0,
    };
  },
  mounted() {
    this.show();
    setInterval(() => {
      this.total = 0;
      this.show();
    }, 10000);
  },
  methods: {
    onSearch3() {
      console.log(this.value);
    },
    show() {
      shop_info(`businessid=1`).then((res) => {
        this.count = res.result.length;
        for (let i of res.result) {
          this.total += Number(i.total);
        }
      });
    },
    changeurl(){
      location.href="http://localhost:8081/?sendId=2"
    }
  },
};
</script>

<style lang="scss" scoped>
.mer {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fb451d;
  }
  .header-pop {
    padding-left: 15px;
  }
  .van-search__content--round {
    height: 30px;
  }
  .van-cell[data-v-27c058b7] {
    padding: 4px 0;
  }
  .bod {
    background-color: #ededed;
    height: 95vh;
    padding-top: 10px;
  }
  .wap {
    padding-left: 20px;
  }
  .it {
    padding-right: 10px;
    width: 400px;
    color: #ecb829;
  }
  .btns {
    height: 100px;
    background-color: #ffffff;
    margin: 0 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .square {
    margin: 10px;
    background-color: #ffffff;
    border-radius: 10px;
  }
  .get {
    text-align: center;
    padding-top: 35px;
  }
  .get-sp span {
    background-color: #f2f0cf;
    color: #c4b625;
    font-size: 20px;
    font-weight: 500;
  }
  .get-money {
    color: #e2d480;
    font-size: 35px;
    padding-top: 10px;
  }
  .txt {
    margin: 20px 20px 0 20px;
  }
  .txt-div {
    display: flex;
    justify-content: space-between;
  }
  .txt-name {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
  }
  .cell {
    margin: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    height: 200px;
  }
  .cell-three {
    padding: 20px;
    font-size: 15px;
  }
  .cell-span {
    display: flex;
    justify-content: space-between;
  }
  .btn1,
  .btn2,
  .btn3 {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    flex-grow: 1;
    padding: 12px 31px;
    color: white;
    border-radius: 10px;
  }
  .btn1 {
    background-color: #f72612;
    margin-left: 15px;
  }
  .btn2 {
    background-color: #29c9eb;
    margin: 0 15px;
  }
  .btn3 {
    background-color: #ffc118;
    margin-right: 15px;
  }
}
</style>