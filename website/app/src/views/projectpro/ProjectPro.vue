<template>
  <div class="main">
    <el-header style="font-size: 30px;font-weight: bold">
      <i class="el-icon-brush" style="padding-right: 10px"> </i>
      <span>基于深度学习的灰度图上色系统</span>
    </el-header>
    <el-row :gutter="20" >
        <el-col :span="10">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>选择灰度图片</span>
                <el-button class="button" type="primary"
                           @click="openFullScreen2"
                           v-loading.fullscreen.lock="fullscreenLoading">图片褪色</el-button>
                <el-button class="button" type="primary"
                           @click="openFullScreen1"
                           v-loading.fullscreen.lock="fullscreenLoading">图片上色</el-button>
              </div>
            </template>
            <el-upload
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit=1
              :on-exceed="handleExceed"
              :on-change="handleChange"
              :auto-upload="false">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" center width="800px">
              <img style="width: 100%"  :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-card>
        </el-col>
        <el-col :span="12" id="rightCard" >
          <slide-contrast :old-images="origin_images" :show="isShow" :new-images="res_images" :div-w='divW' :div-h="divH"></slide-contrast>
        </el-col>
      </el-row>
    <canvas id="canvas" width="640" height="500"></canvas>
  </div>
</template>

<script>
import {reactive, ref, onMounted} from 'vue'
import SlideContrast from "components/SlideContrast";
import {colorize} from "utils/api";
import { ElLoading } from 'element-plus';
export default {
  name: "ProjectPro",
  components: {SlideContrast},
  setup(props,ctx){
    let divW = ref('')
    let divH = ref('')
    let isShow = ref('none')
    onMounted(() => {
      const boxCard = document.getElementById('rightCard')
      divW.value = boxCard.offsetWidth + 'px'
      divH.value = boxCard.offsetWidth * 0.8 + 'px'
      //console.log(divW,divH)
    })
    let dialogImageUrl = ref('')
    let dialogVisible = ref(false)
    let origin_images = ref('')
    let res_images = ref('')
    const fileList = reactive([])
    const fullscreenLoading = ref(false);
    let formData = reactive()
    const openFullScreen1 = function (){
      fullscreenLoading.value = true;
      //const that = this
      isShow.value = 'block'
      let target = event.target
      target = event.target.parentNode
      target.blur()
      colorize(formData).then(res => {
        let result = JSON.parse(res.data.image)
        console.log(result)
        res_images.value = result
        isShow.value = 'block'
        fullscreenLoading.value = false;
      }).catch(err => {
        //上色失败
        fullscreenLoading.value = false;
      })
    };
    const openFullScreen2 = function (){
      //fullscreenLoading.value = true;
      //const that = this
      isShow.value = 'block'
      let target = event.target
      target = event.target.parentNode
      target.blur()
      let oCanvas = document.querySelector("#canvas"),
        oGc = oCanvas.getContext('2d');
      console.log(divW.value,divW.value)
      let oImg = new Image();
      oImg.onload = function () {
        console.log(oImg.width,oImg.height)
        oCanvas.width = oImg.width
        oCanvas.height = oImg.height
        oGc.drawImage(oImg, 0, 0);
        let imgData = oGc.getImageData(0, 0, oImg.width, oImg.height),
          data = imgData.data, avg = 0;
        for( let i = 0; i < data.length; i += 4 ) {
          avg = ( data[i] + data[i+1] + data[i+2] ) / 3;
          data[i] = avg;
          data[i+1] = avg;
          data[i+2] = avg;
        }
        //处理完之后，再次输出
        oGc.putImageData( imgData, 0, 0 );
        origin_images.value = oCanvas.toDataURL()
        oImg.src = ''
        //let img64 = origin_images.value.toString().split(',')[1]
      }
      oImg.src = origin_images.value.toString()
      // colorize(formData).then(res => {
      //   let result = JSON.parse(res.data.image)
      //   console.log(result)
      //   res_images.value = result
      //   isShow.value = 'block'
      //   fullscreenLoading.value = false;
      // }).catch(err => {
      //   //上色失败
      //   fullscreenLoading.value = false;
      // })
    };
    const handleChange = function (e){
      const reader = new FileReader()
      formData = new FormData()
      fileList.push(e)
      reader.onload = (e) => {
        origin_images.value = e.target.result
      }
      reader.readAsDataURL(e.raw)
      formData.append('files',e.raw)
      //console.log(formData)
    }
    return{
      dialogImageUrl,
      dialogVisible,
      divW,
      divH,
      origin_images,
      res_images,
      fileList,
      isShow,
      fullscreenLoading,
      openFullScreen1,
      openFullScreen2,
      formData,
      handleChange
    }
  },
  methods:{
    handleRemove(file, fileList) {
        this.origin_images = ''
      this.res_images = ''
        this.fileList =[]
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制上传 9 张图片，本次选择了 ${files.length} 张图片，共选择了 ${files.length + fileList.length} 张图片`);
    },
  }
}
</script>

<style lang="less">
.main{
  #canvas {
    border: 1px dashed #aaa;
    display: none;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    margin-top: 10px;
  }
  .right-card{
    height: 60%;
  }
  #rightCard{
    margin-top: 10px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>