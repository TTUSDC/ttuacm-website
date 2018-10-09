const jwt = require('jsonwebtoken')
const querystring = require('querystring')
const bcrypt = require('bcryptjs')
const AuthModel = require('./auth.model')
const ErrorMessages = require('./auth.errors')
const { generateHexToken } = require('../utils/generate-hex')
const { generateJWTToken } = require('../utils/generate-jwt')

// Bcrypt options
const saltRounds = 10

class AuthController {
  constructor() {
    this.DB = new AuthModel()
  }

  /**
   * Register a new User
   *
   * @example
   * <caption>
   * firstName: 'Miggy',
   * lastName: 'Reyes',
   * username: 'miggylol',
   * email: 'email@gmail.com',
   * classification: 'Freshman',
   * password: 'password'
   * </caption>
   * @param {Object} user - user object
   * @param {string} user.password - user password
   *
   * @returns {Promise.<Object, Error>} Resolves with a user objectand rejects with an error
   */
  register(user) {
    return new Promise(async (resolve, reject) => {
      // If the email is available, continue with the proccess
      try {
        const query = { email: user.email }
        const foundUser = await this.DB.getUserByAttribute(query)
        if (foundUser !== undefined) reject(ErrorMessages.DuplicateAccount())
        // Generates the salt used for hashing
        bcrypt.hash(user.password, saltRounds, async (err, hash) => {
          const newUser = user
          const token = generateHexToken()

          newUser.password = hash
          newUser.confirmEmailToken = token
          newUser.verified = false

          const createdUser = await this.DB.createNewUser(newUser)
          resolve(createdUser)
        })
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.UnknownServerError())
      }
    })
  }

  /**
   * Checks to see if there is a valid username and password combination
   * that also has verified their email
   *
   * @param {string} email - user email
   * @param {string} password - user password
   *
   * @todo What if the user somehow didn't get the verification email. How do we handle that?
   * @returns {Promise.<token, Error>} Resolves with a JWT and rejects with an error
   */
  login(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const foundUser = await this.DB.getUserByAttribute('email', email)

        if (!foundUser) {
          reject(ErrorMessages.NotFoundErr())
        } else if (!foundUser.verified) {
          reject(ErrorMessages.UserNotVerified())
        } else if (foundUser !== null && foundUser.password !== null) {
          // If the user has a signed up using a local auth strategy
          const validPassword = await bcrypt.compare(password, foundUser.password)
          if (validPassword) {
            const token = generateJWTToken(foundUser)
            resolve({ token, foundUser })
          } else {
            reject(ErrorMessages.InvalidLogin())
          }
        }
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.UnknownServerError())
      }
    })
  }

  /**
   * Starts the process of reseting a lost password for an existing user
   *
   * @param {string} email - user email
   * @returns {Promise.<null, Object>} Resolves: object containg a HEX and a user, Rejects: error
   */
  forgotLogin(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = { email }
        const update = {
          resetPasswordToken: generateHexToken(),
          resetPasswordExpires: Date.now() + 3 * 60 * 60 * 1000, // 3 Hours
        }

        const updatedUser = await this.DB.updateUserByAttribute(query, update)
        if (updatedUser === null) {
          reject(ErrorMessages.NotFoundErr())
        } else {
          resolve({ user: updatedUser })
        }
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.UnknownServerError())
      }
    })
  }

  /**
   * Hits when the user clicks the link that is sent to their email
   *
   * Will check whether or not the token passed in the URL is valid
   * @param {string} token - HEX token associated with an account (resetPasswordToken)
   * @returns {Promise.<token, Error>} Resolves: HEX Token, Rejects: an error
   */
  resetToken(resetPasswordToken) {
    return new Promise((resolve, reject) => {
      if (!resetPasswordToken) reject(ErrorMessages.MissingToken())
      const query = {
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() },
      }
      this.DB.getUserByAttribute(query)
        .then((user) => {
          // User was not found or the token was expired, either way...
          // Signals the front end to tell the user that their token was invalid
          // and that they may need to send another email
          if (!user) reject(ErrorMessages.NotFoundErr())
          // The token is valid and will signal front end to render the login page
          // The token we are passing is the same token that is in the database
          resolve(resetPasswordToken)
        })
        .catch((err) => {
          console.error(err)
          reject(ErrorMessages.InvalidToken())
        })
    })
  }

  /**
   * Verifies the user based on whether or not they pass a valid JWT Token
   * and checks to see if the user actually exists
   *
   * @param {string} token - JWT Token
   * @param {string} passwordAttempt - Attempted password from user
   * @returns {Promise.<object, Error>} - Resolves with user or rejects with
   * an error from bcrypt or finding a document in Mongo
   */
  verifyUser(token, passwordAttempt) {
    return new Promise(async (resolve, reject) => {
      try {
        const hash = await bcrypt.hash(passwordAttempt, saltRounds)
        const query = {
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() },
        }
        const update = {
          // Need to encrypt the password first
          password: hash,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        }
        const updatedUser = await this.DB.updateUserByAttribute(query, update)
        if (!updatedUser) reject(ErrorMessages.NotFoundErr())
        resolve(updatedUser)
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.NotFoundErr())
      }
    })
  }

  /**
   * Endpoint hit when a user clicks on their confirmation link
   *
   * Compares the url token with the token saved in the database.
   * If thre is a match, the user is verified and redirected to log in
   * @param {string} token - HEX Token
   * @returns {Promise.<null, Error>} Rejects: an error
   */
  confirmToken(confirmEmailToken) {
    return new Promise((resolve, reject) => {
      const query = { confirmEmailToken }
      const update = {
        confirmEmailToken: '',
        verified: true,
      }

      this.DB.updateUserByAttribute(query, update)
        .then(user => resolve(user))
        .catch((err) => {
          console.error(err)
          reject(ErrorMessages.NotFoundErr())
        })
    })
  }

  /**
   * Redirects user to homepage after logging in with OAuth2
   *
   * @param {object} user - user object
   * @returns {string} a query string to add to a redirect
   */
  static oauth2(user) {
    const token = jwt.sign({ data: user }, process.env.session_secret, {
      expiresIn: 604800, // 1 week
    })

    const qs = querystring.stringify({
      token: `JWT ${token}`,
    })

    return qs
  }
}

module.exports = AuthController
