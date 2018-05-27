import PasswordHelper from '../../lib/password'

// password hashing added here because it is necessary validate real password
export const beforeCreate = (instance) => {
  if (instance.password) {
    const { hash, salt } = PasswordHelper.getHashSync(instance.password)
    instance.set('password', hash)
    instance.set('salt', salt)
  }
}
