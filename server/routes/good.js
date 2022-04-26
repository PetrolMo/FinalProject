const express = require('express')
const router = express.Router()
const Good = require('../model/goodList')
const token = require('../public/javascripts/token')
const logger = require('morgan')
const moment = require("moment");
const User = require("../model/user");
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
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
    },
    {
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
    },
    {
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
    },
    {
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
    },
    {
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
    },
    {
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
    },
    {
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
    },
    {
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
    },
    {
        price: 999,
        origin_price: 1000,
        campus: 0, // 0四平 1嘉定 2彰武 3忽西
        images: [],
        status: 0, // 0发布中 1已出售 2已下架 3出售中
        title: '商品标题',
        tags: ['私人'], // 0球鞋
        desc: '这是一双球鞋',
        user_id: '62681f0738a28530516fb0ba',
        username: '用户'
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
router.get('/goodList',(req,res) => {
    // 筛选条件 商品名称 title 商品价格区间price_range // 校区campus // 发布时间 date_range // 发布者名称 username // 商品状态 status
    let { page = '1', size = '10' } = req.query
    page = parseInt(page)
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
    Good.countDocuments(filters).then((count) => {
        Good
          .find(filters)
          .skip((page - 1) * size)
          .limit(size)
          .sort({ 'created' : -1 })
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
module.exports = router





