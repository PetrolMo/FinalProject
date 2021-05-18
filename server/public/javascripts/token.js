const jwt = require('jsonwebtoken')
const secretKey = "1850956@tongji.edu.cn"

//将用户名和用户ID加入token返回一个promise对象，在then函数中可以读取到这个token
exports.setToken = function (data){
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            name:data.user,
            _id:data._id
        },secretKey,{expiresIn: '1h'})
        resolve(token)
        reject(data)
    })
}

//token验证函数
exports.verifyToken = function (token){
    return new Promise((resolve, reject) => {
        let info = jwt.verify(token.split(' ')[1],secretKey,)
        //通过判断info来判断是否验证成功
        resolve(info)
    })
}
//获取token中的userId
exports.getUserId = function (token){
    return jwt.verify(token.split(' ')[1],secretKey)._id
}