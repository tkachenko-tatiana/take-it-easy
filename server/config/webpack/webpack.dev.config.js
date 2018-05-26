const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
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
