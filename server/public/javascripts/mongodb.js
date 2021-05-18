//导入mongoose库
const mongoose=require('mongoose')

//进行数据库的连接(第一个参数最后的字段是数据库名)
// module.exports = function mongodbConn(){
//     mongoose.connect('mongodb://localhost/mydb',
//         { useNewUrlParser: true,useUnifiedTopology: true }  )
//         .then(res => res)
//         .catch(err => err);
//
//     //connect() 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告。
//     const db = mongoose.connection;   //connection是数据库的连接对象
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//         console.log('数据库连接成功！')
//     });
// }

module.exports = function () {
  mongoose.connect('mongodb://localhost/softwaretest',
    {useNewUrlParser: true, useUnifiedTopology: true},)

// 连接成功操作
  mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
  });

// 连接失败操作
  mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
  });

// 连接断开操作
  mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
  })
}