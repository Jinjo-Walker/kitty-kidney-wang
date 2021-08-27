<template>
  <div class="order">
    <div class="order_top">
      <div class="order_img"><img src="/img/banner/1.jpg" alt="" /></div>
      <div class="commodity">
        <ul>
          <li>
            <span>{{ order_one.address }}</span>
          </li>
          <li><span>{{moment(order_one.time).format('YYYY/MM/DD HH:mm:ss')}}</span></li>
          <li><div><img :src="`http://${item.picture}`" alt="" class="menu_img" v-for="(item,index) in picAll" :key="`${index}1`"/></div></li>
        </ul>
      </div>
      <div class="details">
        <ul>
          <li>已完成</li>
          <li>￥{{ order_one.total }}</li>
          <li><button class="btn1" @click="Delete(order_one.orderid)">删除订单</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {order_delete} from '@/api/user_axios.js'
export default {
  props: ["order_one", "picAll","show"],
  data() {
    return {};
  },

  created() {
  },

  methods: {
    Delete(oid){
      order_delete(oid).then((res)=>{
        // console.log(res);
        // this.$router.go(0);
        this.show();
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.order {
  //   line-height: 160%;
  //   display: flex;
  //   align-items: center;
  background-color: #ffff;
  border-radius: 10px;
  margin: 12px 12px 0 12px;
  //   display: flex;
  //   justify-content: space-between;
  .order_top {
    display: flex;
    justify-content: space-between;
  }
  .menu_img {
    width: 15vw;
    height: 8vh;
    margin-right: 5px;
  }
  .order_img {
    img {
      width: 9vw;
      height: 5vh;
    }
    padding: 10px 0 0 15px;
  }
  .commodity {
    padding: 10px 60px 0 0;
  }
  .details {
    padding-right: 15px;
  }
  .details ul li {
    text-align: right;
  }

  .commodity ul :nth-last-child(3) {
    font-size: 18px;
    font-weight: bold;
  }
  .commodity ul :nth-last-child(2) {
    font-size: 5px;
    color: grey;
  }
  .commodity ul >:nth-child(3) div{
    font-size: 10px;
    padding-top: 15px;
    overflow-x:auto ;
    overflow-y:hidden ;
    white-space: nowrap;
    width: 35vw;
  }
  .details ul :nth-last-child(3) {
    font-size: 10px;
    color: rgb(209, 144, 23);
    padding-top: 15px;
  }
  .details ul :nth-last-child(2) {
    padding-top: 29px;
  }
  .details .btn1 {
    border-radius: 20px;
    height: 33px;
    width: 95px;
    border: 1px solid grey;
    margin: 15px 0 10px 0;
    background-color: #ffff;
  }
}
</style>
