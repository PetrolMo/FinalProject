<template>
  <div class="menu2">
    <div class="card">
      <el-card>
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="handleChange"
          :limit="99"
          :show-file-list="false"
          :auto-upload="false"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选择文件</el-button>
          <template #tip>
            <div class="el-upload__tip" style="">只能上传 csv 文件，且不超过 500kb</div>
          </template>
        </el-upload>
      </el-card>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          background
          :page-sizes="[0, 5, 10, 25, 50]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="totalPages">
        </el-pagination>
      </div>
    </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      empty-text="已隐藏表格"
      stripe
      style="width: 100%">
      <el-table-column
        prop="School_Name"
        label="School Name"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="School_Type"
        label="School Type"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="Starting_Median_Salary"
        label="Starting Median Salary"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="Mid_Career_Median_Salary"
        label="Mid-Career Median Salary"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="Mid_Career_10th_Percentile_Salary"
        label="10th"
        width=""
        align="center"
      ></el-table-column>
      <el-table-column
        prop="Mid_Career_25th_Percentile_Salary"
        label="25th"
        width=""
        align="center"
      ></el-table-column>
      <el-table-column
        prop="Mid_Career_75th_Percentile_Salary"
        label="75th"
        align="center"
        width=""
      ></el-table-column>
      <el-table-column
        prop="Mid_Career_90th_Percentile_Salary"
        label="90th"
        align="center"
        width=""
      ></el-table-column>
    </el-table>
    <!--    <el-dropdown>-->
    <!--  <span class="el-dropdown-link">-->
    <!--    下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
    <!--  </span>-->
    <!--      <template #dropdown>-->
    <!--        <el-dropdown-menu>-->
    <!--          <el-dropdown-item>黄金糕</el-dropdown-item>-->
    <!--          <el-dropdown-item>狮子头</el-dropdown-item>-->
    <!--          <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
    <!--          <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
    <!--          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
    <!--        </el-dropdown-menu>-->
    <!--      </template>-->
    <!--    </el-dropdown>-->
    <div id="figure">

    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts';
