const crypto = require('crypto')

// Generates a HexToken, usually for quick random tokens; does not require string
module.exports.generateHexToken = () => {
  const token = crypto.randomBytes(20);
  return token.toString('hex');
}
