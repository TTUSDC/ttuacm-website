const mongoose = require('mongoose')
const functions = require('firebase-functions')
const ErrorMessages = require('./auth.errors')

const studentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  // TODO: REMOVE. Deprecated
  classification: {
    type: String,
    required: true,
    enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'PhD', 'Other'],
    default: 'Other',
  },
  graduationDate: {
    type: Date,
    default: new Date('January 1, 1970 00:00:00'),
  },
  hasPaidDues: {
    type: Boolean,
    default: false,
  },
  // TODO: REMOVE. Deprecated
  blocked: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    default: '',
  },
  facebookId: {
    type: String,
    default: '',
  },
  githubId: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: false,
  },
  confirmEmailToken: {
    type: String,
    default: '',
  },
  resetPasswordToken: {
    type: String,
    default: '',
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  verified: {
    type: Boolean,
  },
}, { autoCreate: true })

// Filter Private Data from api calls
function filterUser(user) {
  const filteredUser = user
  // Delete unwanted data here using delete
  return filteredUser
}

const CONNECTION_STRING = functions.config().connections.db
/**
 * Model that manages the students collection
 */
class AuthModel {
  /**
   * Creates a DB instance of the students collection
   */
  constructor() {
    this.DB = mongoose.model('Students', studentSchema)
    this.connected = false
  }

  /**
   * Connects to the Database
   */
  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true,
      }, (err) => {
        if (err) reject(err)
        this.connected = true
        resolve()
      })
    })
  }

  /**
   * Deletes all of the students in a database
   */
  async deleteAllUsers() {
    await this.DB.remove({})
    return null
  }

  /**
   * Updates the user by their email address
   * @param {string} email - user email
   * @param {string} targetAttr - attribute to change
   * @param {string} finalAttr - value of target attribute after changes
   */
  async updateUserByEmail(email, targetAttr, finalAttr) {
    if (!this.connected) throw ErrorMessages.NotConnectedToMongo()
    try {
      const foundUser = await this.DB.findOne({ email }).exec()
      foundUser[targetAttr] = finalAttr
      const updatedUser = await foundUser.save().exec()
      return updatedUser
    } catch (err) {
      console.error(err)
      throw ErrorMessages.CreateUserError
    }
  }

  /**
   * Creates a new user
   * @param {object} user - user object
   */
  async createNewUser(user) {
    if (!this.connected) throw ErrorMessages.NotConnectedToMongo()
    try {
      const newUser = new this.DB(user)
      const createdUser = await newUser.save()
      return createdUser
    } catch (err) {
      console.error(err)
      throw ErrorMessages.CreateUserError()
    }
  }

  /**
   * This will find the user by the ID
   * @param {string} id The Mongo Id we are going to find
   */
  async getUserById(id) {
    if (!this.connected) throw ErrorMessages.NotConnectedToMongo()
    try {
      const user = await this.DB.findById(id).exec()
      if (user !== null) return filterUser(user)
      throw new Error() // A User was not found
    } catch (err) {
      console.error(err)
      throw ErrorMessages.NotFoundErr()
    }
  }

  /**
   * This will find the user by the email
   * @param {object} query - A query to the database
   */
  async getUserByAttribute(query) {
    if (!this.connected) throw ErrorMessages.NotConnectedToMongo()
    try {
      const user = await this.DB.findOne(query).exec()
      let filteredUser
      if (user !== null) {
        filteredUser = filterUser(user)
      }
      return filteredUser
    } catch (err) {
      console.error(err)
      throw ErrorMessages.NotFoundErr()
    }
  }

  /**
   * This will find the user by the email
   * @param {string} attribute - the attribute to search
   * @param {string} value - the attribute value to match
   * @param {object} update - the attribute(s) to update
   */
  async updateUserByAttribute(query, update) {
    if (!this.connected) throw ErrorMessages.NotConnectedToMongo()
    try {
      const user = this.DB.findOneAndUpdate(query, update, { new: true }).exec()
      let filteredUser
      if (user !== null) {
        filteredUser = filterUser(user)
      }
      return filteredUser
    } catch (err) {
      console.error(err)
      throw ErrorMessages.UnknownServerError()
    }
  }

  /**
   * Deletes a user from the database
   * @param {string} userEmail - the account's email to delete
   */
  async deleteUserByEmail(userEmail) {
    if (!this.connected) throw ErrorMessages.NotConnectedToMongo()
    try {
      await this.DB.deleteOne({ email: userEmail }).exec()
      return null
    } catch (err) {
      console.error(err)
      return ErrorMessages.NotFoundErr()
    }
  }

  /**
   * Gives a list of all the users in the database as an object
   */
  async findAllUsers() {
    if (!this.connected) throw ErrorMessages.NotConnectedToMongo()
    try {
      const users = await this.DB.find()
      if (users !== null) {
        const data = users.map(user => ({
          firstName: user.firstName,
          lastName: user.lastName,
          classification: user.classification,
        }))
        return data
      }
      throw new Error('Did not find user in database')
    } catch (err) {
      console.error(err)
      return ErrorMessages.NotFoundErr()
    }
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
  async mergeAccounts(profile, data, authProvider) {
    if (!this.connected) throw ErrorMessages.NotConnectedToMongo()
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
      return newUser
    } catch (err) {
      console.error(err)
      throw ErrorMessages.MergeAccError()
    }
  }
}

module.exports = AuthModel
module.exports.studentSchema = studentSchema
