<template>
  <div class="loginArea">
    <el-row align="middle">
      <el-col :span="6" :offset="9">
        <el-card shadow="always" class="loginCard">
          <div class="loginTitle">登录测试中心</div>
          <div class="logo">
            <el-image class="logo-image" :src="logo" fit="contain"/>
          </div>
          <el-divider></el-divider>
          <el-form
            :model="userInfo"
            class="loginForm"
            status-icon
            ref="userinforef"
            :rules="rules"
            autocomplete="on"
          >
            <el-form-item prop="username">
              <el-input
                v-model="userInfo.username"
                placeholder="请输入用户名或手机号"
                ref="username"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="userInfo.password"
                placeholder="请输入密码"
                ref="password"
                name="password"
                tabindex="2"
                autocomplete="on"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width:100%; margin-bottom:30px;"
                @click="handleLogin(userInfo)"
                v-loading.fullscreen.lock="fullLoading"
              >登录</el-button>
            </el-form-item>
          </el-form>
          <div class="registerBtn">
            <el-button type="text" @click="toRegister">注册账号</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, getCurrentInstance } from 'vue'
import {validateVPassword,} from "@/utils/validate"
import {login} from "utils/api";
export default defineComponent({
  name: "Login",
  setup(props,ctx){
    let fullLoading = ref(false)
    const instance = getCurrentInstance()
    /**
     * 表单校验
     */
    // 密码验证
    let validatePassword = (rule, value, callback) => {
      if (value === "") callback(new Error("密码不能为空！"));
      else if (validateVPassword(value)) {
        callback(new Error("密码格式有误！"));
      } else callback();
    };
    let userInfo = reactive({
      username:'',
      password:''
    })
    let logo = ref(require('assets/logo2.jpg'))
    // 表单验证
    const rules = reactive({
      username:[
        {required:true,message:'用户名不能为空！',trigger:'blur'}
      ],
      password: [
        {
          validator: validatePassword,
          trigger: "blur"
        }
      ],
    });
    return{
      userInfo,
      logo,
      rules,
      fullLoading
    }
  },
  methods:{
    handleLogin(formName){
      const that = this
      const fieldPromise = Object.getOwnPropertyNames(formName).map(item => {
        return new Promise((resolve,reject) => {
          that.$refs.userinforef.validateField(item, error =>{
            resolve(error);
          })
        })
      });
      //利用 Promise.all 方法统一处理上面 map 出来的方法
      Promise.all(fieldPromise).then(item => {
        //过滤数组中的空字符串，list.length为0表示通过验证
        const list = item.filter(data => data);
        if(list.length === 0){
          that.fullLoading = true
          console.log('校验通过');
          //进行登录操作
          login(this.userInfo)
            .then(res => {
              that.$store.commit('setToken', res.data.token)
              that.$store.commit('setUserName',res.data.username)
              localStorage.setItem('username', res.data.username)
              localStorage.setItem('token', res.data.token)
              setTimeout(() => {
                this.$notify({
                  title: '登录成功',
                  showClose:false,
                  duration:1000,
                  type: 'success',
                  onClose:() => {
                    that.fullLoading = false
                    setTimeout(() => {
                      if (that.$route.query.redirect) { //如果存在参数
                        let redirect = that.$route.query.redirect
                        that.$router.replace(redirect)//则跳转至进入登录页前的路由
                      } else {
                        that.$router.replace('/')//否则跳转至首页
                      }
                    },300)
                  }
                });
              },2000)
            })
            .catch(err => {
              that.fullLoading = false
              if(err == 'Error: Network Error'){
                that.$notify.error({
                  title:'登录失败',
                  message:"无法连接服务器，请稍后再试。",
                  duration:1500,
                  showClose:false
                })
              }else{
                that.$notify.error({
                  title:'登录失败',
                  message:"用户名或者密码错误，请重新输入。",
                  duration:1500,
                  showClose:false
                })
              }
            })
        }
      });
    },
    toRegister(){
      this.$router.replace('/register')
    }
  }
})
</script>

<style scoped lang="less">
.loginArea{
  height: 100vh;
  background: linear-gradient(to bottom, #00C9FF, #92FE9D);
  .loginTitle{
    text-align: center;
    font-size: 20px;
    font-weight: 10;
    margin: 30px 0 30px 0;
  }
  .logo{
    .logo-image{
      display: block;
      margin: 0 auto;
      border-radius: 40px;
      height: 80px;
      width: 80px;
    }
  }
  .loginCard{
    margin-top: 30%;
    background-color: rgba(255,255,255,0.8);
    box-shadow: white;
    .registerBtn{
      float: right;
      margin-top: -30px;
      margin-bottom: 20px;
    }
  }
  .loginForm{
    margin-top: 50px;
  }
}
</style>
