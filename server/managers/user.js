import uuid from 'uuid'
import db from '../models'

import PasswordHelper from '../lib/password'
import TokenHelper from '../lib/token'

const { User } = db

export default class UserManager {
  static register (params) {
    const activationToken = uuid() // to check user email
    const userInfo = { ...params, activationToken }

    // TODO send email to user to check their password
    return User.create(userInfo)
      .then(user => ({ success: true, user }))
      .catch(err => ({ success: false, errors: err }))
  }

  static async signIn (params) {
    const { userName, password } = params
    const user = await User.findOne({ where: { userName }, plain: true })

    if (!user) {
      const errors = [{ path: 'userName', message: 'Wrong userName' }]
      return { success: false, errors }
    }

    if (!user.password) {
      const errors = [{ path: 'password', message: 'Your password is not set. Please check your email and use the provided link to set the new password' }]
      return { success: false, errors }
    }

    const signIn = PasswordHelper.checkPasswordSync(password, user.salt, user.password)

    if (!signIn) {
      const errors = [{ path: 'password', message: 'Wrong password' }]
      return { success: false, errors }
    }

    return {
      success: true,
      user,
      token: TokenHelper.createToken(user),
      refreshToken: TokenHelper.createRefreshToken(user)
    }
  }
}
