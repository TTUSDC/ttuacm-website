const ProfileModel = require('./profile.model')
const ErrorMessages = require('./profile.errors')

class ProfileController {
  constructor() {
    this.DB = new ProfileModel()
  }

  /**
   * Updates the profile
   *
   * - OnSuccess: Resolves with the updated profile
   * - OnFailure: Rejects with a Create User Error
   *
   * @param {object} query mongoose query
   * @param {object} update fields to update
   * @returns {Promise.<string, Error>}
   */
  updateProfile(query, update) {
    return new Promise(async (resolve, reject) => {
      try {
        const userExists = await this.DB.checkForExistingProfile(query)
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
   * Creates a new profile. Will error out if there is a user already there
   *
   * - OnSuccess: Resolves with the new profile
   * - OnFailure: Reject with an error
   *
   * @param {object} profile profile object to save into the database
   * @returns {Promise.<string, Error>}
   */
  createProfile(profile) {
    return new Promise(async (resolve, reject) => {
      try {
        const userExists = await this.DB.checkForExistingProfile({ email: profile.email })
        if (userExists) reject(ErrorMessages.DuplicateAccount())

        const newProfile = await this.DB.createNewProfile(profile)

        resolve(newProfile)
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.CreateProfileError())
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
   * @returns {Promise.<object, Error>}
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
