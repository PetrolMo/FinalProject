//config.js

const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'rBI7GSONZ5GwaWEf3rYCGUTZfYK1A7j-htP94QwD'    //accessKey
const secretKey = 'IC9cCUbyMcChJ-lnJyeJoWKm5tkIdzeQqOhdVLma'    //secretKey
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: 'myzspace',         //对象存储空间名字
    expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = uploadToken