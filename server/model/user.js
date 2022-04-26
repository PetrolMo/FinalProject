const mongoose = require('mongoose')
const secretPSW = require('bcryptjs')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type:String,
    required:true
  },
  status: {
    type: Number,
    default: 1
  },
  password: {
    type:String,
    // required: true,
    // set(value) {
    //   return secretPSW.hashSync(value,10)
    // }
  },
  gender: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: false,
    default: '暂无个人简介'
  },
  birthday: {
    type: Date,
    default: new Date('1999.06.14')
  },
  campus: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  }
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})

module.exports = mongoose.model('user',UserSchema)
