const mongoose = require('mongoose')

const membersSchema = mongoose.Schema({
  // Email of the User
  email: { type: String, required: true, unique: true },
  // Whether or not the user has paid dues
  hasPaidDues: { type: Boolean, default: false },
  // Groups that the user is a member of
  groups: { type: [Array], default: [] },
})

class MembersModel {
  /**
   * Creates DB instance of the teams collection
   */
  constructor() {
    this.DB = mongoose.model('members', membersSchema)
  }

  async createMember(email) {
    try {
      const newMember = new this.DB({ email })
      await newMember.save()

      return newMember.toObject()
    } catch (err) {
      throw err
    }
  }

  /**
   * Finds all members
   */
  async getMembers() {
    try {
      return await this.DB.find({}).exec()
    } catch (err) {
      throw err
    }
  }

  /**
   * Finds the member with given email
   *
   * @param {string} email - the email to target
   */
  async getMemberByEmail(email) {
    try {
      return await this.DB.findOne({ email }).exec()
    } catch (err) {
      throw err
    }
  }

  /**
   * Adds a group to a user's list of subscibed groups (Skips duplicates)
   *
   * @param {string} email - the email to target
   * @param {Array<object>} groups - groups to add
   */
  async subscribe(email, groups) {
    try {
      const newGroups = new Set(groups)
      const query = await this.DB.findOne({ email }).exec()
      query.groups.addToSet(...newGroups)
      await query.save()

      return query.toObject()
    } catch (err) {
      throw err
    }
  }

  /**
   * Removes a group from a user's list of subscibed groups
   *
   * @param {string} email - the email to target
   * @param {Array<object>} groups - groups to remove
   */
  async unsubscribe(email, groups) {
    try {
      const delGroups = new Set(groups)
      const query = await this.DB.findOne({ email }).exec()
      const newGroups = []

      for (const curr of query.groups.toObject()) {
        if (!delGroups.has(curr[0])) {
          newGroups.push(curr[0])
        }
      }

      return await this.DB.findOneAndUpdate(
        { email },
        { groups: newGroups },
        { new: true },
      ).exec()
    } catch (err) {
      throw err
    }
  }

  /**
   * Pays a users dues
   *
   * @param {Array<string>} email - the email to target
   */
  async payDues(email) {
    try {
      return await this.DB.findOneAndUpdate(
        { email },
        { $set: { hasPaidDues: true } },
        { new: true, lean: true },
      ).exec()
    } catch (err) {
      throw err
    }
  }

  /**
   * Resets the hasPaidDues and groups field of all members in the database
   */
  async resetMembers() {
    try {
      return await this.DB.updateMany(
        {},
        { $set: { hasPaidDues: false, groups: [] } },
      )
    } catch (err) {
      throw err
    }
  }
}

module.exports = MembersModel
