const express = require('express')
const router = express.Router()
const Good = require('../model/goodList')
const logger = require('morgan')
const moment = require("moment");
const User = require("../model/user");
const Reply = require('../model/reply')
const Mark = require('../model/mark')
const Follow = require('../model/flollow')
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
const mockGood = [
    {
        user: '626a82c11dff931643f54226',
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        desc: '这是一双球鞋',
        good_type: 0
    }
]
const priceOption = {
    '0': [0, 200],
    '1': [200, 500],
    '2': [500, 1000],
    '3': [1000, 2000],
    '4': [2000, 99999999]
}
router.get('/mock',(req,res) => {
    Good.insertMany(mockGood).then((_res) => {
        res.send({
            msg: '批量插入成功',
            _res
        })
    }).catch(err => {
        res.send({
            err
        })
    })
})
router.get('/remove', (req, res) => {
    Good.remove().then(() => {
        res.send({
            msg: '批量删除成功'
        })
    }).catch(err => {
        res.send({
            err
        })
    })
})
router.post('/post', (req, res) => {
    const data = req.body
    Good.create(data).then(_res => {
        res.send(_res)
    }).catch(err => res.send(err))
})
router.get('/goodList',(req,res) => {
    // 筛选条件 商品名称 title 商品价格区间price_range // 校区campus // 发布时间 date_range // 发布者名称 username // 商品状态 status
    let { page = '1', size = '10', type } = req.query
    page = parseInt(page)
    type = parseInt(type)
    size = parseInt(size)
    const filters = {
        ...req.query
    }
    if (req.query.username) {
        filters.username = { $regex : new RegExp(req.query.username, 'i') }
    }
    if (req.query.date_begin) {
        filters.created = { $gte: moment(req.query.date_begin).startOf('day'), $lt: moment(req.query.date_end).endOf('day')}
        delete filters.date_begin
        delete filters.date_end
    }
    if (type) {
        filters.status = { $ne: 0 }
        delete filters.type
    }
    if (req.query.price_range) {
        filters.price = {
            $gte: priceOption[req.query.price_range][0],
            $lt: priceOption[req.query.price_range][1]
        }
        delete filters.price_range
    }
    delete filters.page
    delete filters.size
    delete filters.total
    delete filters.discount0
    delete filters.discount1
    Good.countDocuments(filters).then((count) => {
        Good
          .find(filters)
          .populate('user', 'username avatar')
          .skip((page - 1) * size)
          .limit(size)
          .sort({ 'updated' : -1 })
          .then(data => {
              res.send({
                  status: 200,
                  data: data,
                  total: count,
                  msg:'OK'
              })
          })
          .catch(err => {
              logger(`good::/list::err:${JSON.stringify(err)}`);
              res.send({
                  status: 9001,
                  msg: JSON.stringify(err)
              })
          })
    }).catch(err => {
        logger(`good::/list::err:${JSON.stringify(err)}`);
        res.send({
            status: 9000,
            msg: '查询错误' + err
        })
    })
})
router.get('/enable', (req, res) => {
    const _id = req.query._id
    Good.findByIdAndUpdate(_id, {
        status: 1
    }).then(() => {
        res.send({
            type: 'success',
            msg: '启用成功'
        })
    })
})
router.get('/disable', (req, res) => {
    const _id = req.query._id
    Good.findByIdAndUpdate(_id, {
        status: 0
    }).then(() => {
        res.send({
            type: 'success',
            msg: '禁用成功'
        })
    })
})
router.post('/edit', (req, res) => {
    const data = req.body
    Good.findByIdAndUpdate(data._id, {
        ...data
    }).then(_res => {
        res.send({
            msg: '修改成功'
        })
    })
})
router.post('/msg', (req, res) => {
    const data = req.body
    Reply.create({
        user: data.user,
        message: data.message,
        good: data.good
    }).then(_res => {
        res.send(_res)
    }).catch(err => res.send(err))
})
router.get('/removeMsg', (req, res) => {
    Reply.remove().then(_res => {
        res.send(_res)
    })
})
router.get('/queryMsg', (req, res) => {
    Reply
      .find({
        good: req.query.good
      })
      .sort({ 'like_count': -1 })
      .populate('user', '').then(data => {
        res.send({ result: data })
    })
})
router.post('/like', (req, res) => {
    Reply.findByIdAndUpdate(req.body._id, {
        $inc: {
            like_count: req.body.num
        }
    }).then(() => {
        res.send('点赞成功')
    }).catch(err => res.send(err))
})
router.get('/postList', (req, res) => {
    const user_id = req.query.user_id
    Good.find({
        user: user_id
    }).sort({ 'created': -1 }).then(_res => {
        res.send(_res)
    })
})
router.post('/mark', (req, res) => {
    const { user, good } = req.body
    Mark.find({
        $and:[
            {user: user},
            {good: good}
        ]
    }).then(_res => {
        if (_res.length === 0) {
            Mark.create({
                user: user,
                good: good
            }).then((_res) => {
                res.send(true)
            })
        } else {
            Mark.findByIdAndRemove(_res[0]._id).then(() => {
                res.send(false)
            })
        }

    })

})
router.get('/checkMark', (req, res) => {
    const { user, good } = req.query
    Mark.find({
        $and:[
            {user: user},
            {good: good}
        ]
    }).then(_res => {
        if (_res.length === 0) {
            res.send(false)
        } else {
           res.send(true)
        }

    })
})
router.get('/removeMark', (req, res) => {
    Mark.remove().then(_res => {
        res.send(_res)
    })
})
router.get('/markUser', (req, res) => {
    const good = req.query.good
    Mark.find({
        good: good
    }).sort({ 'created': -1 })
      .populate('user', '').then(data => {
        res.send({ result: data })
    })
})
router.get('/markGood', (req, res) => {
    const user = req.query.user
    Mark.find({
        user: user
    }).sort({ 'created': -1 })
      .populate('good', '').then(data => {
        res.send({ result: data })
    })
})
router.get('/queryGood', (req, res) => {
    const _id = req.query._id
    Good.findById(_id).populate('user', '').then(_res => {
        res.send(_res)

    })
})
module.exports = router





