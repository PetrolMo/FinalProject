const express = require('express')
const router = express.Router()
const Certification = require('../model/certificate')
const logger = require('morgan')
const moment = require("moment");
const mongoose = require('mongoose')
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
const mockCertification = [
  {
    campus_id: '1850956', // 0四平 1嘉定 2彰武 3忽西
    images: [],
    status: 0, // 0待审核 1通过 -1拒绝
    desc: '这是一双球鞋',
    user: '626c067ae737c02a12cb18f8'
  }
]
router.get('/mock',(req,res) => {
  Certification.insertMany(mockCertification).then((_res) => {
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
  Certification.remove().then(() => {
    res.send({
      msg: '批量删除成功'
    })
  }).catch(err => {
    res.send({
      err
    })
  })
})
router.get('/certList',(req,res) => {
  // 筛选条件 商品名称 title 商品价格区间price_range // 校区campus // 发布时间 date_range // 发布者名称 username // 商品状态 status
  let { page = '1', size = '10', username } = req.query
  page = parseInt(page)
  size = parseInt(size)
  const filters = {
    ...req.query
  }
  if (req.query.date_begin) {
    filters.created = { $gte: moment(req.query.date_begin).startOf('day'), $lt: moment(req.query.date_end).endOf('day')}
    delete filters.date_begin
    delete filters.date_end
  }
  delete filters.page
  delete filters.size
  delete filters.total
  Certification.countDocuments(filters).then((count) => {
    Certification
      .find(filters)
      .skip((page - 1) * size)
      .limit(size)
      .populate('user', '')
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
        logger(`certification::/list::err:${JSON.stringify(err)}`);
        res.send({
          status: 9001,
          msg: err
        })
      })
  }).catch(err => {
    logger(`certification::/list::err:${JSON.stringify(err)}`);
    res.send({
      status: 9000,
      msg: '查询错误' + err
    })
  })
})
router.post('/post', (req, res) => {
  const { user, name, campus_id, desc, images } = req.body
  Certification.find({
    user: user
  }).then(_res => {
    if (_res.length === 0) {
      Certification.create({
        user: user,
        name: name,
        campus_id: campus_id,
        desc: desc,
        images: images
      }).then(() => {
        res.send(true)
      })
    } else {
      Certification.findOneAndUpdate({
        user: user
      },{
        user: user,
        name: name,
        campus_id: campus_id,
        desc: desc,
        images: images
      }).then((_res) => {
        res.send(true)
      })
    }
  })
})
router.get('/delete', (req, res) => {
  const { user } = req.query
  Certification.findOneAndRemove({
    user: user
  }).then((_res) => {
    res.send(true)
  })
})
router.get('/enable', (req, res) => {
  const _id = req.query._id
  Certification.findByIdAndUpdate(_id, {
    status: 1
  }).then(() => {
    res.send({
      type: 'success',
      msg: '通过成功'
    })
  })
})
router.get('/disable', (req, res) => {
  const _id = req.query._id
  Certification.findByIdAndUpdate(_id, {
    status: -1
  }).then(() => {
    res.send({
      type: 'success',
      msg: '拒绝成功'
    })
  })
})
router.get('/check', (req, res) => {
  const user = req.query.user
  Certification.find({
    user: new mongoose.Types.ObjectId(user)
  }).populate('user', '').then(_res => {
   res.send(_res)
  })
})

module.exports = router





