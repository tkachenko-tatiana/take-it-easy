import jwt from 'jsonwebtoken'

export const SECRET = 'TakeItEasy27'
export const SECRET_2 = 'GTD_app_36'

export default class TokenHelper {
  static createToken (user) {
    const secret = user.password + SECRET
    return jwt.sign({ user }, secret, { expiresIn: '1h' })
  }

  static createRefreshToken (user) {
    const secret = user.password + SECRET_2
    return jwt.sign({ user }, secret, { expiresIn: '7d' })
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
