const jwt = require('jsonwebtoken')

/**
 * Generates a JWT
 *
 * @param {object} payload all the data that will be stored into the token
 */
module.exports.generateJWTToken = (payload) => {
  const token = jwt.sign({ data: payload },
    process.env.session_secret, {
      expiresIn: 604800, // 1 week
    });

  return token !== '' ? token : new Error('Empty JWT Payload')
}
