const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/user')
const Follow = require('../model/flollow')
const Reply = require('../model/reply')
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
  }
]
router.get('/',(req,res) => {
  const _id = req.query._id
  User.findById(_id).then(data => {
    res.send(data)
  }).catch(err => {
    res.send(err)
  })
})
router.get('/queryUser', (req, res) => {
  const _id = req.query._id
  User.findById(_id).then(_res => res.send(_res)).catch(err => res.send(err))
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
// 随机创建用户
router.post('/random', (req, res) => {
  User.create(req.body).then(data => {
    res.send(data)
  }).catch(err => {
    res.send({
      msg: '创建失败',
      err
    })
  })
})
router.get('/fanList', (req, res) => {
  const user = req.query.user
  Follow.find({
    follow: user
  }).sort({ 'created': -1 })
    .populate('user',  '')
    .then(_res => res.send(_res))
    .catch(err => res.send(err))
})
router.get('/followList', (req, res) => {
  const user = req.query.user
  Follow.find({
    user: user
  }).sort({ 'created': -1 })
    .populate('follow',  '')
    .then(_res => res.send(_res))
    .catch(err => res.send(err))
})
router.post('/follow', (req, res) => {
  const { user, follow } = req.body
  // 'user' wants to follow 'follow'
  Follow.find({
    $and:[
      {
        user: user
      },
      {
        follow: follow
      }
    ]
  }).then(_res => {
    if (_res.length === 0) {
      Follow.create({
        user: user,
        follow: follow
      }).then(() => {
        res.send(true)
      })
    } else {
      Follow.findByIdAndRemove(_res[0]._id).then(() => {
        res.send(false)
      })
    }
  })
})
router.get('/checkFollow', (req, res) => {
  const { user, follow } = req.query
  Follow.find({
    $and: [
      {
        user: user
      },
      {
        follow: follow
      }
    ]
  }).then(_res => {
    if (_res.length !== 0) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})
router.get('/queryLikeCount', (req, res) => {
  const user = req.query._id
  Reply.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user)
      }
    },
    {
      $group: {
        _id: null,
        amount: { $sum: '$like_count' }
      }
    }
    ]).then(data => {
      res.send(data)
  }).catch(err => res.send(err))
})
module.exports = router
