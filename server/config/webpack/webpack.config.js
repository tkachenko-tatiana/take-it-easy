const merge = require('webpack-merge')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const babelPlugins = [
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import'
]

module.exports = env => {
  const envConfig = require(`./webpack.${env || 'dev'}.config.js`)

  const reactHotLoaderPlugin = 'react-hot-loader/babel'

  const base = {
    context: path.resolve(__dirname, '..', '..', '..', 'client'),

    output: {
      filename: '[name]-[hash:8].js',
      path: path.resolve(__dirname, '..', '..', '..', 'dist', 'public', 'assets'),
      publicPath: '/assets/'
    },

    resolve: {
      extensions: ['.jsx', '.json', '.js'],
      modules: [path.resolve(__dirname, '..', '..', '..', 'client'), 'node_modules']
    },

    module: {
      rules: [
        { test: /\.json$/, use: ['json-loader'] },
        { test: /\.(png|svg|jpg|gif|ico)$/, use: ['file-loader'] },
        {
          test: /\.css$/,
          use: [{
            loader: 'style-loader',
            options: {
              insertInto: '#custom-styles'
            }
          }, {
            loader: 'css-loader',
            options: { minimize: true }
          }]
        }, {
          test: /\.scss$/,
          use: [{
            loader: 'style-loader',
            options: {
              insertInto: '#custom-styles'
            }
          }, {
            // translates CSS into CommonJS modules
            loader: 'css-loader',
            options: { minimize: true, importLoaders: 1, modules: true, localIdentName: '[name]_[local]_[hash:base64:5]' }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }]
        }, {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              plugins: env === 'dev' ? [...babelPlugins, reactHotLoaderPlugin] : [...babelPlugins],
              presets: [
                ['@babel/env', {
                  modules: false,
                  targets: {
                    browsers: env === 'test' ? ['chrome >= 62'] : [
                      'safari >= 10',
                      'firefox >= 57',
                      'chrome >= 62',
                      'edge >= 15'
                    ]
                  }
                }], '@babel/react', '@babel/flow']
            }
          },
          exclude: /node_modules/
        }, {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.ejs.ejs',
        filename: 'index.ejs'
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }

  return merge.smart(base, envConfig)
}
