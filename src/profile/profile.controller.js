class ProfileController {
  constructor() { }

  /**
   * Updates the complete user object
   *
   * TODO: Have this depend on the Auth service
   *
   * @param {object} newUser new user object
   * @returns {Promise.<object, Error>} Resolves: a new user object and token  Rejects: Error
   */
  updateUser(newUser) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await Profile.findByIdAndUpdate(newUser._id, newUser, { new: true }).exec()
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
      Profile.findOne({ email })
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
