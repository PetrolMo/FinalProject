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
  //首先检查数据库中是否已经存在用户
  const user = await User.findOne({
    user:req.body.username
  })
  if(user){
    return res.send({
      message:"用户已存在",
      type:'hasExisted'
    })
  }else{
    User.create({
      user:req.body.username,
      password:req.body.password
    }).then(_res => {
      return res.send({
        message:"注册成功",
        type:'success'
      })
    }).catch(err => {
      return res.status(420).send({
        message:"新增用户失败",
        type:'fail'
      })
    })
  }
})

//登录功能
router.post('/login',async (req,res) => {
  const user = await User.findOne({
    user:req.body.username
  })
  if(!user) {
    return res.status(421).send({
      message:"用户不存在",
      type:'notExit'
    })
  }
  const isPasswordValid = require('bcryptjs').compareSync(
      req.body.password,
      user.password
  )
  if(!isPasswordValid){
    return res.status(422).send({
      message:"密码无效",
      type:'wrongPass'
    })
  }
  const token = Token.setToken(user)
      .then(_res => {
        res.send({
          type:'success',
          token:_res,
          username:user.user
        })
      })
      .catch(err => {
        return res.status(423).send({
          message:'获取token失败'
        })
      })
})

module.exports = router;