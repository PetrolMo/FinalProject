const express = require('express')
const router = express.Router()
const User = require('../model/user')
const logger = require('morgan')
const moment = require('moment')
const mockUser = [
  {
    username: moment(new Date()).format(''),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0,
    status: 1
  },
  {
    username: moment(new Date()).format('ss:mm'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0,
    status: 1
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0,
    status: 0
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0,
    status: 1
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0,
    status: 1
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0,
    status: 0
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0,
    status: 0
  }
]
router.get('/',(req,res) => {
  res.send("hello")
})
// 获取用户列表
router.get('/userList', (req, res) => {
  let { page, size } = req.query
  page = parseInt(page)
  size = parseInt(size)
  const filters = {
    ...req.query
  }
  delete filters.page
  delete filters.size
  delete filters.total
  if (req.query.username) {
    filters.username = { $regex : new RegExp(req.query.username, 'i') }
  }
  User.countDocuments(filters, (error, count) => {
    if (error) {
      logger(`user::/list::error:${JSON.stringify(error)}`)
      res.json({
        status: 9000,
        msg: JSON.stringify(error)
      })
    } else {
      User.find(
        filters
      ).skip((page - 1) * size).limit(size).sort({ 'created': -1 }).exec((err, doc) => {
        if (err) {
          logger(`user::/list::err:${JSON.stringify(err)}`);
          res.send({
            status: 9001,
            msg: JSON.stringify(err)
          });
        } else {
          res.send({
            status: 200,
            data: doc,
            total: count,
            msg:'OK'
          })
        }
      })
    }
  })

})
router.get('/enable', (req, res) => {
  const _id = req.query._id
  User.findByIdAndUpdate(_id, {
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
  User.findByIdAndUpdate(_id, {
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
  User.findByIdAndUpdate(data._id, {
    ...data
  }).then(_res => {
    res.send({
      msg: '修改成功'
    })
  })
})
// mock 用户数据
router.get('/mock', (req, res) => {
  User.insertMany(mockUser, {}).then((_res) => {
    res.send({
      data: _res,
      msg: '批量插入用户数据成功'
    })
  }).catch(err => {
    logger(`user::/list::err:${JSON.stringify(err)}`)
    res.send({
      status: 9002,
      msg: JSON.stringify(err)
    })
  })
})
// 移除mock数据
router.get('/remove', (req, res) => {
  User.remove().then(_res => {
    res.send({
      result: _res,
      msg: '删除成功'
    })
  }).catch(err => {
    logger(err)
  })
})
module.exports = router
