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
    discount: { // 现价
        type: Number,
        default: 0,
    },
    campus: { // 校区
        type: [String, Number],
        default: ''
    },
    images: { // 商品图片
        type: Array,
        default: []
    },
    post_id: { // 发布者ID
        type: String,
        required: true
    },
    state: { // 商品状态
        type: Number,
        default: 0
    },
    title: { // 标题
        type: String,
        default: ''
    },
    good_type: { // 商品类型
        type: [String, Number],
        default: ''
    },
    description: { // 描述
        type: String,
        default: ''
    },
    is_bargaining: { // 是否可砍价
        type: Boolean,
        default: false
    },
    is_postage: { // 是否邮递
        type: Boolean,
        default: false
    },
    postage_price: { // 邮费
        type: Number,
        default: 0
    }

})
module.exports = mongoose.model('goodList',GoodSchema)
