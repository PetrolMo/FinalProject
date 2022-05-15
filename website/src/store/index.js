import {createStore} from "vuex"

export default createStore({
  state:{
    userInfo:{
      username:''
    },
    token: ''
  },
  getters:{
    bearerToken:state => {
      return 'Bearer '+ state.token
    }
  },
  //同步修改
  mutations:{
    setUserName(state, option){
      state.userInfo.username = option
    },
    setToken(state, option){
      state.token = option
    }
  },
  //异步提交mutations
  actions:{},
  modules:{}
})