import {useStore} from 'vuex'
export default defineComponent({
  name: "menu1",
  setup(props,ctx){
    const tableData = reactive([{
    }])
    let currentPage = ref(1)
    let pageSize = ref(5)
    let totalPages = ref(0)
    const fileList = reactive([])
    let options = reactive({
      title : {
        text: 'Salary By Colleges Type',
        subtext: 'Data from Yin Shen '
      },
      grid:{
        x:"15%",
        bottom: 200
      },
      tooltip : {
        trigger: 'item',
        showDelay : 0,
        formatter : function (params) {
          if (params.value.length > 1) {
            return params.seriesName + ' :<br/>'
              + "Starting Median Salary:$" + params.value[0]+ ' :<br/>'
              + "Mid-Career Median Salary:$" + params.value[1];
          }
        },
        axisPointer:{
          show: true,
          type : 'cross',
          lineStyle: {
            type : 'dashed',
            width : 1
          }
        }
      },
      xAxis : [
        {
          type : 'value',
          name:'Starting Median Salary',
          scale:true,
          nameLocation:'middle',
          nameTextStyle:{
            fontSize: 20,
            fontWeight:600
          },
          axisLabel : {
            formatter: '${value}'
          },
          nameGap:20
        }
      ],
      yAxis : [
        {
          type : 'value',
          scale:true,
          nameLocation:'middle',
          name:'Mid-Career Median Salary',
          nameGap:-25,
          axisLabel : {
            formatter: '${value}'
          },
          nameTextStyle:{
            fontSize: 20,
            fontWeight:600
          },
        }
      ],
      legend:{
        //type:'scroll',
        //data:["Undergraduate Major", "Accounting", "Aerospace Engineering", "Agriculture", "Anthropology", "Architecture", "Art History", "Biology", "Business Management", "Chemical Engineering", "Chemistry", "Civil Engineering", "Communications", "Computer Engineering", "Computer Science", "Construction", "Criminal Justice", "Drama", "Economics", "Education", "Electrical Engineering", "English", "Film", "Finance", "Forestry", "Geography", "Geology", "Graphic Design", "Health Care Administration", "History", "Hospitality & Tourism", "Industrial Engineering", "Information Technology (IT)", "Interior Design", "International Relations", "Journalism", "Management Information Systems (MIS)", "Marketing", "Math", "Mechanical Engineering", "Music", "Nursing", "Nutrition", "Philosophy", "Physician Assistant", "Physics", "Political Science", "Psychology", "Religion", "Sociology", "Spanish"],
        data:['Engineering','Party','Liberal Arts','Ivy League','State'],
        left:20,
        top: 225,
        type: 'scroll',
        orient: 'vertical',
        height: 450,
        pageIconColor: '#ff781f', //翻页箭头颜色
        pageTextStyle:{
          color: '#999', //翻页数字颜色
        }, //翻页数字设置
        pageIconSize: 13,
        textStyle:{//图例文字的样式
          color:'#999',
          fontSize: 10
        },
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataZoom : {show: true},
          dataView : {show: false, readOnly: false},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      //legend:["Undergraduate Major", "Accounting", "Aerospace Engineering", "Agriculture", "Anthropology", "Architecture", "Art History", "Biology", "Business Management", "Chemical Engineering", "Chemistry", "Civil Engineering", "Communications", "Computer Engineering", "Computer Science", "Construction", "Criminal Justice", "Drama", "Economics", "Education", "Electrical Engineering", "English", "Film", "Finance", "Forestry", "Geography", "Geology", "Graphic Design", "Health Care Administration", "History", "Hospitality & Tourism", "Industrial Engineering", "Information Technology (IT)", "Interior Design", "International Relations", "Journalism", "Management Information Systems (MIS)", "Marketing", "Math", "Mechanical Engineering", "Music", "Nursing", "Nutrition", "Philosophy", "Physician Assistant", "Physics", "Political Science", "Psychology", "Religion", "Sociology", "Spanish"],
      series:[
        {
          name:'Engineering',
          type:'scatter',
          data:[],
          symbolSize:15
        },
        {
          name:'Party',
          type:'scatter',
          data:[],
          symbolSize:15
        },
        {
          name:'Liberal Arts',
          type:'scatter',
          data:[],
          symbolSize:15
        },
        {
          name:'Ivy League',
          type:'scatter',
          data:[],
          symbolSize:15
        },
        {
          name:'State',
          type:'scatter',
          data:[],
          symbolSize:15
        },
      ]
    })
    let instance = reactive({})
    let echartsInit = function (){
      instance.setOption(options)
    }
    const store = useStore()
    let csv2 = store.state.table2
    onMounted(() => {
      const figures = document.getElementById('figure')
      instance = echarts.init(figures)
      if(JSON.stringify(csv2) !== '{}'){
        readCSVFile(csv2)
      }
      //echartsInit()
    })
    function handleChange(file){
      tableData.length = 0
      let type = file.name.split('.')[1]
      if(type !== 'csv'){
        ElMessage.warning({
          message: '请选择csv文件',
          type: 'warning'
        });
        return
      }
      store.commit('setTable2',file.raw)
      readCSVFile(file.raw)
      //console.log(tableData)
    }
    function handleExceed(){

    }
    function csvToObject(csvString){
      let csvArray = csvString.split("\r\n");
      //let datas = [];
      //获取所有专业
      csvArray.forEach((value,index) => {
        let a = value.split(',')
        if(index !== 0){
          let legend = a[1]
          if(legend !== ''){
            switch (legend){
              case 'Engineering':
                options.series[0].data.push([a[2],a[3]])
                break;
              case 'Party':
                options.series[1].data.push([a[2],a[3]])
                break;
              case 'Liberal Arts':
                options.series[2].data.push([a[2],a[3]])
                break;
              case 'Ivy League':
                options.series[3].data.push([a[2],a[3]])
                break;
              case 'State':
                options.series[4].data.push([a[2],a[3]])
                break;
            }
          }
        }
      })
      //echartsInit()
      let headers = csvArray[0].split(",").map(v => v.replace(/\s+/g,'_'));
      for(let i = 1;i<csvArray.length;i++){
        let data = {};
        let temp = csvArray[i].split(",");
        for(let j = 0;j<temp.length;j++){
          data[headers[j]] = temp[j];
        }
        //datas.push(data);
        tableData.push(data)
      }
      //console.log(tableData)
      totalPages.value = tableData.length
      echartsInit()
      //return datas;
    }
    function readCSVFile(obj) {
      let reader = new FileReader();
      reader.readAsText(obj);
      reader.onload = function () {
        csvToObject(this.result);
        //console.log(data,tableData);//data为csv转换后的对象
      }
    }
    function handleSizeChange(val) {
      pageSize.value = val
      console.log(`每页 ${val} 条`);
    }
    function handleCurrentChange(val) {
      currentPage.value = val
      console.log(`当前页: ${val}`);
    }
    return{
      tableData,
      currentPage,
      handleChange,
      fileList,
      readCSVFile,
      csvToObject,
      pageSize,
      totalPages,
      handleCurrentChange,
      handleSizeChange,
      handleExceed,
      options,
      instance
    }
  },
})
</script>

<style scoped>
.menu2{
  overflow: scroll;
}
.card{
  height: 150px;
  width: 250px;
}
.block{
  margin-top: 10px;
}
#figure{
  width: 100%;
  height: 700px;
}
</style>