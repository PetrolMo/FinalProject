<template>
  <div class="home">
    <div class="home-title">
      <el-card shadow="always">
        <div class="title-msg">工作台</div>
        <el-row>
          <el-col :span="2" :offset="1">
            <el-avatar :size="60" :src="avatar"></el-avatar>
          </el-col>
          <el-col :span="4">
            <div class="greetings">早上好,admin</div>
            <div class="weather">今天是大太阳天,30~35°,天热,注意不要出门</div>
          </el-col>
          <el-col :span="6" :offset="11">
            <el-row>
              <el-col class="item" :span="14">
                <i class="el-icon-edit-outline p4em"/>
                <span>代办事项  </span>
                <span class="item item-text" :span="2">1/8</span>
              </el-col>
            </el-row>
            <el-row >
              <el-col :push="1" class="item item-text" :span="12"><el-progress :percentage="12.5" :stroke-width="12"></el-progress></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="home-card m120">

    </div>
    <el-container>

    </el-container>
  </div>

</template>

<script>
import { ref, reactive, defineComponent, toRefs, onMounted, onUnmounted } from 'vue'
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

    //组件挂载的过程。数据 dom
    //1.发请求
    //数据初始化参数 从路由传参中获取参数
    onMounted(() => {
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
.home {
  padding-bottom: 4em;

  .home-title {
    .title-msg {
      font-size: 20px;
      padding-bottom: 2rem;
    }

    .greetings {
      font-size: 18px;
      line-height: 30px;
      letter-spacing: .1em;
    }

    .weather {
      font-size: 14px;
      color: #999;
      line-height: 24px;
      letter-spacing: .1em;
    }

    .item {
      color: #808695;
      text-align: center;
      padding: 0.5em;
    }

    .item-text {
      font-weight: 700;
      font-size: 20px;
      color: #000000;
    }
  }

  .home-card {
    .card-text {
      font-size: 12px;
      font-weight: 400;
      color: #494b52;
      letter-spacing: .1em;
      padding-top: 0.4em;
    }
  }

  .home-chart {
    .satisfaction {
      padding-top: 0.2em;
      text-align: center;
    }

    .satisfaction-number {
      font-weight: 700;
      font-size: 30px;
      color: #515a6e;
      line-height: 120px;
      text-align: center;
    }

    .satisfaction-image {
      width: 60px;
      height: 60px;
      text-align: center;
    }

    .satisfaction-msg {
      line-height: 35px;
      color: #808695;
      font-size: 14px;
      text-align: center;
    }

    .satisfaction-ratio {
      line-height: 120px;
      color: #36c17b;
      font-size: 18px;
      text-align: center;
    }

    .sale-item {
      border-radius: 0.2em;
      line-height: 3.2em;
      text-align: center;
      margin: 1em 0;

      .item-image {
        top: 0.6em;
      }

      .item-num {
        height: 2.4em;
        line-height: 2.4em;
        color: white;
        font-weight: bold;
        font-size: 20px;
        text-align: right;
        padding-right: 1em;
      }
    }
  }
}
</style>