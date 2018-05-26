module.exports = {
  apps: [
    {
      name: 'api',
      script: 'server/server-dev.js',
      interpreter_args: '--inspect=9229',
      env: {
        NODE_ENV: 'development',
        DEBUG: 'myapp:*',
        APP_NAME: 'myapp:api'
      },
      watch: './server',
      ignore_watch: ['node_modules', './public']
    }
  ]
}
