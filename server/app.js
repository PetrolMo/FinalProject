const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const expressJWT = require('express-jwt');
const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const goodRouter = require('./routes/good');
const qiniuRouter = require('./routes/qiniuCloud')
const appTestRouter = require('./routes/apptest')
const testRouter = require('./routes/test')
const app = express();

app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type,Authorization");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static('./public/images'));

//判断用户是否带有token,没有不进行操作，有的话进行验证
// app.use((req,res,next) => {
//   if(req.headers.Authorization === undefined){return next()}
//   else {
//     Token.verifyToken(req.headers.Authorization)
//         .then(res => {
//           return next()
//         })
//         .catch(err => {
//           return next(createError(404))
//         })
//   }
// })
app.use(expressJWT({
  secret: "1850956@tongji.edu.cn",
  algorithms:['HS256']
}).unless({
  path: [
    '/register',
    '/login',
    '/',
    '/images',
    '/public/images',
    'public',
    'test',
    '/sts'
  ] //⽩白名单,除了了这⾥里里写的地址，其他的URL都需要验证
})
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/good',goodRouter);
app.use('/getOss',qiniuRouter);
app.use('/uploadTest',appTestRouter)
app.use('/test',testRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    //  这个需要根据自己的业务逻辑来处理
    //状态401，token失效需要重新登录
    res.status(401).send("token失效，请重新登录！");
  }
})

module.exports = app;
