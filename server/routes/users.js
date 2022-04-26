const express = require('express')
const router = express.Router()
const User = require('../model/user')
const logger = require('morgan')
const moment = require('moment')
const mockUser = [
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0
  },
  {
    username: moment(new Date()).format('ss'),
    password: new Date().getTime(),
    gender: 0,
    phone: '18019057975',
    campus: 0
  }
]
router.get('/',(req,res) => {
  res.send("hello")
})
// 获取用户列表
router.get('/userList', (req, res) => {
  const { page = 1, size = 20 } = req.query
  User.countDocuments({}, (error, count) => {
    if (error) {
      logger(`user::/list::error:${JSON.stringify(error)}`)
      res.json({
        status: 9000,
        msg: JSON.stringify(error)
      })
    } else {
      User.find({}).skip((page - 1) * size).limit(size || 20) .sort({ 'created': -1 }).exec((err, doc) => {
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
module.exports = router
