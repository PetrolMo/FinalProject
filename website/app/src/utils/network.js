import axios from "axios";
import router from "@/router/index";
import store from '@/store/index'

//创建实例

const service = axios.create({
  baseURL:'http://localhost:3000',
  timeout:5000
})

//创建发起请求前的拦截器
service.interceptors.request.use(function (config){
  if(config.url === '/login') {
    console.log(config);
    return config
  }
  const token = store.state.token;
  token && (config.headers.Authorization = store.getters.bearerToken);
  console.log("这是"+config.url+"请求的请求体内容",config)
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
          router.replace({
            path: '/login',
            //query: {redirect: router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
          }).then(() => {
            alert("请先登陆再操作！")
          })
          break
        case 404:
          //
          console.log("hello")
      }
    }
    return Promise.reject(error)
  }
)

export default service
