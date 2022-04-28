const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ReplySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  good: {
    type: String
  },
  message: {
    type: String
  },
  like_count: {
    type:Number,
    default: 0
  }
},{timestamps: {createdAt: 'created'}})

module.exports = mongoose.model('reply',ReplySchema)
