import sticky from 'sticky-session'

import {
  sequelize
} from './models'
import config from './config'
import app from './app'

const isDevelopment = process.env.NODE_ENV === 'development'

sequelize.sync({force: false, alter: false})
  .then(() => {
    if (isDevelopment) {
      return app.listen(config.api.port)
    }

    if (!sticky.listen(app, config.api.port)) {
      app.once('listening', () => {
        console.log('Cluster started on 3000 port')
      })
    } else {
      console.log('Started worker')
    }
  })
