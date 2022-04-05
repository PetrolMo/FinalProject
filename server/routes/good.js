const express = require('express')
const router = express.Router()
const Good = require('../model/goodList')
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
const data = {
    price: 999,
    origin_price: 1000,
    discount: 0.999,
    campus: 0, // 0四平 1嘉定 2彰武 3忽西
    images: [],
    state: 0, // 0发布中 1已出售 2已下架 3出售中
    title: '商品标题',
    good_type: 0, // 0球鞋
    description: '这是一双球鞋',
    is_bargaining: true,
    post_id: 123,
    is_postage: false,
    postage_price: 0
}
router.post('/',(req,res) => {
    const userId = token.getUserId(req.headers.authorization)
    Good
        .find(
          // {
          //     post_id:
          //       {
          //           $ne:userId
          //       }
          // }
    )
        .limit(1)
        .skip(0)
        .then(_res => {
        res.send(_res)
    })
})
router.post('/postGood',(req,res) => {
    const data = req.body
    const userId = token.getUserId(req.headers.authorization)
    Good.create({
        price: data.price,
        campus: data.campus,
        images: data.images,
        state: 0,
        title: data.title,
        good_type: data.good_type,
        description: data.description,
        post_id:userId
    }).then(r => {
        console.log("添加商品成功")
        res.send(r)
    })
})
router.get('/test_insert', (req, res) => {
    Good.create({
        price: data.price,
        origin_price: data.origin_price,
        campus: data.campus,
        images: data.images,
        state: data.state,
        title: data.title,
        good_type: data.good_type,
        description: data.description,
        post_id: data.post_id,
        is_postage: data.is_postage,
        is_bargaining: data.is_bargaining
    }).then(r => {
        console.log("添加商品成功")
        res.send(r)
    }).catch(err => {
        res.send('添加商品失败')
    })
})
router.get('/test_record', (request, result) => {
    Good.find().limit(1).skip(0).then(res => {
        result.send(res)
    })
})
module.exports = router





