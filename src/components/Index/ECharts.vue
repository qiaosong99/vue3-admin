<!--
 * @Author: qiaosong 920323693@qq.com
 * @Date: 2023-01-06 13:03:22
 * @LastEditors: qiaosong 920323693@qq.com
 * @LastEditTime: 2023-01-06 20:47:38
 * @FilePath: \newbee-admimn\src\components\Index\ECharts.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="zoom"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let myChart = null

onMounted(() => {
  if (window.echarts) {
    // 基于准备好的dom，初始化echarts实例
    myChart = window.echarts.init(document.getElementById('zoom'))

    // 指定图表的配置项和数据
    const option = {
  title: {
    text: '系统折线图'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['新增注册', '付费用户', '活跃用户', '订单数', '当日总收入']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '新增注册',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 150, 220, 240, 230, 270, 210]
    },
    {
      name: '付费用户',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [240, 187, 162, 154, 259, 364, 347]
    },
    {
      name: '活跃用户',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [180, 252, 154, 256, 148, 330, 410]
    },
    {
      name: '订单数',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 201, 254, 270, 120, 345]
    },
    {
      name: '当日总收入',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [820, 932, 901, 934, 1420, 1530, 2120]
    }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
})
onUnmounted(() => {
  myChart.dispose()
})
</script>

<style scoped>
#zoom {
   min-height: 300px;
}
</style>
