const crypto = require('crypto')

/**
 * Generates a HexToken, usually for quick random tokens; does not require string
 *
 * @returns {string} JWT Token
 */
const generateHexToken = () => {
  const token = crypto.randomBytes(20);
  return token.toString('hex');
}

module.exports = generateHexToken
