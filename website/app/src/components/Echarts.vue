<template>
  <div :id="name" :style="chartStyle"></div>
</template>

<script>
import { onMounted, onUnmounted, inject } from 'vue'
export default {
  name: 'Echarts',
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    chartOptions: {
      type: Object,
      required: true
    },
    chartStyle: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    let echarts = inject("ec");//引入
    //组件挂载的过程。数据 dom
    //1.发请求
    //数据初始化参数 从路由传参中获取参数
    onMounted(() => {//需要获取到element,所以是onMounted的Hook
      let myChart = echarts.init(document.getElementById(props.name));
      // 绘制图表
      myChart.setOption(props.chartOptions);
      window.onresize = function () {//自适应大小
        myChart.resize();
      };
    });
    //组件卸载后的操作
    //清除定时器，清除闭包函数
    onUnmounted(() => {
      echarts = null
    })
  }
}
</script>

<style scoped>

</style>
