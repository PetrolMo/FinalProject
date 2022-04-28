const mongoose = require('mongoose')

const GoodSchema = new mongoose.Schema({
    good_type: { // 商品类别
        type: Number,
        required: true
    },
    price: { // 价格
        type: Number,
        default: 0,
    },
    origin_price: { // 原价
        type: Number,
        default: 0,
    },
    tags: { // 商品标签
        type: Array,
        default: [
            {
                title: '品牌',
                brand: 'Nike'
            },
            {
                title: '尺码',
                brand: '42'
            },
            {
                title: '款式',
                brand: '球鞋'
            },
            {
                title: '颜色',
                brand: '黑白'
            },
            {
                title: '鞋盒',
                brand: '有'
            }
        ]
    },
    campus: { // 校区
        type: Number,
        default: 1
    },
    images: { // 商品图片
        type: Array,
        default: []
    },
    can_discount: {
        type: Boolean,
        default: true
    },
    status: { // 商品状态
        type: Number,
        default: 0
    },
    title: { // 标题
        type: String,
        default: ''
    },
    desc: { // 描述
        type: String,
        default: ''
    },
    user: { // 发布者ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    mark_count: { type: Number, default: 0 } // 收藏数
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})
module.exports = mongoose.model('goodList',GoodSchema)
