const mongoose = require('mongoose')

const GoodSchema = new mongoose.Schema({
    id: {
        type:String
    },
    price:{ // 价格
        type:Number,
        default:0,
    },
    campus:{ // 校区
        type:String,
        default:''
    },
    images:{ // 商品图片
        type:Array,
        default:[]
    },
    post_user_id:{ // 发布者ID
        type:String,
        required:true
    },
    state:{ // 商品状态
        type:Number,
        default:0
    },
    title:{ // 标题
        type:String,
        default:''
    },
    goodType:{ // 商品类型
        type:Array,
        default:[]
    },
    description:{ // 描述
        type:String,
        default:''
    }



})
module.exports = mongoose.model('goodLists',GoodSchema)
