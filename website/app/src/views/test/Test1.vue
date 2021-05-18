<template>
  <div class="test1">
    <el-backtop target=".test1"></el-backtop>
    <el-row :gutter="20" class="row1">
      <el-col :span="4">
        <el-card shadow="never" style="height: 300px">
          <div class="title">
            <h3>输入三角形三边:</h3>
          </div>
          <el-row :gutter="20" class="input" style="align-items: center">
            <el-col :span="4" >a:</el-col>
            <el-col :span="16">
              <el-input
                size="small"
                v-model="triangle.a"
              >
              </el-input>
            </el-col>
            <el-col :span="4">cm</el-col>
          </el-row>
          <el-row :gutter="20" class="input" style="align-items: center">
            <el-col :span="4" >b:</el-col>
            <el-col :span="16">
              <el-input
                size="small"
                v-model="triangle.b"
              >
              </el-input>
            </el-col>
            <el-col :span="4">cm</el-col>
          </el-row>
          <el-row :gutter="20" class="input" style="align-items: center">
            <el-col :span="4" >c:</el-col>
            <el-col :span="16">
              <el-input
                size="small"
                v-model="triangle.c"
              >
              </el-input>
            </el-col>
            <el-col :span="4">cm</el-col>
          </el-row>
          <el-row class="input" type="flex" justify="space-between">
            <el-col :span="8" style="margin-left: 30px">
              <el-button type="primary" @click="triangleType(triangle)">判断类型</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col >
      <el-col :span="20">
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
            label="边长a(cm)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="b"
            label="边长b(cm)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="c"
            label="边长c(cm)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            width="180"
            label="三角形类型">
          </el-table-column>
          <el-table-column
            label="操作">
            <template #default="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row2">
      <el-col :span="4">
        <el-card shadow="never" style="height: 200px">
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
            prop="date"
            label="日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user"
            label="测试人员"
            width="120">
          </el-table-column>
          <el-table-column
            prop="a"
            label="边长a(cm)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="b"
            label="边长b(cm)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="c"
            label="边长c(cm)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="type"
            width="180"
            label="预期输出">
          </el-table-column>
          <el-table-column
            prop="result"
            width="180"
            label="实际输出">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            :filters="[{ text: '测试通过', value: '测试通过' }, { text: '测试失败', value: '测试失败' },{ text: '待测试', value: '待测试' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template #default="scope">
              <el-tag
                :type="scope.row.state"
                disable-transitions>{{scope.row.tag}}</el-tag>
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
      console.log(user.value)
    })

    const triangle = reactive({
      a: '',
      b: '',
      c: ''
    })
    let tableData = reactive(store.state.tableData)
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
        const {a, b, c} = t;
        if (a && b && c) {
          const a1 = Number(a);
          const b1 = Number(b);
          const c1 = Number(c);
          const date = new Date()
          let year = date.getFullYear()
          let month = date.getMonth() + 1
          let day = date.getDay()
          let hour = date.getHours()
          let minute = date.getMinutes()
          const createDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
          const record = {
            a: a1,
            b: b1,
            c: c1,
            date: createDate,
            type: '',
            activeName: ''
          }
          if (a1 > 0 && b1 > 0 && c1 > 0 && (a1 + c1 > b1) && (a1 + b1 > c1) && (b1 + c1 > a1)) {
            //是三角形
            if (a1 === b1 || a1 === c1 || b1 === c1) {
              if (a1 === b1 && a1 === c1) {
                //等边
                record.type = '等边三角形'
                record.activeName = 'equilateral-triangle'
              } else {
                //等腰三角形
                record.type = '等腰三角形'
                record.activeName = 'isosceles-triangle'
              }
            } else {
              //一般三角形
              record.type = '一般三角形'
              record.activeName = 'triangle'
            }
          } else {
            //不构成三角形
            record.type = '不构成三角形'
            record.activeName = 'not-triangle'
          }
          store.commit('pushRecord', record)
        }
      }
      else {
        const {a, b, c} = t;
        if (a && b && c) {
          const a1 = Number(a);
          const b1 = Number(b);
          const c1 = Number(c);
          if (a1 > 0 && b1 > 0 && c1 > 0 && (a1 + c1 > b1) && (a1 + b1 > c1) && (b1 + c1 > a1)) {
            //是三角形
            if (a1 === b1 || a1 === c1 || b1 === c1) {
              if (a1 === b1 && a1 === c1) {
                //等边
                return '等边三角形'
              } else {
                //等腰三角形
                return '等腰三角形'
              }
            } else {
              //一般三角形
              return '一般三角形'
            }
          } else {
            //不构成三角形
            return '不构成三角形'
          }
        }
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
      new Promise((resolve,reject) => {
        event.title = 'submit'
        this.tableDataFromFile.map(value => {
          let result = that.triangleType(value)
          if(result === value.type){
            value.tag = '测试通过'
            value.state = 'success'
          }else{
            value.tag = '测试失败'
            value.state = 'danger'
          }
          value.result = result
          return value
        })
      }).then(res => {
        event.title = ''
      }).catch(err => console.log(err))
      uploadTest(that.tableDataFromFile).then(res => {
        that.$notify({
          title: '上传成功',
          message: h('i', { style: 'color: teal'}, '测试结果已经成功上传到数据库')
        });
      }).catch(err => console.log(err))
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
              type:value[3],
              result:'',
              tag:'待测试',
              state:'',
              date:createDate,
              user:that.user
            }
            that.tableDataFromFile.push(record)
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
      return row.tag === value;
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