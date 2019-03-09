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

  /**
   * Finds the member with given email
   *
   * @param {string} email - the email to target
   */
  async getMember(email) {
    try {
      const query = await this.DB.find({ email }).exec()
      return query.toObject()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  /**
   * Adds groups to the given email
   *
   * @param {Array<string>} email - the email to target
   * @param {string} groupsToAdd - the groups to add to the user
   * @return {Array<object>} the updated member object
   */
  async addToUsersGroups(email, groupsToAdd) {
    try {
      const doc = await this.DB.find({ email }).exec()
      doc.groups.addToSet(...groupsToAdd)
      doc.save()

      return doc.toObject
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  /**
   * Removes groups from a given email
   *
   * @param {Array<string>} email - the email to target
   * @param {string} groupsToDelete - the groups to delete from the user
   * @return {Array<object>} the updated member object
   */
  async removeFromUsersGroups(email, groupsToDelete) {
    try {
      const doc = await this.DB.find({ email }).exec()
      doc.groups.remove(...groupsToDelete)
      doc.save()

      return doc.toObject()
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  /**
   * Resets the hasPaidDues field of all members in the database
   */
  async resetHasPaidDues() {
    try {
      await this.DB.updateMany({}, { $set: { hasPaidDues: false } })
      return
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  /**
   * Resets the groups field of all members in the database
   */
  async resetGroups() {
    try {
      await this.DB.updateMany({}, { $set: { groups: [] } })
      return
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = MembersModel
