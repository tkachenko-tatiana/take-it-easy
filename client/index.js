import React from 'react'
import ReactDOM from 'react-dom'

import ApolloProvider from 'react-apollo/ApolloProvider'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from './App'
import client from './apollo'

import muiTheme from './styles/muiTheme'
import './styles/index.css'

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>
  , document.getElementById('root')
)
