import axios from "axios";
import router from "@/router/index";
import store from '@/store/index'
import { ElMessage } from 'element-plus'
//创建实例

const service = axios.create({
 // baseURL:'https://colorize.cn1.utools.club',
  baseURL:'http://localhost:3000',
  timeout:10000
})

//创建发起请求前的拦截器
service.interceptors.request.use(function (config){
  const token = store.state.token;
  console.log("这是"+config.url+"请求的请求体内容",config)
  if(config.url === '/login'|| config.url === '/register') {
    return config
  }
  if(!token){
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.value.fullPath}   //登录成功后跳入浏览的当前页面
    }).then(() => {
      ElMessage.warning({
        message: '请先登录后操作。',
        type: 'warning',
        center:true,
        duration:2000
      });
    })
    return Promise.reject('请先登陆后操作')
  }
  token && (config.headers.Authorization = store.getters.bearerToken);
  return config;
},function (error){
  console.log("请求发生错误！")
  return Promise.reject(error)
})

//收到回复时的拦截器
service.interceptors.response.use(response => {
    const config = response.config
    console.log("这是"+config.url+"请求的返回结果",response)
    return response
  },error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          store.commit('setToken','')
          router.replace({
            path: '/login',
            //query: {redirect: router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
          }).then(() => {
            ElMessage.warning({
              message: '请先登录后操作。',
              type: 'warning',
              center:true,
              duration:2000
            });
          })
          break
        case 404:
          //设置404的跳转页面
          console.log('页面404了')
          break
        case 420:
          //新增用户失败
          console.log('新增用户失败')
          break
        case 421:
          console.log('用户不存在')
          break
        case 422:
          console.log('密码无效')
          break
        case 423:
          console.log('获取token失败')
          break
      }
    }
    return Promise.reject(error)
  }
)
export default service
