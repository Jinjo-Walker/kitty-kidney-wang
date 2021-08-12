<template>
  <div class="cla">
    <div id="div">
      <div class="coupon">
        <div class="money">
          <span>￥</span>
          <span>10</span>
        </div>
        <div class="cpn">优惠券</div>
      </div>
      <div class="item">
        <ul>
          <li><van-tag class="tag">外卖券</van-tag><span class="content">满100减10</span></li>
          <li>2021/02/17</li>
          <li>使用规则 ></li>
        </ul>
      </div>
      <div class="btn">
        <button><span>去使用</span></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.cla {
  padding: 15px;
}
#div {
  width: 100%;
  line-height: 160%;
  display: flex;
  align-items: center;
  background-color: #ffff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}
.money,.cpn {
  text-align: center;
  margin-left: 10px;
}

.coupon,
.item {
  margin: 10px 10px;
}
.coupon span:nth-child(2) {
  font-size: 30px;
  font-weight: bold;
}
.coupon span {
  color: rgb(231, 25, 25);
}
.tag {
  background-color: rgb(235, 216, 45);
  margin-bottom: 10px;
}

.item li {
  font-size: 12px;
  :first-child {
    color: rgb(231, 25, 25);
  }
}

.btn button {
  margin-right: 25px;
  width: 75%;
  border: 0;
  background-color: rgb(238, 121, 67);
  border-radius: 5px;
}
.btn button span {
  line-height: 30px;
  font-size: 15px;
  color: #fff;
}
.content{
  font-size: 18px;
  padding-left:5px ;
}
</style>

