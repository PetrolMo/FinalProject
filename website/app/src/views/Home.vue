<template>
  <div class="home">
    <div class="home-title">
<!--      <el-card shadow="always">-->
<!--        <div class="title-msg">工作台</div>-->
<!--        <el-row>-->
<!--          <el-col :span="2" :offset="1">-->
<!--            <el-avatar :size="60" :src="avatar"></el-avatar>-->
<!--          </el-col>-->
<!--          <el-col :span="4">-->
<!--            <div class="greetings">早上好,admin</div>-->
<!--            <div class="weather">今天是大太阳天,30~35°,天热,注意不要出门</div>-->
<!--          </el-col>-->
<!--          <el-col :span="6" :offset="11">-->
<!--            <el-row>-->
<!--              <el-col class="item" :span="14">-->
<!--                <i class="el-icon-edit-outline p4em"/>-->
<!--                <span>代办事项  </span>-->
<!--                <span class="item item-text" :span="2">1/8</span>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row >-->
<!--              <el-col :push="1" class="item item-text" :span="12"><el-progress :percentage="12.5" :stroke-width="12"></el-progress></el-col>-->
<!--            </el-row>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-card>-->
    </div>
    <div class="home-card m120">

    </div>
    <el-container>
      <el-card class="chartsArea" id="customerChart"></el-card>
    </el-container>
  </div>

</template>

<script>
import { ref, reactive, defineComponent, toRefs, onMounted, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name:'Home',
  //接收父组件的数据
  props:{

  },
  //定义子组件
  components:{

  },
  //组件创建的过程
  setup(props,ctx){
    const router = useRouter()
    const state = reactive({
      avatar:require('@/assets/avatar.jpeg')
    })
    let echarts = inject("ec");//引入
    //组件挂载的过程。数据 dom
    //1.发请求
    //数据初始化参数 从路由传参中获取参数
    onMounted(() => {//需要获取到element,所以是onMounted的Hook
      let myChart = echarts.init(document.getElementById("customerChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "总用户量" },
        tooltip: {},
        xAxis: {
          data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
      window.onresize = function () {//自适应大小
        myChart.resize();
      };
    });

    //组件卸载后的操作
    //清除定时器，清除闭包函数
    onUnmounted(() => {

    })
    return{
      name,
      ...toRefs(state)
    }
  },
})
</script>

<style lang="less">
@import "src/common/style/common";
  .chartsArea{
    width: 100vw;
    height: 80vh;
  }
</style>