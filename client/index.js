import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/es/integration/react'
// import createSagaMiddleware from 'redux-saga'

import ApolloProvider from 'react-apollo/ApolloProvider'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from './App'
import client from './apollo'
import reducer from './ducks'

import muiTheme from './styles/muiTheme'
import './styles/index.css'

const devTools = process.env.NODE_ENV !== 'production' && window.devToolsExtension
  ? window.devToolsExtension()
  : f => f

const enhancers = compose(
  devTools
)

const store = createStore(
  reducer,
  enhancers
)

const persistor = persistStore(store, {}, () => console.log('Redux state rehydrated'))

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </PersistGate>
    </ApolloProvider>
  </Provider>
  , document.getElementById('root')
)
