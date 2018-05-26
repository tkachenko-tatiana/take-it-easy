import path from 'path'
import http from 'http'

import express from 'express'
// import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import helmetMiddleware from 'helmet'

import ejs from 'ejs'

import routes from './controllers'

import webpackDevConfig from './config/webpack/webpack.config'

import reactInitialStateMiddleware from './lib/middlewares/initialState'

import typeDefs from './schema'
import resolvers from './resolvers'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const GRAPHQL_ENDPOINT = '/graphql'

const app = express()
const server = http.Server(app)

app.use(helmetMiddleware()) // helps you secure your Express apps by setting various HTTP headers

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())

app.use(GRAPHQL_ENDPOINT, bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: GRAPHQL_ENDPOINT }))

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
