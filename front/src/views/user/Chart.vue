<template>
    <div>
        <van-nav-bar
      class="title"
      title="品牌近五年PE走势"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      style="background-color: #0baff0"
      fixed
    />
        <div id="myChart"></div>
    </div>
</template>

<script>

export default {
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        let chart = this.$echarts.init(document.getElementById('myChart'))
        let option={
            title: {
                text: '品牌近五年PE走势',
                textStyle:{
                    color:'#333'
                }
            },
            // 鼠标悬浮提示信息
            tooltip: {},
            legend: {
                data:['PE值']
            },
            xAxis: {
                data: ["2017","2018","2019","2020","2021"]
            },
            yAxis: {},
            series: [
                {
                name: '销量',
                type: 'line',
                color:'#e7e',
                data: [15, 20, 27, 20, 33]
            }
        ]
        };
    chart.setOption(option);//设置图标的样式、内容
    },
    onClickLeft(){
      this.$router.replace({ path: "/mine" });
    }
  }
}
</script>

<style scoped lang="scss">
    #myChart{
        margin: 70px auto 0;
        width: 80%;
        height: 300px;
    }

</style>