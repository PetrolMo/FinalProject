<template>
  <div class="main">
    <div class="searchArea">
      <div class="searchBoxByImg searchBox">
        <form method='post' target="test" enctype="multipart/form-data" action="">
          <!--<input data-bind="value: title" type="text" id="inputTask" placeholder="Path to the image" style="width: 150px;">-->
          <input id="openFile" type="file" name="file" style="display: none" @change="chooseImg"/>
          <input id="submit2" type='submit' style="display: none">
        </form>
        <iframe id="iframe" name="test" style="display: none"></iframe>
        <div class="chooseImg">
          <button class="chooseImgBtn" @click="openInput()">选择照片</button>
        </div>
        <div class="search">
          <button class="searchImgBtn" @click="uploadImg()">搜索照片</button>
        </div>
        <div class="preImg" id="preImg">
          <img :src="rawImage" alt="" class="rawImg" id="rawImg">
          <img src="" class="image" id="image" alt="">
          <div class="coverView" id="coverView">
            <div class="preview">
              <i class="iconfont icon-xiugai preIcon" @click="openInput()"></i>
            </div>
            <div class="delete">
              <i class="iconfont icon-cangpeitubiao_shanchu delIcon" @click="removeImg()"></i>
            </div>
          </div>
        </div>
      </div>
      <!--    <div class="searchBoxByText searchBox"></div>-->
    </div>
    <div class="resultArea">
      <div class="resultBox" id="resBox">
        <div class="header" id="header">
          <div class="resultText">
            搜索结果共9条
          </div>
          <div class="filter">
            筛选
            <select class="tag">
              <option value="person">人像</option>
              <option value="animal">动物</option>
              <option value="building">建筑</option>
              <option value="view">风景</option>
              <option value="object">物品</option>
            </select>
            <button class="reSearch">重新搜索</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref, defineComponent, onMounted , getCurrentInstance, watch} from 'vue'
