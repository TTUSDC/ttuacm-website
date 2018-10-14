const ProfileModel = require('./profile.model')
const { generateJWTToken } = require('../utils/generate-jwt')

class ProfileController {
  constructor() {
    this.DB = new ProfileModel()
  }

  /**
   * Updates the complete user object
   *
   * TODO: Have this depend on the Auth service
   * TODO: Abstract the mongoosejs calls with better higher level methods
   *
   * @param {object} newUser new user object
   * @returns {Promise.<object, Error>} Resolves: a new user object and token  Rejects: Error
   */
  updateUser(newUser) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.DB.findByIdAndUpdate(newUser._id, newUser, { new: true }).exec()
        if (!user) reject(new Error('Profile Not Found'))
        const token = await generateJWTToken(user)
        const response = { user, token }
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Fetches the user's profile
   *
   * @param {string} email - user's unique email
   * @returns {Promise.<object, Error>} Resolves: a user object  Rejects: Error
   */
  getProfile(email) {
    return new Promise((resolve, reject) => {
      this.DB.findOne({ email })
        .then((user) => {
          if (!user) reject(new Error('Email Not Found'))
          resolve(user)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = ProfileController
