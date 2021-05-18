const express = require('express')
const router = express.Router()
const testRecord = require('../model/testRecord')

router.post('/',(req,res) => {
  let data = req.body
  testRecord.insertMany(data).then(_res => {
    res.send('insert success!')
  }).catch(err => {
    res.send(['insert fail!',err])
  })

})

module.exports = router