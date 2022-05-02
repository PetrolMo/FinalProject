<template>
  <div class="data-analysis">
    <el-row class="data-top" :gutter="20">
      <el-col :span="18">
        <el-card class="overview" shadow="always">
          <template #header>数据概览</template>
          <div class="data-item">
            <div class="all-input">
              <div class="title">今日交易总额</div>
              <div>
                <span class="num">123,345</span>
                <span class="unit">元</span>
              </div>
            </div>
            <div class="new-users">
              <div class="title">昨日新增用户</div>
              <div>
                <span class="num">23,345</span>
                <span class="unit">个</span>
              </div>
            </div>
            <div class="activities">
              <div class="title">当前活动数量</div>
              <div>
                <span class="num">123</span>
                <span class="unit">个</span>
              </div>
            </div>
            <div class="todos">
              <div class="title">
                <span>当前待办</span>
                <span class="el-icon-message-solid" style="color: orange"></span>
              </div>
              <div>
                <span class="num">123</span>
                <span class="unit">件</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="visit">
          <template #header>
            近期活动访问量
          </template>
          <div class="visit-title">
            <div class="date">2022-03-15</div>
            <div class="title">毕业季义卖活动</div>
          </div>
          <div class="visit-chart">
            <Echarts :chart-options="chartOptions" :name="name" :chart-style="chartStyle"></Echarts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="data-body" shadow="always">
        <template #header>
          <div class="tabs">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="发布量" name="release"></el-tab-pane>
              <el-tab-pane label="交易量" name="volume"></el-tab-pane>
            </el-tabs>
            <div class="filters">
              <el-radio-group v-model="date" size="small">
                <el-radio-button label="day">今日</el-radio-button>
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">全年</el-radio-button>
              </el-radio-group>
              <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  style="margin-left: 26px; width: 250px"
                  size="small"
                  range-separator="到"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </template>
        <el-row :gutter="50" class="data-body-chart">
          <el-col :span="18">
            <Echarts :chart-style="dataChartStyle" :chart-options="dataChartOptions" :name="data_name"></Echarts>
          </el-col>
          <el-col :span="6">
            <div class="title">
              <span>用户发布商品数量排名</span>
              <span class="info" @click="showDialog = true">点击查看详情</span>
            </div>
            <div class="list" v-for="user in list" :key="user.rank">
              <div class="rank">{{user.rank}}</div>
              <div class="username">{{user.username}}</div>
              <div class="account">{{user.account}}</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-dialog
        v-model="showDialog"
        width="80vw"
        top="10vh"
    >
      <template #title>
        <div>排名详情</div>
      </template>
      <el-table
          ref="multipleTableRef"
          :data="tableData"
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="排名" width="120">
          <template #default="scope">
            <span style="padding-right: 10px">{{ scope.row.number }}</span>
            <span v-if="scope.row.rise">
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 0L9 7H0L4.5 0Z" fill="#E2394E"/>
              </svg>
            </span>
            <span v-else>
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 7L6.11959e-07 -1.26364e-06L9 -4.76837e-07L4.5 7Z" fill="#4DCB73"/>
              </svg>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="id" label="用户ID" width="120" align="left" />
        <el-table-column property="user_name" label="用户昵称" show-overflow-tooltip width="120" align="left"  />
        <el-table-column property="post_goods_nums" label="总商品发布数" width="150" align="center" :sortable="true" />
        <el-table-column property="order_nums" label="总交易订单数" width="150" align="center" :sortable="true"  />
        <el-table-column property="update_time" label="更新时间" width="220" align="left" />
        <el-table-column property="options" label="操作" align="left">
          <template #default="scope">
            <el-button type="text">配置</el-button>
            <el-button type="text">查看主页</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import Echarts from '../../components/Echarts'
