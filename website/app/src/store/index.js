import {createStore} from "vuex"

export default createStore({
  state:{
    table1:{},
    table2:{},
    table3:{},
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
    },
    setTable1(state,table1){
      state.table1 = table1
    },
    setTable2(state,table2){
      state.table2 = table2
    },
    setTable3(state,table3){
      state.table3 = table3
    },
  },
  //异步提交mutations
  actions:{},
  modules:{}
})