const mongoose = require('mongoose');
const ErrorMessages = require('./profile.errors')

const profileSchema = mongoose.Schema({
  profileImage: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  classification: {
    type: String,
    required: true,
    enum: ['Freshman', 'Sophomore', 'Junior', 'Senios', 'Graduate', 'PhD', 'Other'],
    default: 'Other'
  },
  hasPaidDues: {
    type: Boolean,
    default: false
  },
  blocked: {
    type: Boolean,
    default: false
  },
});

class Profile {
  constructor() {
    this.DB = mongoose.model('Profiles', profileSchema)
  }

  /**
   * Updates an existing profile for a given user
   *
   * - OnSuccess: Resolves with the created user
   * - OnFailure: Rejects with a Create User Error
   *
   * @param {object} query a compatible mongoose query
   * @returns {Promise.<Boolean, Error>}
   */
  updateExistingProfile(query, update) {
    return new Promise(async (resolve, reject) => {
      try {
        const profile = await this.DB.findOneAndUpdate(query, update, {new: true }).exec()
        if (profile !== null) resolve(profile)
        resolve()
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.UpdateProfileError())
      }
    })
  }

  /**
   * Creates a new profile for a given user
   *
   * - OnSuccess: Resolves with the created user
   * - OnFailure: Rejects with a Create User Error
   *
   * @param {object} profile a new profile to save
   * @returns {Promise.<Boolean, Error>}
   */
  createNewProfile(profile) {
    return new Promise(async (resolve, reject) => {
      try {
        const newProfile = new this.DB(profile)
        const createdUser = await newProfile.save()
        resolve(createdUser)
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.CreateProfileError())
      }
    })
  }

  /**
   * Searches for a user using a matching query
   *
   * - OnSuccess: Resolves with a true value
   * - OnFailure: Rejects with a Unknown Server Error
   *
   * @param {object} query a compatible mongoose query
   * @returns {Promise.<Boolean, Error>}
   */
  checkForExistingProfile(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.DB.findOne(query).exec()
        resolve(Boolean(user))
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.UnknownServerError())
      }
    })
  }

  /**
   * This will find the user by the some query
   *
   * - OnSuccess: Resolves with a user
   * - OnFailure: Rejects with a Not Found Error
   *
   * @param {object} query a compatible mongoose query
   * @returns {Promise.<object, Error>}
   */
  getProfile(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.DB.findOne(query).exec()
        if (user !== null) resolve(user)
        reject(ErrorMessages.NotFoundErr())
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.NotFoundErr())
      }
    })
  }
}

module.exports = Profile;
