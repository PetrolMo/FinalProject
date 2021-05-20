import {createStore} from "vuex"

export default createStore({
  state:{
    tableData : [],
    user:'001',
    token:'',
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
    pushRecord(state,record){
      state.tableData.push(record)
    },
    setToken(state,token){
      state.token = token
    },
    setUserName(state,userName){
      state.userInfo.username = userName
    }
  },
  //异步提交mutations
  actions:{},
  modules:{}
})