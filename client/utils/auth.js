
import jwt from 'jsonwebtoken'

export const isAuthorisedUser = (token, refreshToken) => {
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

export const getAuthUserInfo = (authInfo) => {
  const { token, refreshToken, identity } = authInfo

  if (isAuthorisedUser(token, refreshToken)) {
    return identity
  }

  return null
}
