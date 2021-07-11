<template>
  <div class="test1">
    <el-backtop target=".test1"></el-backtop>
    <el-row :gutter="20" class="row1">
      <el-col :span="6">
        <el-card shadow="never" style="height: 300px">
          <div class="title">
            <h3>输入各销售额:</h3>
          </div>
          <el-row :gutter="20" class="input" style="align-items: center">
            基本月租：
            <el-col :span="8">
              <el-input
                size="small"
                v-model="triangle.a" disabled
              >
              </el-input>
            </el-col>
            <el-col :span="6">元</el-col>
          </el-row>
          <el-row :gutter="20" class="input" style="align-items: center">
            当月通话：
            <el-col :span="8">
              <el-input
                size="small"
                v-model="triangle.b"
              >
              </el-input>
            </el-col>
            <el-col :span="6">分钟</el-col>
          </el-row>
          <el-row :gutter="20" class="input" style="align-items: center">
         未按时缴费：
            <el-col :span="8">
              <el-input
                size="small"
                v-model="triangle.c"
              >
              </el-input>
            </el-col>
            <el-col :span="6">次</el-col>
          </el-row>
          <el-row class="input" type="flex" justify="space-between">
            <el-col :span="8" style="margin-left: 30px">
              <el-button type="primary" @click="triangleType(triangle)">电话计费</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col >
      <el-col :span="18">
        <el-table
          :data="tableData"
          style="width: 95%"
          border
          empty-text="暂无数据！"
          height="300"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="a"
            label="基本月租"
            width="150">
          </el-table-column>
          <el-table-column
            prop="b"
            label="月通话分钟数"
            width="150">
          </el-table-column>
          <el-table-column
            prop="c"
            label="未按时缴费次数"
            width="150">
          </el-table-column>
          <el-table-column
            prop="account"
            width="100"
            label="折扣">
          </el-table-column>
          <el-table-column
            label="当月话费总数"
            prop="total"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row2">
      <el-col :span="4">
        <el-card shadow="never" style="height: 300px">
          <div class="title">
            <h3>上传测试用例:</h3>
          </div>
          <el-upload
            class="upload-demo"
            action=""
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="2"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :auto-upload="false">
            <template #trigger>
              <el-button size="small" type="primary" @click="handleClick">选取文件</el-button>
            </template>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">运行</el-button>
            <template #tip>
              <div class="el-upload__tip">
                *只能上传 csv 文件，且不超过 500kb
              </div>
            </template>
          </el-upload>
        </el-card>
      </el-col >
      <el-col :span="20">
        <el-table
          :data="tableDataFromFile"
          style="width: 95%"
          empty-text="暂无数据！"
          ref="filterTable"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          border
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="testTime"
            label="日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="a"
            label="基本月租"
            width="120">
          </el-table-column>
          <el-table-column
            prop="b"
            label="当月通话分钟数"
            width="150">
          </el-table-column>
          <el-table-column
            prop="c"
            label="未按照缴费次数"
            width="150">
          </el-table-column>
          <el-table-column
            prop="account"
            label="折扣"
            width="100">
          </el-table-column>
          <el-table-column
            width="150"
            prop="total"
            label="预期输出">
          </el-table-column>
          <el-table-column
            width="150"
            prop="output.result.total"
            label="实际输出">
          </el-table-column>
          <el-table-column
            prop="output.total"
            label="标签"
            :filters="[{ text: '测试通过', value: '测试通过' }, { text: '测试失败', value: '测试失败' },{ text: '待测试', value: '待测试' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template #default="scope">
              <el-tag
                :type="scope.row.output.state"
                disable-transitions>{{scope.row.output.tag}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ref , reactive , onMounted, h } from 'vue'
import {useStore} from 'vuex';
import {uploadTest} from "utils/api";

