var express = require('express');
var router = express.Router();
const token = require('../public/javascripts/token')

router.get('/',(req,res) => {
  res.send("hello")
})
module.exports = router