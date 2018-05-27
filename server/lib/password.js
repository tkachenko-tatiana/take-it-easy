import crypto from 'crypto'
import _debug from 'debug'

const debug = _debug('takeItEasy:lib:password')

export const HASH_KEYLEN = 32
export const HASH_DIGEST = 'sha256'
export const HASH_ITERATIONS = 100000

export default class PasswordHelper {
  static getHashSync (password) {
    const salt = crypto.randomFillSync(Buffer.alloc(HASH_KEYLEN)).toString('hex')
    const hash = password && crypto.pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString('hex')
    debug({salt, hash})
    return { salt, hash }
  }

  static checkPasswordSync (password, salt, hash) {
    return hash === crypto.pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString('hex')
  }
}
