/**
 * Generates a JWT
 *
 * @param {object} payload all the data that will be stored into the token
 */
modules.exports.generateJWTToken = (payload) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({ data: payload },
      process.env.session_secret, {
        expiresIn: 604800 // 1 week
      });
    if (token === '') {
      reject(new Error('Empty payload'));
    }
    resolve(token);
  });
}

