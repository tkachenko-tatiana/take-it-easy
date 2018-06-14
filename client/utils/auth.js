
import jwt from 'jsonwebtoken'

export const isAuthorisedUser = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
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

export const getAuthInfo = () => {
  const token = localStorage.getItem('token')

  try {
    const { user } = jwt.decode(token)
    return user
  } catch (err) {
    // clear local storage
    return null
  }
}
