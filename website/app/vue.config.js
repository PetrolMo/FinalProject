//设置路径
const path = require("path")
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'index.html',
      filename: 'index.html',
      // favicon: 'public/favicon.ico',
      title: '济岛后台'
    }
  },
  //修改时不进行lint检查
  lintOnSave: false,
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
  },
  // webpack-dev-server 相关配置
  devServer: {
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 8005,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