import {uploadImg2} from "utils/api";
export default defineComponent({
  name: "Interaction",
  setup(props,ctx){
    const instance = getCurrentInstance()
    let image = ref('')
    let rawImage = ref(require('@/assets/rawImg.png'))
    let resImg = reactive([])
    function uploadImg(){
      if(image){
        //instance.type.methods.fun()
        // const submit2 = document.getElementById('submit2')
        // submit2.click()
        const file_input = document.getElementsByTagName('form')[0]
        const formData = new FormData(file_input)
        const resBox = document.getElementById('resBox')
        uploadImg2(formData).then(res => {
          resImg = Object.values(res.data).map(value => 'http://localhost:5000' + value)
          resImg.forEach(url => {
            let result = document.createElement('div')
            result.classList.add('result')
            let img = document.createElement('img')
            img.src = url
            result.appendChild(img)
            resBox.appendChild(result)
          })
        })
        .catch(err => {
          console.log(err)
        })
      }else{
        alert("请先选择图片！")
      }
    }
    function chooseImg(e){
      const image2 = document.getElementById('image'),
        rawImg = document.getElementById('rawImg'),
        coverView = document.getElementById('coverView')
      let fileTypes = [".jpg", ".png"];  //我们所需要的图片格式
      let filePath = e.target.files[0].name
      if (filePath) {
        let filePic = e.target.files[0];            //选择的文件内容--图片
        let fileType = filePath.slice(filePath.indexOf("."));   //选择文件的格式
        let fileSize = e.target.files[0].size;            //选择文件的大
        if (fileTypes.indexOf(fileType) === -1) {  //判断文件格式是否符合要求
          alert("文件格式不符合要求！");
        }else{
          if (fileSize > 2* 1024 * 1024) {
            alert("文件大小不能超过2M！");
          } else {
            let reader = new FileReader();
            reader.readAsDataURL(filePic);
            reader.onload = function (e) {
              let data = e.target.result;
              image.value = e.target.result
              //加载图片获取图片真实宽度和高度
              image2.onload = function () {
                let width = image2.width;
                let height = image2.height;
              };
              image2.src = data.toString();
              rawImg.style.display = 'none';
              image2.style.display = 'block'
              coverView.style.display = 'flex'
            };
          }
        }
      }
    }
    function openInput(){
      const input = document.getElementById('openFile')
      input.click()
    }
    function removeImg(){
      const image2 = document.getElementById('image')
      const rawImg = document.getElementById('rawImg')
      const cover = document.getElementById('coverView')
      cover.style.display = 'none'
      rawImg.style.display = 'block'
      image2.src = ''
      image.value = ''
    }
    function fun(event){
      let formData2 = new FormData()
      formData2.append('files',formData.files[0])
      event.preventDefault()
      uploadImg2(formData2, formData.files[0]).then(response => {
        const resImgs = Object.values(response)
        //这里返回的是服务器路径下result文件夹里面的内容
        const baseUrl = ''
        const resBox = document.getElementById('resBox')
        const header = resBox.children[0]
        const resultText = header.children[0]
        const filter = header.children[1]
        resultText.style.display = 'block'
        filter.style.display = 'flex'
        resImgs.map(url => {
          url = 'http://192.168.31.45:5000' + url
          let result = document.createElement('div')
          result.classList.add('result')
          let img = document.createElement('img')
          img.src = url
          result.appendChild(img)
          resBox.appendChild(result)
          return url
        })
      }).catch(err => console.log(err))
    }
    return{
      image,
      rawImage,
      uploadImg,
      chooseImg,
      openInput,
      removeImg,
      fun,
      resImg
    }
  },
})
</script>
<style scoped>
html,body{
  margin: 0;
  padding: 0;
  overflow: hidden;
}
body{
  background-color:rgb(28,29,50) ;
}
.main{
  width: 90%;
  margin: 0 auto;
  overflow:hidden;
  background: linear-gradient(to bottom, #757F9A, #D7DDE8);
}
.searchArea{
  width: 30%;
  float: left;
}
.searchBox{
  width: 60%;
  height: 20vw;
  background-color: rgba(255,255,255,0.8);
  border-radius: 5px;
  box-shadow: 2px 2px 10px #fff;
  margin: 0 auto;
}
.searchBoxByImg{
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.searchBoxByImg .chooseImg,.search{
  width: 40%;
  height: 12%;
  align-items: center;
  margin-top: 5%;
}
.chooseImgBtn,.searchImgBtn{
  width: 100%;
  height: 100%;
  font-size: 1rem;
  text-align: center;
  border: 0;
  box-shadow: 1px 1px 10px #fff;
  border-radius: 3px;
  color: white;
}
.chooseImgBtn{
  background-color: rgb(81,103,121)
}
.searchImgBtn{
  background-color: #2c80c5
}
.chooseImgBtn:active,.searchImgBtn:active{
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-align: center;
  border: 0;
  box-shadow: 1px 1px 10px #fff;
  border-radius: 3px;
  color: white;
  background-color: #2196f3;
  opacity: 0.5;
}
.preImg{
  width: 90%;
  height: 80%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.preImg:hover .coverView{
  opacity: 1;
  left: 100%;
}
.preImg .image,.rawImg{
  width: 100%;
}
.image{
  display: none;
  width: 100%;
}
.coverView{
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
  background-color: rgba(20,20,27,0.5);
  opacity:0;
  transition:all 0.3s;
  transform: translateX(-100%);
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.preImg .preview,.delete{
  width: 30px;
  height: 30px;
  margin: 10px;
  text-align: center;
  line-height: 30px;
}
.preIcon,.delIcon{
  font-size: 25px !important;
  color: white;
  transition: all 0.2s;
}
.preIcon:hover,.delIcon:hover{
  font-size: 30px !important;
  color: #00EDB8;
}
.searchBoxByText{
  margin-top: 40px;
}
.resultArea{
  width: 70%;
  height: 50vw;
  float: right;
  position: relative;
}
.resultArea .resultBox{
  width: 96%;
  height: 39vw;
  margin-top: 100px;
  background-color: rgba(255,255,255,0.8);
  border-radius: 0 0 5px 5px;
  box-shadow: 2px 2px 10px #fff;
  margin-left: -5%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y: scroll;
}
.resultBox .header{
  width: 96%;
  height: 60px;
  background-color: rgb(152,140,125);
  position: absolute;
  top:40px;
  left: -5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.resultBox .result{
  width: 30%;
  height: 20vw;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  background-color: rgba(255,255,255,0.6);
  border-radius: 2px;
  box-shadow: 2px 2px 15px white;
}
.resultBox .result img{
  width: 90%;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}


::-webkit-scrollbar {
  width:12px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {

  border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgba(0,0,0,0.1);
}
::-webkit-scrollbar-thumb:window-inactive {
  background:rgba(255,0,0,0.4);
}
.resultText{
  width: 20%;
  height: 90%;
  color: white;
  text-align: center;
  font-size: 20px;
  padding-top: 13px;
  box-sizing: border-box;
  display: none;
}
.filter{
  width: 70%;
  height: 90%;
  color: white;
  text-align: left;
  font-size: 20px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  display: none;
}
.tag{
  width: 100px;
  height: 70%;
  border: 0 ;
  border-radius: 5px;
  font-size: 16px;
  margin: 0 20px 0 10px;
}
.reSearch{
  width: 15%;
  height: 70%;
  font-size: 1rem;
  text-align: center;
  border: 0;
  border-radius: 3px;
  background-color: #00F4A2;
  margin-right: 20px;
}
.reSearch:active{
  width: 15%;
  height: 70%;
  font-size: 1rem;
  text-align: center;
  border: 0;
  border-radius: 3px;
  color: white;
  background-color: #2c80c5;
  margin-right: 20px;
  opacity: 0.5;
}
</style>