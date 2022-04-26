const mongoose = require('mongoose')
const secretPSW = require('bcryptjs')
const Schema = mongoose.Schema
const AdminSchema = new Schema({
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
    }
})

module.exports = mongoose.model('admin',AdminSchema)
