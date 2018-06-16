import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import authReducer from './signIn'

const rootReducer = combineReducers({
  auth: authReducer
})

const persistConfig = {
  key: 'redux-pesist',
  whitelist: ['auth'],
  storage
}

export default persistReducer(persistConfig, rootReducer)
