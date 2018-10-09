const mongoose = require('mongoose')
const ErrorMessages = require('./auth.errors')

// TODO: Clean up database again to split up the shemas
const studentSchema = mongoose.Schema({
  googleId: { type: String, default: '' },
  facebookId: { type: String, default: '' },
  githubId: { type: String, default: '' },
  email: { type: String, required: true },
  password: { type: String, required: false, default: null },
  confirmEmailToken: { type: String, default: '' },
  resetPasswordToken: { type: String, default: '' },
  resetPasswordExpires: { type: Date, default: null },
  verified: { type: Boolean },
})

function filterUser(user) {
  const filteredUser = user
  // Delete unwanted data here using delete
  return filteredUser
}

class AuthModel {
  constructor() {
    this.DB = mongoose.model('Students', studentSchema)
  }


  /**
   * Updates the user by their email address
   * @param {string} email - user email
   * @param {string} targetAttr - attribute to change
   * @param {string} finalAttr - value of target attribute after changes
   */
  updateUserByEmail(email, targetAttr, finalAttr) {
    return new Promise(async (resolve, reject) => {
      try {
        const foundUser = await this.DB.findOne({ email }).exec()
        foundUser[targetAttr] = finalAttr
        const updatedUser = await foundUser.save().exec()
        resolve(updatedUser)
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.CreateUserError)
      }
    })
  }

  /**
   * Creates a new user
   * @param {object} user - user object
   */
  createNewUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = new this.DB(user)
        newUser.save().then((createdUser) => {
          resolve(createdUser)
        })
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.CreateUserError())
      }
    })
  }

  /**
   * This will find the user by the ID
   * @param {string} id The Mongo Id we are going to find
   */
  getUserById(id) {
    this.DB.findById(id)
      .then((user) => {
        if (user !== null) return filterUser(user)
        throw new Error() // A User was not found
      })
      .catch((err) => {
        console.error(err)
        return ErrorMessages.NotFoundErr()
      })
  }

  /**
   * This will find the user by the email
   * @param {object} query - A query to the database
   */
  getUserByAttribute(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.DB.findOne(query).exec()
        if (user !== null) {
          const filteredUser = filterUser(user)
          resolve(filteredUser)
        }
        resolve()
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.NotFoundErr())
      }
    })
  }

  /**
   * This will find the user by the email
   * @param {string} attribute - the attribute to search
   * @param {string} value - the attribute value to match
   * @param {object} update - the attribute(s) to update
   */
  updateUserByAttribute(query, update) {
    return new Promise((resolve, reject) => {
      try {
        const user = this.DB.findOneAndUpdate(query, update, { new: true }).exec()
        if (user !== null) resolve(filterUser(user))
        resolve()
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.UnknownServerError())
      }
    })
  }

  /**
   * Gives a list of all the users in the database as an object
   */
  findAllUsers() {
    this.DB.find()
      .then((users) => {
        if (users !== null) {
          const data = users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            classification: user.classification,
          }))
          return data
        }
        throw new Error()
      })
      .catch((err) => {
        console.error(err)
        return ErrorMessages.NotFoundErr()
      })
  }

  /**
   * OAuth2 Google Account Merge
   *
   * Checks to see if there is already a user that has the recieved
   * Google ID. If there is a user, we just log them in. If there is
   * not a user with that Google ID, we check for an email that
   * matches the email from the data passed back from Google and try
   * to merge the accounts. If there is no email, a new account
   * is made.
   * @param {Object} profile OAuth2 Profile
   * @param {Object} data Data object that will be passed
   * @param {string} authProvider OAuth2Provider [Google, GitHub, Facebook]
   */
  mergeAccounts(profile, data, authProvider) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = this.DB.findOne({ email: profile.email }).exec()
        let newUser
        if (existingUser !== null) {
          existingUser[authProvider] = profile.id
          newUser = existingUser
        } else {
          newUser = new this.DB(data)
        }
        newUser = await existingUser.save().exec()
        resolve(newUser)
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.MergeAccError())
      }
    })
  }

  deleteUserByEmail(userEmail) {
    this.DB.deleteOne({ email: userEmail })
      .catch((err) => {
        console.error(err)
        return ErrorMessages.NotFoundErr()
      })
  }
}

module.exports = AuthModel
