const express = require('express');
const router = express.Router();
const mongo = require('../public/javascripts/mongodb')
const User = require('../model/user')
const Token = require('../public/javascripts/token')
const fs = require('fs')
const multiparty = require('multiparty');
// const AipImageProcessClient = require("baidu-aip-sdk").imageProcess;
// // 设置APPID/AK/SK
// var APP_ID = "24398202";
// var API_KEY = "kLRkzD0YdrKNxlL6czXahpn2";
// var SECRET_KEY = "XoalF89uvFzp8x633uoX2w3bveOIZQph";

// 新建一个对象，建议只保存一个对象调用服务接口
// var client = new AipImageProcessClient(APP_ID, API_KEY, SECRET_KEY);
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

//上传图片
// router.post('/upload',async (req,res) => {
//   let form = new multiparty.Form();
//   // 设置编码
//   form.encoding = 'utf-8';
//   // 设置文件存储路径，以当前编辑的文件为相对路径
//   form.uploadDir = './public/images';
//   form.parse(req, function(err,fields,files){
//     let buffer
//     try {
//       let inputFile = files.files[0];
//       let newPath = form.uploadDir + "/" + inputFile.originalFilename;
//       let type = inputFile.originalFilename.split('.')[1]
//       console.log(type)
//       //let imgUrl = 'https://myzys.cn1.utools.club/images/'+inputFile.originalFilename
//       // 同步重命名文件名 fs.renameSync(oldPath, newPath)
//       //oldPath  不得作更改，使用默认上传路径就好
//       console.log(inputFile)
//       fs.renameSync(inputFile.path, newPath);
//       let image = fs.readFileSync(newPath).toString("base64");
// // 调用黑白图像上色
//       client.colourize(image).then(function(result) {
//         //console.log(JSON.stringify(result));
//         let imageBase64 =  'data:image/' +type+';base64,'+result.image
//         res.send({ data: "上传成功！",image:JSON.stringify(imageBase64) });
//       })
//
//     } catch (err) {
//       console.log(err);
//       res.send({ err: "上传失败！" });
//     };
//   })
//   //过滤data:URL
// })
// router.post('/upload64',(req,res) => {
//   console.log(req.body)
//   client.colourize(JSON.parse(req.body))
//     .then(function(result) {
//     //console.log(JSON.stringify(result));
//     let imageBase64 =  'data:image/' +type+';base64,'+result.image
//     res.send({ data: "上传成功！",image:JSON.stringify(imageBase64) });
//   })
//     .catch(err => {
//       res.send({data:'上传失败',err})
//     })
// })

module.exports = router;