const express = require('express')
const router = express.Router()
const good = require('../model/goodList')
const token = require('../public/javascripts/token')
/**
 * @api {post} /good 添加商品
 * @apiDescription 添加商品
 * @apiName addGood
 * @apiGroup Good
 * @apiParam {object} body 商品表单
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *      }
 *  }
 * @apiSampleRequest http:localhost:3000/good
 * @apiVersion 1.0.0
 */

router.post('/',(req,res) => {
    const userId = token.getUserId(req.headers.authorization)
    good
        .find({
        postUserId:{
            $ne:userId
        }
    })
        .limit(req.body.needNumber)
        .skip(req.body.skipNumber)
        .then(_res => {
        res.send(_res)
    })
})
router.post('/postGood',(req,res) => {
    const data = req.body
    const userId = token.getUserId(req.headers.authorization)
    good.create({
        price: data.price,
        campus: data.campus,
        images: data.images,
        state: 0,
        title: data.title,
        goodType: data.goodType,
        description: data.description,
        postUserId:userId
    }).then(r => {
        console.log("添加商品成功")
        res.send(r)
    })
})
module.exports = router





