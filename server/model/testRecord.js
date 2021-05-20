const mongo = require('mongoose')

const testRecordSchema = new mongo.Schema({
  testId:{
    type:String,
    required:true
  },
  operator:{
    type:String,
    required:true
  },
  input:{
    type:Object,
  },
  output:{
    type:String
  },
  testTime:{
    type:String,
  }
})

module.exports = mongo.model('testRecord',testRecordSchema)