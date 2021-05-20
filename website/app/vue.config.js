//设置路径
const path = require("path")
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports = {
  //修改时不进行lint检查
  lintOnSave:false,
  publicPath: '/',
  //webpack一些配置
  configureWebpack:{
    resolve:{
      //匹配拓展名
      extensions:['.js','.vue','.json','.css'],
      //起别名
      alias:{
        "@":resolve("src"),
        "views":resolve("src/views"),
        "assets":resolve("src/assets"),
        "components":resolve("src/components"),
        "utils":resolve("src/utils"),
      }
    }
  }
}