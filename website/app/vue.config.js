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
  },
  // webpack-dev-server 相关配置
  devServer: {
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 8005,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: '106.13.227.221:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
