/*
 * @Desc: 描述
 * @Date: 2020-01-09 01:07:32
 * @LastEditTime: 2020-03-24 23:35:47
 */
const path = require('path')
module.exports = {
  // devServer: {
  //   proxy: {
      // '/api/': {
      //   target: 'http://contest.com/', //目标地址
      //   ws: true, //// 是否启用websockets
      //   changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      //   pathRewrite: {
      //     '^/api/': '/api/'
      //   } //这里重写路径
      // },
      // '/admin/': {
      //   target: 'http://contest.com/', //目标地址
      //   ws: true, //// 是否启用websockets
      //   changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      //   pathRewrite: {
      //     '^/admin/': '/admin/'
      //   } //这里重写路径
      // }

  //   }
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/styles/_variables.scss')]
    }
  }
}
