const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './index.js'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // Enable HMR
  ]
}
