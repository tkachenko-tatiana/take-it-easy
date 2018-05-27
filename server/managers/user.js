import uuid from 'uuid'
import db from '../models'

const { User } = db

export default class UserManager {
  static register (params) {
    const activationToken = uuid() // to check user email
    const userInfo = { ...params, activationToken }

    // TODO send email to user to check their password
    return User.create(userInfo)
  }
}
