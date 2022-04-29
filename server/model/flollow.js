const mongoose = require('mongoose')
const Schema = mongoose.Schema
const FollowSchema = new Schema({
  follow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
},{timestamps: {createdAt: 'created'}})

module.exports = mongoose.model('follow',FollowSchema)
