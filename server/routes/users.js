const express = require('express')
const router = express.Router()
const User = require('../model/user')
const logger = require('morgan')
router.get('/',(req,res) => {
  res.send("hello")
})
// 获取用户列表
router.get('/userList', (req, res) => {
  const { page = 0, size = 20 } = req.query
  User.countDocuments({}, (error, count) => {
    if (error) {
      logger(`user::/list::error:${JSON.stringify(error)}`)
      res.json({
        status: 9000,
        msg: JSON.stringify(error)
      })
    } else {
      User.find({}).skip((page - 1) * size).limit(parseInt(size) || 20) .sort({ 'created': -1 }).exec((err, doc) => {
        if (err) {
          logger(`user::/list::err:${JSON.stringify(err)}`);
          res.json({
            status: 9000,
            msg: JSON.stringify(err)
          });
        } else {
          res.json({
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
module.exports = router
