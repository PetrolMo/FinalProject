const express = require('express')
const router = express.Router()
const csv = require('../public/javascripts/csv')

router.post('/test1',((req, res) => {
  // let csvArray = req.body.split("\r\n");
  let csvArray = Object.keys(req.body)[0].toString().split('\r\n')
  let resArray = csvArray.map(value => value.split(','))
  res.send(resArray)
}))
module.exports = router