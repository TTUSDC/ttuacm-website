const jwt = require('jsonwebtoken')
const functions = require('firebase-functions')

const secret = process.env.CI ? 'CISecret' : functions.config().auth.session_secret

/**
 * Generates a JWT
 *
 * @param {object} payload all the data that will be stored into the token
 */
module.exports.generateJWTToken = (payload) => {
  const token = jwt.sign({ data: payload },
    secret, { expiresIn: 604800 }) // 1 week

  return token !== '' ? token : new Error('Empty JWT Payload')
}
