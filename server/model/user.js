const mongoose = require('mongoose')
const secretPSW = require('bcryptjs')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        set(value){
            return secretPSW.hashSync(value,10)
        }
    },
    age:Number,
    sex:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('users',UserSchema)