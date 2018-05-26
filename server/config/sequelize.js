require('@babel/register') // tricky way to get sequelize to work with es6 migratons
const dotenv = require('dotenv')

dotenv.load()

module.exports = {
  development: {
    options: {
      pool: {
        max: 6,
        min: 1,
        idle: 30000,
        evict: 2000,
        acquire: 30000
      },
      sync: {
        logging: false
      }
    },
    define: {
      underscored: true,
      underscoredAll: true
    },
    dialect: 'postgres',
    dialectOptions: {
      appName: process.env.APP_NAME
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  production: {
    options: {
      pool: {
        max: 6, // 6 connection x 2 forks x 2 nodes = 24 connections ~ 25% of 100 total
        min: 1,
        idle: 10000,
        evict: 2000,
        acquire: 30000
      },
      logging: false
    },
    define: {
      underscored: true,
      underscoredAll: true
    },
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  test: {
    options: {
      pool: {
        max: 5,
        min: 0,
        idle: 40000
      },
      logging: false
    },
    define: {
      underscored: true,
      underscoredAll: true
    },
    dialect: 'postgres',
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    database: process.env.TEST_DB_NAME,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD
  }
}
