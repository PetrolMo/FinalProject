//upload.js


const qnconfig = require('../public/javascripts/qiniu')
var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', (req, res, next) => {
    const token = qnconfig
    console.log(token)
    res.send({
        status: 1,
        message: '上传凭证获取成功',
        upToken: token,
    })
})
module.exports = router;