export default {
  name: "Test1",
  setup(props,ctx) {
    const store = useStore()
    let user = ref('')
    onMounted(() => {
      user.value = store.state.user
    })

    const triangle = reactive({
      a: 25,
      b: '',
      c: ''
    })
    let tableData = reactive([])
    let tableDataFromFile = reactive([])
    const fileList = reactive([])
    const tableRowClassName = function ({row, rowIndex}) {
      if (row) {
        return row.activeName
      } else {
        return ' '
      }
    }
    const triangleType = function (t) {
      if (event.title !== 'submit' && event) {
        let target = event.target;
        if (target.nodeName === "SPAN") {
          target = event.target.parentNode;
        }
        target.blur();
        let {a, b, c} = t;
        const date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDay()
        let hour = date.getHours()
        let minute = date.getMinutes()
        const createDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
        const accounts = [ 1,0.99,0.985,0.98,0.975,0.97]
        let account = accounts[0]
        let temp = b;
        b = c
        c = temp
        if(c <= 0){

        }
        else if(c > 0 && c <60){
          if(b <= 1){
            account = accounts[1]
          }
        }
        else if(c > 60 && c <= 120){
          if(b <= 2){
            account = accounts
          }
        }else if(c > 120 && c <= 180){
          if(b <= 3){
            account = accounts[2]
          }
        }else if(c > 180 && c <= 300){
          if(b <= 3){
            account = accounts[3]
          }
        }else{
          if(b <= 6){
            account = accounts[4]
          }
        }
        let total = Number(a) + Number(c) * 0.15 * Number(account)
        const record = {
          a: a,
          b: c,
          c: b,
          total:total,
          account:account,
          date: createDate,
          activeName: 'isosceles-triangle'
        }
        if(t.test){
          return record
        }else {
          tableData.push(record)
        }
        // if (a >= 1 && a<=70 && b >= 1 && b <=80 && c >= 1 && c<=90) {
        //   const a1 = Number(a);
        //   const b1 = Number(b);
        //   const c1 = Number(c);
        //   let total = a1 * 25 + b * 45 + c * 30
        //   let profit = 0
        //   if(total < 1000){
        //     profit = total * 0.1
        //   }else if(total <= 1800){
        //     profit = total * 0.15
        //   }else{
        //     profit = total * 0.2
        //   }
        //   const record = {
        //     a: a1,
        //     b: b1,
        //     c: c1,
        //     total:total,
        //     profit:profit,
        //     date: createDate,
        //     activeName: 'isosceles-triangle'
        //   }
        //   if(t.test){
        //     return record
        //   }else {
        //     tableData.push(record)
        //   }
        // }
        // else{
        //   const a1 = Number(a);
        //   const b1 = Number(b);
        //   const c1 = Number(c);
        //   const record = {
        //     a: a1,
        //     b: b1,
        //     c: c1,
        //     date: createDate,
        //     profit:0,
        //     total:0
        //   }
        //   if(t.test){
        //     return record
        //   }else{
        //     tableData.push(record)
        //   }
        // }

      }
    }
    const deleteRow = function (index, rows) {
      rows.splice(index, 1);
    }
    return {
      triangle,
      triangleType,
      tableData,
      tableDataFromFile,
      tableRowClassName,
      deleteRow,
      fileList,
      user,
    }
  },
  methods:{
    submitUpload(){
      const that = this
      let target = event.target;
      if(target.nodeName === "SPAN"){
        target = event.target.parentNode;
      }
      target.blur();
      that.tableDataFromFile.map(value => {
        let result = that.triangleType(value)
        console.log(value)
        if(value.total == result.total && value.account == result.account){
          value.output.tag = '测试通过'
          value.output.state = 'success'
        }else{
          value.output.tag = '测试失败'
          value.output.state = 'danger'
        }
        value.output.result = result
        return value
      })
    },
    handleRemove(file, fileList){
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleChange(e){
      const reader = new FileReader()
      const that =this
      reader.onload = (function(a){
        return function (e){
          let data = e.target.result.split('\r\n')
          let variables = [];
          const date = new Date()
          let year = date.getFullYear()
          let month = date.getMonth() + 1
          let day = date.getDay()
          let hour = date.getHours()
          let minute = date.getMinutes()
          const createDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
          data.map(v => {
            if (v) {
              variables.push(v.split(","));
            }
          });
          variables.forEach(value => {
            let record = {
              a:value[0],
              b:value[1],
              c:value[2],
              total:value[4],
              account:value[3],
              output:{
                result:'',
                state:'',
                tag:'待测试'
              },
              testTime:createDate,
              operator:'001',
              testId:date.getTime(),
              test:true
            }
            that.tableDataFromFile.push(record)
            //console.log(that.tableDataFromFile)
          })
        }
      })(e.raw)
      reader.readAsText(e.raw)
    },
    handleClick(){
      let target = event.target;
      if(target.nodeName === "SPAN"){
        target = event.target.parentNode;
      }
      target.blur();
    },
    filterTag(value,row){
      return row.output.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },

}
</script>

<style lang="less">
.input{
  margin-top: 10px;
}
.el-table .not-triangle {
  background: #ea897b;
}
.el-table .equilateral-triangle{
  background-color: #90caf9;
}
.el-table .isosceles-triangle {
  background: #c6ef9a;
}
.el-table .triangle{
  background: #ffecb3;
}
.row2{
  margin-top: 10px;
}
.test1{
  height: 100vh;
  overflow-x: hidden;
}

</style>