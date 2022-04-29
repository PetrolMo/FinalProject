const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MarkSchema = new Schema({
  good: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'goodList'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
},{timestamps: {createdAt: 'created'}})

module.exports = mongoose.model('mark',MarkSchema)
