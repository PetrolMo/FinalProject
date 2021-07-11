<template>
  <div class="main">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Degrees That Pay Back</el-menu-item>
      <el-menu-item index="2">Salaries By Colleges Type</el-menu-item>
      <el-menu-item index="3">Salary Comparison</el-menu-item>
    </el-menu>
    <keep-alive include="Menu1">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, onMounted}  from 'vue'
import {useRouter} from 'vue-router'
export default defineComponent({
  name: "Data",
  setup(props,ctx){
    let activeIndex = ref(1)
    const router = useRouter()
    function handleSelect(e){
      let ev = e || event
      router.push({path:'menu'+ev})
    }
    onMounted(() => {
      router.push({path:'menu' + activeIndex.value})
    })
    return{
      activeIndex,
      handleSelect
    }
  }
})
</script>

<style lang="less" scoped>
@import "src/common/style/common";
.main{
}
</style>