export default {
  name: "Analysis",
  components: {
    Echarts
  },
  setup () {
    const chartOptions = reactive({
      tooltip: {},
      grid: {
        bottom: 0,
        top: 20,
        left: 0,
        right: 0,
        containLabel: true
      },
      xAxis: {
        data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
        type: 'category',
        nameLocation: 'start',
        axisLine: {
          show: false,
          symbol: 'none',
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        axisLine: {
          show: false
        }
      },
      series: [
        {
          name: "用户量",
          type: "line",
          smooth: true,
          data: [5, 20, 36, 10, 10, 20],
          areaStyle: {
            color: 'rgba(24, 144, 255, 0.2)'
            // color: {
            //   type: 'linear',
            //   x: 0,
            //   y: 0,
            //   x2: 0,
            //   y2: 1,
            //   colorStops: [{
            //     offset: 0,
            //     color: 'rgba(244,83,37,0.3)' // 0% 处的颜色
            //   }, {
            //     offset: 1,
            //     color: 'rgba(244,83,37,0)' // 100% 处的颜色
            //   }],
            //   global: false // 缺省为 false
            // }
          },
          lineStyle: {
            color: '#1890FF'
          }
        },
      ],
    })
    const dataChartOptions = reactive({
      tooltip: {},
      title: {
        text: '发布商品数量趋势',
        textStyle: {
          fontFamily: 'PingFang SC',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.85)'
        }
      },
      grid: {
        bottom: 0,
        top: 60,
        left: 0,
        right: 0,
        containLabel: true
      },
      xAxis: {
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        type: 'category',
        nameLocation: 'start',
        axisLine: {
          show: false,
          symbol: 'none',
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        axisLine: {
          show: false
        }
      },
      series: [
        {
          name: "用户量",
          type: "bar",
          smooth: true,
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
          areaStyle: {
            color: 'rgba(24, 144, 255, 0.2)'
            // color: {
            //   type: 'linear',
            //   x: 0,
            //   y: 0,
            //   x2: 0,
            //   y2: 1,
            //   colorStops: [{
            //     offset: 0,
            //     color: 'rgba(244,83,37,0.3)' // 0% 处的颜色
            //   }, {
            //     offset: 1,
            //     color: 'rgba(244,83,37,0)' // 100% 处的颜色
            //   }],
            //   global: false // 缺省为 false
            // }
          },
          lineStyle: {
            color: '#1890FF'
          },
          itemStyle: {
            color: '#1890FF'
          },
          barWidth: '24px'
        },
      ],
    })
    const name = ref('activity')
    const data_name = ref('data')
    const chartStyle = reactive({
      width: '230px',
      minHeight: '150px'
    })
    const dataChartStyle = reactive({
      width: '100%',
      minHeight: '100%'
    })
    let activeName = ref('release')
    const handleClick = (tab, event) => {
      console.log(tab, event)
    }
    let date = ref('year')
    const dateRange = ref('')
    const list = reactive([
      {
        rank: 1,
        username: '南北233',
        account: '123,222'
      },
      {
        rank: 2,
        username: '南北233',
        account: '123,222'
      },
      {
        rank: 3,
        username: '南北233',
        account: '123,222'
      },
      {
        rank: 4,
        username: '南北233',
        account: '123,222'
      },
      {
        rank: 5,
        username: '南北233',
        account: '123,222'
      },
      {
        rank: 6,
        username: '南北233',
        account: '123,222'
      },
      {
        rank: 7,
        username: '南北233',
        account: '123,222'
      },
      {
        rank: 8,
        username: '南北233',
        account: '123,222'
      }
    ])
    let showDialog = ref(false)
    const tableData = reactive([
      {
        number: 1,
        id: 1,
        user_name: '南北233',
        post_goods_nums: '233,333',
        order_nums: '123,456',
        update_time: '2021-10-31  23:12:00',
        rise: true
      },
      {
        number: 2,
        id: 21,
        user_name: '南北233',
        post_goods_nums: '3,333',
        order_nums: '123,456',
        update_time: '2021-10-31  23:12:00',
        rise: false
      },
      {
        number: 3,
        id: 12,
        user_name: '南北233',
        post_goods_nums: '233,333',
        order_nums: '123,456',
        update_time: '2021-10-31  23:12:00',
        rise: true
      },
      {
        number: 4,
        id: 11,
        user_name: '南北233',
        post_goods_nums: '233,333',
        order_nums: '123,456',
        update_time: '2021-10-31  23:12:00',
        rise: true
      },
      {
        number: 5,
        id: 51,
        user_name: '南北233',
        post_goods_nums: '233,333',
        order_nums: '123,456',
        update_time: '2021-10-31  23:12:00',
        rise: false
      },
      {
        number: 6,
        id: 34,
        user_name: '南北233',
        post_goods_nums: '233,333',
        order_nums: '123,456',
        update_time: '2021-10-31  23:12:00',
        rise: false
      },
      {
        number: 7,
        id: 81,
        user_name: '南北233',
        post_goods_nums: '233,333',
        order_nums: '123,456',
        update_time: '2021-10-31  23:12:00',
        rise: false
      },
      {
        number: 8,
        id: 10,
        user_name: '南北233',
        post_goods_nums: '233,333',
        order_nums: '123,456',
        update_time: '2021-10-31  23:12:00',
        rise: true
      }
    ])
    const handleSelectionChange = function (item) {
      console.log(item)
    }
    return {
      chartOptions,
      chartStyle,
      name,
      activeName,
      handleClick,
      date,
      dateRange,
      data_name,
      dataChartStyle,
      dataChartOptions,
      list,
      showDialog,
      tableData,
      handleSelectionChange
    }
  }
}
</script>

<style lang="less" scoped>
.data-analysis {
  .data-top {
    height: 310px;
  }
  .overview {
    height: 100%;
    .data-item {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
      }
      .num {
        font-family: 'San Francisco Display';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.85);
      }
      .unit {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  .visit {
    height: 100%;
    .visit-title {
      .date {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }
      .title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  .data-body {
    margin: 24px 0 50px;
    height: 404px;
    width: 100%;
    .tabs {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: -10px;
    }
    .filters {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &-chart {
      height: 300px;
      .title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        padding-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
          .info {
            color: #C4C4C4;
            font-size: 10px;
            font-weight: normal;
          }
      }
      .list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        .rank{
          width: 20px;
          height: 20px;
          border-radius: 10px;
          background: #8c8c8c;
          color: white;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
.line {
  width: 100%;
  height: 1px;
  background: #E9E9E9;
}
</style>
<style>
.el-tabs__nav-wrap::after {
  background: white;
}
.el-tabs__header {
  margin-bottom: -18px;
}
.el-dialog__header {
  border-bottom: 1px solid #E9E9E9;
}
</style>
