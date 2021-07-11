<template>
  <div class="input">
    <label for="year">
      年：
      <input type="text" id="year" v-model="year">
    </label>
    <label for="month">
      月：
      <input type="text" id="month" v-model="month">
    </label>
    <label for="day">
      日：
      <input type="text" id="day" v-model="day">
    </label>
    <el-button type="primary" size="small" @click="search">查找</el-button>
  </div>
  <div class="calendar">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-calendar v-model="value">
          <template #dateCell="{data}">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
            </p>
          </template>
        </el-calendar>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" style="height: 200px;width: 300px">
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
              prop="year"
              label="年份"
              width="120">
            </el-table-column>
            <el-table-column
              prop="operator"
              label="月份"
              width="120">
            </el-table-column>
            <el-table-column
              prop="day"
              label="日期"
              width="100">
            </el-table-column>
            <el-table-column
              prop="expected"
              label="预期输出"
              width="100">
            </el-table-column>
            <el-table-column
              prop="output.tag"
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
import {reactive,ref,defineComponent,computed} from 'vue'
export default defineComponent({
  name: "Test8",
  setup(props,ctx){
    let value = ref(new Date(2019,0,14))
    let year = ref(2021)
    let month = ref(7)
    let day = ref(4)
    function search(){
      value.value = new Date(year.value,month.value - 1,day.value)
    }
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
    return{
      value,
      year,
      month,
      day,
      search,
      tableDataFromFile,
      tableData,
      tableRowClassName,
      fileList
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
        console.log(value,result)
        if(value.profit == result.profit && value.total == result.total){
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
              total:value[3],
              profit:value[4],
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
})
</script>

<style lang="less" scoped>
.input{
  width: 50vw;
  input{
    margin: 15px;
    height: 30px;
  }
}.calendar{
 }
</style>