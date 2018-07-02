// @flow

import jwt from 'jsonwebtoken'
import StoreObserver from 'services/StoreObserver'

class Auth {
  token: string

  constructor () {
    this.token = null
    this.refreshToken = null
    this.identity = null
    StoreObserver.subscribe(this.setAuth)
  }

  getTokens = () => {
    return { token: this.token, refreshToken: this.refreshToken }
  }

  getIdentity = () => {
    return this.identity
  }

  setAuth = ({ auth }) => {
    this.token = auth.token
    this.refreshToken = auth.refreshToken
    this.identity = auth.identity
  }

  isAuthorisedUser = (token, refreshToken) => {
    try {
      jwt.decode(token)
      const { exp } = jwt.decode(refreshToken)

      if (Date.now() / 1000 > exp) {
        return false
      }
    } catch (err) {
      return false
    }

    return true
  }

  getAuthUserInfo = (authInfo) => {
    const { token, refreshToken, identity } = authInfo

    if (this.isAuthorisedUser(token, refreshToken)) {
      return identity
    }

    return null
  }
}

export default new Auth()
