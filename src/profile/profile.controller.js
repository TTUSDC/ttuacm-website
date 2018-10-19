const ProfileModel = require('./profile.model')
const ErrorMessages = require('./profile.errors')

class ProfileController {
  constructor() {
    this.DB = new ProfileModel()
  }

  /**
   * Updates the user
   *
   * - OnSuccess: Resolves with the updated profile
   * - OnFailure: Rejects with a Create User Error
   *
   * @param {object} query mongoose query
   * @param {object} update fields to update
   * @returns {Promise.<string, Error>} Resolves: a new user object and token  Rejects: Error
   */
  updateProfile(query, update) {
    return new Promise(async (resolve, reject) => {
      try {
        const userExists = await this.DB.checkForExistingUser(query)
        if (!userExists) throw ErrorMessages.NotFoundErr()

        const updatedProfile = await this.DB.updateExistingProfile(query, update)

        resolve(updatedProfile)
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.UpdateProfileError())
      }
    })
  }

  /**
   * Fetches the user's profile
   *
   * - OnSuccess: Resolves with the profile
   * - OnFailure: Rejects with a Not Found Error
   *
   * @param {string} email - user's unique email
   * @returns {Promise.<object, Error>} Resolves: a user object  Rejects: Error
   */
  getProfileByEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const profile = this.DB.getProfile({ email })
        resolve(profile)
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.NotFoundErr())
      }
    })
  }
}

module.exports = ProfileController
