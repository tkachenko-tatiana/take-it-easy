import path from 'path'
import fs from 'fs'
import http from 'http'

import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import helmetMiddleware from 'helmet'

import ejs from 'ejs'

import routes from './controllers'

import webpackDevConfig from './config/webpack/webpack.config'

import reactInitialStateMiddleware from './lib/middlewares/initialState'

const app = express()
const server = http.Server(app)

app.use(helmetMiddleware())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

let webpackDevMiddlewareInstance

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.resolve(__dirname, '..', 'public')))
  const compiler = webpack(webpackDevConfig('dev'))

  webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    publicPath: '/assets/'
  })

  app.use(webpackDevMiddlewareInstance)

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))

  app.use('/', routes)
  app.use('*', [reactInitialStateMiddleware()], function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.ejs')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(ejs.render(result.toString(), {
        initialState: req.initialState,
        env: process.env.NODE_ENV
      }, {
        delimiter: '$'
      }))
      res.end()
    })
  })
} else { // production mode

}

// app.use(errorHandlerMiddleware)

export {
  webpackDevMiddlewareInstance
}
export default server
