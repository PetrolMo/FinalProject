<template>
  <div class="menu1">
    <div class="card">
      <el-card>
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="handleChange"
          :limit="99"
          :show-file-list="false"
          :auto-upload="false"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">选择文件</el-button>
          <template #tip>
            <div class="el-upload__tip" style="">只能上传 csv 文件，且不超过 500kb</div>
          </template>
        </el-upload>
      </el-card>
      <select id="select1" v-model="current1" :style="{display:isShow}">
        <option v-for="(item,index) in selection1" :label="index+1 + '.' +item" :value="index" :key="index"></option>
      </select>
      <select id="select2" v-model="current2" :style="{display:isShow}">
        <option v-for="(item,index) in selection2" :label="index+1 + '.' +item" :value="index" :key="index"></option>
      </select>
    </div>
    <div id="figure"></div>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, onMounted, watch} from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts';
import {useStore} from 'vuex'
export default defineComponent({
  name: "menu1",
  setup(props,ctx){
    let fileList = reactive([])
    let legend = reactive([])
    let series = reactive([])
    let isShow = ref('none')
    let options = reactive({
      title : {
        text: 'Salary Comparison',
        subtext: 'Data from Yin Shen '
      },
      grid:{
        x:"15%",
        bottom: 200
      },
      //legend:legend,
      tooltip : {
        trigger: 'item',
        showDelay : 0,
        // formatter : function (params) {
        //   if (params.value.length > 1) {
        //     return params.seriesName + ' :<br/>'
        //       + "Starting Median Salary:$" + params.value[0]+ ' :<br/>'
        //       + "Mid-Career Median Salary:$" + params.value[1];
        //   }
        // },
        // axisPointer:{
        //   show: true,
        //   type : 'cross',
        //   lineStyle: {
        //     type : 'dashed',
        //     width : 1
        //   }
        // }
      },
      xAxis : [
        {
          type : 'category',
          data: [
            'Starting Median Salary',
            'Mid_Career Median Salary',
            'Mid_Career 10th',
            'Mid_Career 25th',
            'Mid_Career 75th',
            'Mid_Career 90th'
          ],
          axisTick:{                      //坐标轴刻度相关配置
            alignWithLabel:true         //刻度线与标签对齐
          },
          axisLabel:{
            interval:0,
            rotate:-30
          }
        }
      ],
      yAxis : [
        {
          type : 'value',
        }
      ],
      legend:{
        //type:'scroll',
        //data:["Undergraduate Major", "Accounting", "Aerospace Engineering", "Agriculture", "Anthropology", "Architecture", "Art History", "Biology", "Business Management", "Chemical Engineering", "Chemistry", "Civil Engineering", "Communications", "Computer Engineering", "Computer Science", "Construction", "Criminal Justice", "Drama", "Economics", "Education", "Electrical Engineering", "English", "Film", "Finance", "Forestry", "Geography", "Geology", "Graphic Design", "Health Care Administration", "History", "Hospitality & Tourism", "Industrial Engineering", "Information Technology (IT)", "Interior Design", "International Relations", "Journalism", "Management Information Systems (MIS)", "Marketing", "Math", "Mechanical Engineering", "Music", "Nursing", "Nutrition", "Philosophy", "Physician Assistant", "Physics", "Political Science", "Psychology", "Religion", "Sociology", "Spanish"],
        left:'middle',
        top: 25,
        type: 'scroll',
        //orient: 'vertical',
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
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      //legend:["Undergraduate Major", "Accounting", "Aerospace Engineering", "Agriculture", "Anthropology", "Architecture", "Art History", "Biology", "Business Management", "Chemical Engineering", "Chemistry", "Civil Engineering", "Communications", "Computer Engineering", "Computer Science", "Construction", "Criminal Justice", "Drama", "Economics", "Education", "Electrical Engineering", "English", "Film", "Finance", "Forestry", "Geography", "Geology", "Graphic Design", "Health Care Administration", "History", "Hospitality & Tourism", "Industrial Engineering", "Information Technology (IT)", "Interior Design", "International Relations", "Journalism", "Management Information Systems (MIS)", "Marketing", "Math", "Mechanical Engineering", "Music", "Nursing", "Nutrition", "Philosophy", "Physician Assistant", "Physics", "Political Science", "Psychology", "Religion", "Sociology", "Spanish"],
    })
    let instance = reactive({})
    let echartsInit = function (){
      instance.setOption(options,{
        notMerge:true
      })
    }
    let selection1 = reactive([])
    let selection2 = reactive([])
    let tableData = reactive([])
    let current1 = ref(0)
    let current2 = ref(1)
    watch([current1,current2],(newVal,oldVal) => {
      //console.log(newVal)
      setTimeout(() => {
        if(tableData.length !== 0){
          if(newVal[0] === newVal[1]){
            //console.log(tableData[newVal[0]])
            let item = tableData[newVal[0]]
            legend = [item.School_Name]
            series = [
              {
                name:item.School_Name,
                type:'bar',
                data: [
                  item.Starting_Median_Salary,
                  item.Mid_Career_Median_Salary,
                  item.Mid_Career_10th_Percentile_Salary,
                  item.Mid_Career_25th_Percentile_Salary,
                  item.Mid_Career_75th_Percentile_Salary,
                  item.Mid_Career_90th_Percentile_Salary
                ]
              }
            ]
            options.legend.data = legend
            options.series = series
          }
          else {
            //console.log(tableData[newVal[0]])
            let item1 = tableData[newVal[0]]
            let item2 = tableData[newVal[1]]
            legend = [item1.School_Name,item2.School_Name]
            series=[
              {
                name:item1.School_Name,
                type:'bar',
                data: [
                  item1.Starting_Median_Salary,
                  item1.Mid_Career_Median_Salary,
                  item1.Mid_Career_10th_Percentile_Salary,
                  item1.Mid_Career_25th_Percentile_Salary,
                  item1.Mid_Career_75th_Percentile_Salary,
                  item1.Mid_Career_90th_Percentile_Salary
                ]
              },
              {
                name:item2.School_Name,
                type:'bar',
                data: [
                  item2.Starting_Median_Salary,
                  item2.Mid_Career_Median_Salary,
                  item2.Mid_Career_10th_Percentile_Salary,
                  item2.Mid_Career_25th_Percentile_Salary,
                  item2.Mid_Career_75th_Percentile_Salary,
                  item2.Mid_Career_90th_Percentile_Salary
                ]
              },
            ]
            options.legend.data = legend
            options.series = series
          }
          echartsInit()
          console.log(options)
        }
      },150)
    }, {immediate:true})
    const store = useStore()
    let csv2 = store.state.table2
    onMounted(() => {
      const figures = document.getElementById('figure')
      instance = echarts.init(figures)
      if(JSON.stringify(csv2) !== '{}'){
        isShow.value = 'inline-block'
        readCSVFile(csv2)
      }
      //echartsInit()
    })
    function handleChange(file){
      tableData.length = 0
      fileList.length = 0
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
      isShow.value = 'inline-block'
      current1.value = 1
      current2.value = 0
      console.log(tableData)
    }
    function csvToObject(csvString){
      let csvArray = csvString.split("\r\n");
      csvArray.forEach((value,index) => {
        let a = value.split(',')
        if(index !== 0){
          let legend = a[0]
          if(legend !== ''){
            selection1.push(legend)
            selection2.push(legend)
          }
        }
      })
      //console.log(selection1)
      //echartsInit()
      let headers = csvArray[0].split(",").map(v => v.replace(/\s+/g,'_'));
      for(let i = 1;i<csvArray.length;i++){
        let data = {};
        let temp = csvArray[i].split(",");
        for(let j = 0;j<temp.length;j++){
          data[headers[j]] = temp[j];
        }
        tableData.push(data)
      }
      //console.log(tableData)
      echartsInit()
    }
    function readCSVFile(obj) {
      let reader = new FileReader();
      reader.readAsText(obj);
      reader.onload = function () {
        csvToObject(this.result);
        //console.log(data,tableData);//data为csv转换后的对象
      }
    }
    return{
      readCSVFile,
      csvToObject,
      options,
      instance,
      selection1,
      selection2,
      current1,
      current2,
      legend,
      series,
      isShow,
      handleChange,
      fileList
    }
  },
})
</script>

<style scoped>
#select1,#select2{
  height: 40px;
  font-size: 15px;
}
#figure{
  width: 100%;
  height: 700px;
}
.card{
  /*width: 250px;*/
  display: flex;
  align-items: flex-end;
}
</style>