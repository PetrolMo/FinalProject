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
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: default;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#nprogress .bar {
  /*自定义进度条颜色*/
  background: #29b6f6 !important;
}
</style>
