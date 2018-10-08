const mongoose = require('mongoose')
const ErrorMessages = require('./auth.errors')

// TODO: Clean up database again to split up the shemas
const studentSchema = mongoose.Schema({
  googleId: { type: String, default: '' },
  facebookId: { type: String, default: '' },
  githubId: { type: String, default: '' },
  profileImage: { type: String, default: '' }, // Remove
  resume: { type: String, default: '' }, // Remove
  email: { type: String, required: true },
  password: { type: String, required: false, default: null },
  firstName: { type: String, required: true }, // Remove
  lastName: { type: String, required: false }, // Remove
  classification: { type: String, required: true, default: 'Other' }, // Remove
  confirmEmailToken: { type: String, default: '' },
  resetPasswordToken: { type: String, default: '' },
  resetPasswordExpires: { type: Date, default: null },
  hasPaidDues: { type: Boolean, default: false }, // Remove
  verified: { type: Boolean },
  blocked: { type: Boolean, default: false }, // Remove
})

class UserModel {
  constructor() {
    this.DB = mongoose.model('Students', studentSchema)
  }

  static _filterUser(user) {
    const filteredUser = user
    // Delete unwanted data here using delete
    return filteredUser
  }

  createNewUser(user) {
    const newUser = new this.DB(user)
    newUser.save()
      .then(createdUser => createdUser)
      .catch((err) => {
        console.error(err)
        return ErrorMessages.CreateUserError
      })
  }

  /**
   * This will find the user by the ID
   * @param {string} id The Mongo Id we are going to find
   */
  getUserById(id) {
    this.DB.findById(id)
      .then((user) => {
        if (user !== null) return this._filterUser(user)
        throw new Error() // A User was not found
      })
      .catch((err) => {
        console.error(err)
        return ErrorMessages.NotFoundErr()
      })
  }

  /**
   * This will find the user by the email
   * @param {string} email The email we are going to find
   * @param {done} done (err, user)
   */
  getUserByEmail(email) {
    this.DB.findOne({ email })
      .then((user) => {
        if (user !== null) return this._filterUser(user)
        throw new Error() // A User was not found
      })
      .catch((err) => {
        console.error(err)
        return ErrorMessages.NotFoundErr()
      })
  }

  /**
   * Gives a list of all the users in the database as an object
   * @param {boolean, object} callback (err, user)
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

module.exports = UserModel
