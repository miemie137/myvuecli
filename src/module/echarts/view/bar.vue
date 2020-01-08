<template>
<div>
  <div :id="`echartsBar_${index}`" v-for="(item,index) in echartList" :key="index" style="height:345px">

  </div>
</div>
</template>

<script>
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  name: 'bar',
  data () {
    return {
      echartList:[
        {
          width:300,
          title: {
                text: '柱状图'
              },
          tooltip: {},
          xAxis: {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
        }]
      },
      {
        width:300,
        title: {
              text: '折线图'
            },
        xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
      }
      ]
    }
  },
  computed: {
  
  },
  mounted() {
    this.echartList.forEach((item,index) => {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(`echartsBar_${index}`));
      // 绘制图表
      myChart.setOption(item);
    });   
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>
