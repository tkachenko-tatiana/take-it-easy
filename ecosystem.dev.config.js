module.exports = {
  apps: [
    {
      name: 'api',
      script: 'server/server-dev.js',
      interpreter_args: '--inspect=9229',
      env: {
        NODE_ENV: 'development',
        DEBUG: 'takeItEasy:*',
        APP_NAME: 'takeItEasy:api'
      },
      watch: './server',
      ignore_watch: ['node_modules', './public']
    }
  ]
}
