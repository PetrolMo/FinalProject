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
                <span>选择图片</span>
                <el-button class="button" type="primary" @click="uploadImg">图片上色</el-button>
              </div>
            </template>
            <el-upload
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit=9
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
  </div>
</template>

<script>
import {reactive, ref, onMounted} from 'vue'
import SlideContrast from "components/SlideContrast";
import {colorize} from "utils/api";

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
    })
    let dialogImageUrl = ref('')
    let dialogVisible = ref(false)
    const origin_images = reactive([])
    const res_images = reactive([])
    const fileList = reactive([])
    return{
      dialogImageUrl,
      dialogVisible,
      divW,
      divH,
      origin_images,
      res_images,
      fileList,
      isShow
    }
  },
  methods:{
    handleRemove(file, fileList) {
      let index = this.fileList.indexOf(file);
      if (index > -1) {
        this.origin_images.splice(index, 1);
        this.fileList.splice(index,1)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制上传 9 张图片，本次选择了 ${files.length} 张图片，共选择了 ${files.length + fileList.length} 张图片`);
    },
    handleChange(e){
      this.fileList.push(e)
      const fileReader = new FileReader()
      const that = this;
      fileReader.onloadend = function (r){
        that.origin_images.push(r.target.result)
      }
      fileReader.readAsDataURL(e.raw)
    },
    uploadImg(){
      const that = this
      that.isShow = 'block'
      let target = event.target
      target = event.target.parentNode
      target.blur()
      colorize(JSON.stringify(this.origin_images)).then(res => {
        console.log(res)
        that.isShow = 'block'
      }).catch(err => {
        //上色失败
      })
    }
  }
}
</script>

<style lang="less">
.main{
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