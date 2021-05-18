const mongoose = require('mongoose')

const GoodSchema = new mongoose.Schema({
    price:{
        type:Number,
        default:0,
    },
    campus:{
        type:String,
        default:''
    },
    images:{
        type:Array,
        default:[]
    },
    postUserId:{
        type:String,
        required:true
    },
    state:{
        type:Number,
        default:0
    },
    title:{
        type:String,
        default:''
    },
    goodType:{
        type:Array,
        default:[]
    },
    description:{
        type:String,
        default:''
    }



})
module.exports = mongoose.model('goodLists',GoodSchema)