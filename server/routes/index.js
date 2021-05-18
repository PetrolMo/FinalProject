const express = require('express');
const router = express.Router();
const mongo = require('../public/javascripts/mongodb')
const User = require('../model/user')
const Token = require('../public/javascripts/token')
/* GET home page. */
mongo()
router.get('/', function(req, res, next) {
  User.findOne({
    user:'MoYiZhi'
  }).then(_res => {
    console.log(_res)
    res.json(_res)
  })
});
//注册功能
router.post('/register',async (req,res) =>{
  //首先对用户名和密码进行检测是否合法
  //默认检测成功
  //如果失败返回 res.send(error(404))
  const user = await User.create({
    user:req.body.username,
    password:req.body.password
  })
  res.send(user)
})

//登录功能
router.post('/login',async (req,res) => {
  const user = await User.findOne({

    user:req.body.username
  })
  if(!user) {
    return res.status(422).send({
      message:"用户不存在"
    })
  }
  const isPasswordValid = require('bcryptjs').compareSync(
      req.body.password,
      user.password
  )
  if(!isPasswordValid){
    return res.status(422).send({
      message:"密码无效"
    })
  }
  const token = Token.setToken(user)
      .then(_res => {
        res.send({
          user,
          token:_res
        })
      })
      .catch(err => {
        return res.status(423).send({
          message:'登录失败'
        })
      })
})

module.exports = router;