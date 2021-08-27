<template>
    <div>
        <van-nav-bar
      class="title"
      title="店铺近五天营收"
      left-arrow
      @click-left="$router.push('/merchant')"
      style="background-color: #e7e"
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
                text: '店铺近五天营收/元',
                textStyle:{
                    color:'#b3f'
                }
            },
            // 鼠标悬浮提示信息
            tooltip: {},
            legend: {
                data:['PE值']
            },
            xAxis: {
                data: ["8.24","8.25","8.26","8.27","8.28"]
            },
            yAxis: {},
            series: [
                {
                name: '收益',
                type: 'bar',
                color:'#e7e',
                data: [1220, 1559, 1177,1530,1835]
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