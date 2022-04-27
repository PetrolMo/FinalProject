const mongoose = require('mongoose')

const GoodSchema = new mongoose.Schema({
    price: { // 价格
        type: Number,
        default: 0,
    },
    origin_price: { // 原价
        type: Number,
        default: 0,
    },
    campus: { // 校区
        type: Number,
        default: ''
    },
    images: { // 商品图片
        type: Array,
        default: []
    },
    user_id: { // 发布者ID
        type: String,
        required: true
    },
    status: { // 商品状态
        type: Number,
        default: 0
    },
    title: { // 标题
        type: String,
        default: ''
    },
    tags: { // 商品类型
        type: Array,
        default: ''
    },
    desc: { // 描述
        type: String,
        default: ''
    },
    username: { // 用户名
        type: String,
        default: ''
    }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})
module.exports = mongoose.model('goodList',GoodSchema)
