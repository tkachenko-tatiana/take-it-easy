import jwt from 'jsonwebtoken'

export const SECRET = 'TakeItEasy27'
export const SECRET_2 = 'GTD_app_36'

export default class TokenHelper {
  static createToken (user) {
    return jwt.sign({ user }, SECRET, { expiresIn: 60 })
  }

  static createRefreshToken (user) {
    return jwt.sign({ user }, SECRET_2, { expiresIn: '7d' })
  }

  static refreshTokens () {

  }

  static verifyToken (token, cb) {
    return jwt.verify(token, SECRET, (err, { user }) => {
      if (err) {
        return cb(err)
      }

      return cb(null, user)
    })
  }
}
