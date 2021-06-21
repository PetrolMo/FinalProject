<template>
<div id="comparison" :style="{'display':show}">
  <div class="labelLeft">
    上色后
  </div>
  <div class="labelRight">
    上色前
  </div>
      <figure id="figure" :style="{'background-image': 'url('+oldImages+')'}" >
        <div id="divisor" class="gray" :style="{'background-image': ' url('+newImages+')'}" ></div>
      </figure>
      <input id="slider" type="range" min="0" max="100" value="50" v-on:input='moveDivisor'>
</div>
</template>

<script>
import {defineComponent , onUpdated, ref, watch} from 'vue'
export default defineComponent({
  name: "SlideContrast",
  props:{
    oldImages:{
      type:String,
    },
    newImages:{
      type:String
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
      const figure = comparison.children[2]
      const div = figure.children[0]
      figure.style.backgroundSize ='auto 100%'
     // div.style.backgroundSize = '100% auto'
      comparison.style.width = props.divW
      comparison.style.height = props.divH
      divisor.value = document.getElementById('divisor')
      slider.value = document.getElementById('slider')
      loading.value = true
      setTimeout(() => {
        loading.value = false
      },2000)
    })
    let divisor = ref()
    let slider = ref()
    let loading = ref(false)
    function moveDivisor(){
      divisor.value.style.width = slider.value.value+"%";
    }
    return{
      moveDivisor,
      divisor,
      slider,
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
  background-size: contain;
  background-repeat: no-repeat;
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
  background-size: auto 100%;
  position: absolute;
  width: 50%;
  box-shadow: 0 5px 10px -2px rgba(0,0,0,0.3);
  overflow: hidden;
  height: 100%;
  background-repeat: no-repeat;
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