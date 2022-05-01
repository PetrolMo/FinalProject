const mongoose = require('mongoose')

const CertificateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  images: { // 认证图片
    type: Array,
    default: []
  },
  status: { // 认证状态
    type: Number,
    default: 0 // 0未通过 1通过 -1拒绝
  },
  name: { // 姓名
    type: String,
    default: ''
  },
  campus_id: { // 学号
    type: String,
    default: ''
  },
  desc: { // 描述
    type: String,
    default: ''
  }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})
module.exports = mongoose.model('certList',CertificateSchema)
