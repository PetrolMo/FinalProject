import {createStore} from "vuex"

export default createStore({
  state:{
    tableData : [],
    user:'001'
  },
  getters:{},
  //同步修改
  mutations:{
    pushRecord(state,record){
      state.tableData.push(record)
    }
  },
  //异步提交mutations
  actions:{},
  modules:{}
})