module.exports = {
    devServer: {
      proxy: {
        '/ajax': {
          target: 'https://m.maoyan.com',
          changeOrigin: true
        },
        '/location': {
          target: 'http://api.map.baidu.com',
          changeOrigin: true
        }
      }
    }
  }