import {createStore} from "vuex"

export default createStore({
  state:{
    userInfo:{
      username:''
    }
  },
  getters:{
    bearerToken:state => {
      return 'Bearer '+ state.token
    }
  },
  //同步修改
  mutations:{
    setUserName(state,userName){
      state.userInfo.username = userName
    }
  },
  //异步提交mutations
  actions:{},
  modules:{}
})
