const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const bcrypt = require('bcryptjs');
const AuthModel = require('./auth.model')
const ErrorMessages = require('./auth.errors')
const { generateHexToken } = require('../utils/generate-hex')

// Bcrypt options
const saltRounds = 10;

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
    return new Promise((resolve, reject) => {
      // If the email is available, continue with the proccess
      this.DB.findUserByEmail(user.email)
        .then((foundUser) => {
          if (foundUser !== null) reject(ErrorMessages.DuplicateAccount())
        })
        .catch((err) => {
          console.error(err)
          resolve(ErrorMessages.UnknownServerError())
        })

      // Generates the salt used for hashing
      bcrypt.hash(user.password, saltRounds)
        .then((hash) => {
          const newUser = user
          const token = generateHexToken();

          newUser.password = hash;
          newUser.confirmEmailToken = token;
          newUser.verified = false;

          this.DB.createNewUser(newUser)
        })
        .catch((err) => {
          console.error(err)
          reject(ErrorMessages.HashingErr)
        })
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
    return new Promise((resolve, reject) => {
      User.getUserByEmail(email, (err, foundUser) => {
        // Internal Server Error
        if (err) {
          reject(err);
          // If the user has not been verified
        } else if (!foundUser) {
          reject(new Error('User Not Found'));
        } else if (!foundUser.verified) {
          reject(new Error('User Not Verified'));
          // If the user has a signed up using a local auth strategy
        } else if (foundUser !== null && foundUser.password !== null) {
          bcrypt.compare(password, foundUser.password, async (err, response) => {
            if (err) {
              reject(err);
            } else if (response) {
              const token = await generateJWTToken(foundUser);
              resolve({ token, foundUser });
            } else {
              reject(new Error('Invalid Login'));
            }
          });
        } else {
          // If the was no user found with that user name
          reject(new Error('Internal Server Error'));
        }
      });
    });
  }

  /**
   * Starts the process of reseting a lost password for an existing user
   *
   * @param {string} email - user email
   * @returns {Promise.<null, Object>} Resolves: object containg a HEX and a user, Rejects: error
   */
  forgotLogin(email) {
    return new Promise((resolve, reject) => {
      User.findOne({ email }, (err, user) => {
        if (user === null) {
          reject(new Error('User not found'));
        } else if (err) {
          reject(err);
        } else {
          user.resetPasswordToken = token = generateHexToken();
          user.resetPasswordExpires = Date.now() + 3 * 60 * 60 * 1000; // 3 Hours
          user.save((err) => {
            if (err) reject(err);
            resolve({ token, user });
          });
        }
      });
    });
  }

  /**
   * Hits when the user clicks the link that is sent to their email
   *
   * Will check whether or not the token passed in the URL is valid
   * @param {string} token - HEX token associated with an account (resetPasswordToken)
   * @returns {Promise.<token, Error>} Resolves: HEX Token, Rejects: an error
   */
  resetToken(token) {
    return new Promise((resolve, reject) => {
      if (!token) reject(new Error('No Token Passed to Endpoint'));
      User.findOne(
        {
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() },
        },
        (err, user) => {
          if (err) {
            reject(new Error('Invalid token'));
          } else if (!user) {
            // User was not found or the token was expired, either way...
            // Signals the front end to tell the user that their token was invalid
            // and that they may need to send another email
            reject(new Error('No User found'));
          } else {
            // The token is valid and will signal front end to render the login page
            // The token we are passing is the same token that is in the database
            resolve(token);
          }
        },
      );
    });
  }

  /**
   * Resets the user password
   *
   * TODO: Purify function - remove sendChangedPasswordEmail
   *
   * @param {string} req.params.token - HEX Token passed through the URL
   * @param {string} password - new password that will replace the old one
   *
   * @returns {Promise.<null, Error>} - Rejects with an error
   * from verifyUser or sendChangedPasswordEmail
   */
  resetPassword(token, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await verifyUser(token, password);
        await sendChangedPasswordEmail(user.email);
        resolve(user);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
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
    return new Promise((resolve, reject) => {
      bcrypt.hash(passwordAttempt, saltRounds, (err, hash) => {
        if (err) reject(err);
        User.findOneAndUpdate(
          {
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          {
            // Need to encrypt the password first
            password: hash,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
          },
          { new: true },
          (err, user) => {
            if (err) reject(err);
            if (!user) reject(new Error('No User Found'));
            resolve(user);
          },
        );
      });
    });
  }

  /**
   * Endpoint hit when a user clicks on their confirmation link
   *
   * Compares the url token with the token saved in the database.
   * If thre is a match, the user is verified and redirected to log in
   * @param {string} token - HEX Token
   * @returns {Promise.<null, Error>} Rejects: an error
   */
  confirmToken(token) {
    return new Promise((resolve, reject) => {
      const query = {
        confirmEmailToken: token,
      };
      const update = {
        confirmEmailToken: '',
        verified: true,
      };
      User.findOneAndUpdate(query, update, { new: true }, (err, user) => {
        if (err || user === null) reject(err);
        resolve(user);
      });
    });
  }

  /**
   * Redirects user to homepage after logging in with OAuth2
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * TODO: Move OAuth to client
   */
  oauth2(req, res) {
    const token = jwt.sign({ data: req.user }, process.env.session_secret, {
      expiresIn: 604800, // 1 week
    });

    const qs = querystring.stringify({
      token: `JWT ${token}`,
    });

    // The port should change depending on the environment
    res.redirect(`${process.env.CLIENT || ''}/?${qs}`);
  }
}

module.exports = AuthController;
