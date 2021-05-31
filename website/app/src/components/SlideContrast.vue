<template>
<div id="comparison" :style="{'display':show}">
  <div class="labelLeft">
    上色前
  </div>
  <div class="labelRight">
    上色后
  </div>
  <el-carousel indicator-position="none" :initial-index="0" :height="divH" @change="handleChange" v-loading="loading">
    <el-carousel-item v-for="(item,index) in oldImages" :key="item" >
      <figure id="figure" :style="{'background-image': 'url('+item+')'}" >
        <div :id="'divisor'+index" class="gray" :style="{'background-image': ' url('+newImages[index]+')'}" ></div>
      </figure>
      <input :id="'slider' + index" type="range" min="0" max="100" value="50" v-on:input='moveDivisor'>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import {defineComponent , onUpdated, ref, onMounted, watch} from 'vue'
export default defineComponent({
  name: "SlideContrast",
  props:{
    oldImages:{
      type:Array,
    },
    newImages:{
      type:Array
    },
    divW:'',
    divH:'',
    show:{
      type:String,
      default:'none'
    }
  },
  setup(props,ctx){
    onUpdated(() => {
      const comparison = document.getElementById('comparison')
      comparison.style.width = props.divW
      comparison.style.height = props.divH
    })
    let divisor = ref()
    let slider = ref()
    let activeDivisor = ref('divisor0')
    let activeSlider = ref('slider0')
    let loading = ref(false)
    watch([activeDivisor,activeSlider], (newValue,preValue) => {
      divisor.value = document.getElementById(newValue[0])
      slider.value = document.getElementById(newValue[1])
      slider.value.value = '50'
      divisor.value.style.width = '50%'

    },{
      deep:true,
    })
    watch([props.oldImages,props.newImages],()=>{
      divisor.value = document.getElementById(activeDivisor.value)
      slider.value = document.getElementById(activeSlider.value)
      loading.value = true
      const that = this
      setTimeout(() => {
        loading.value = false
      },3000)
    },{
      deep:true,
    })
    function moveDivisor(){
      divisor.value.style.width = slider.value.value+"%";
    }
    function handleChange(active,last){
      activeDivisor.value = 'divisor' + active
      activeSlider.value = 'slider' + active
    }
    return{
      moveDivisor,
      handleChange,
      activeDivisor,
      divisor,
      slider,
      activeSlider,
      loading
    }
  }
})
</script>

<style>
.labelLeft{
  position: fixed;
  top: 20px;
  left: 34px;
  color: white;
  z-index: 9999;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  align-items: center;
  padding-left: 20px;
  width: 100px;
  background-color: rgba(155,155,155,0.5);
}
.labelRight{
  position: fixed;
  top: 20px;
  right: 34px;
  z-index: 99999;
  color: black;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  align-items: center;
  padding-left: 20px;
  width: 100px;
  background-color: rgba(0,176,255,0.5)
}
div#comparison {
  overflow: hidden;
  background-color: #494b52;
  perspective: 100px;
}
div#comparison figure {
  background-size: cover;
  position: relative;
  font-size: 0;
  width: 90%;
  height: 90%;
  margin: 20px auto 0;

}
div#comparison figure > img {
  position: relative;
  width: 100%;
}
div#comparison figure div {
  background-size: cover;
  position: absolute;
  width: 50%;
  box-shadow: 0 5px 10px -2px rgba(0,0,0,0.3);
  overflow: hidden;
  height: 100%;
}

input[type=range]{
  -webkit-appearance:none;
  -moz-appearance:none;
  position: relative;
  top: -50%;
  background-color: rgba(255,255,255,0.1);
  width: 92%;
  left: 4%;
  height: 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]:active {
  outline: none;
}

input[type=range]::-moz-range-track {
  -moz-appearance:none;
  height:15px;
  width: 102%;
  background-color: rgba(255,255,255,0.1);
  position: relative;
  outline: none;
}
input[type=range]:active {
  border: none;
  outline: none;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance:none;
  width: 30px; height: 30px;
  background: rgba(255,255,255,0.8);
  border-radius: 15px;
  border: 3px solid #006eb3;
}
input[type=range]::-moz-range-thumb {
  -webkit-appearance:none;
  width: 30px; height: 30px;
  background: rgba(255,255,255,0.8);
  border-radius: 15px;
  border: 3px solid #006eb3;

}
input[type=range]:focus::-webkit-slider-thumb {
  background: rgba(255,255,255,0.5);
}
input[type=range]:focus::-moz-range-thumb {
  background: rgba(255,255,255,0.5);
}
</style>