<template>
    <router-view></router-view>
</template>

<script>

import * as echarts from 'echarts'
import {defineComponent, provide} from 'vue'
export default defineComponent({
  name: 'App',
  setup(){
    provide('ec', echarts)
  }
})
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#nprogress .bar {
  /*自定义进度条颜色*/
  background: #29b6f6 !important;
}
</style>
