const admin = require('firebase-admin')

class MembersModel {
  /**
   * Creates DB instance of the teams collection
   */
  constructor() {
    this.DB = admin.firestore().collection('members')
  }

  /**
   * Finds all members
   */
  async getMembers() {
    try {
      const results = []
      const snapshot = await this.DB.get()
      snapshot.forEach((doc) => {
        const { hasPaidDues, groups } = doc.data()
        results.push({ email: doc.id, hasPaidDues, groups })
      })
      return results
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
      const userRef = await this.DB.doc(email)
      const user = await userRef.get()

      if (!user.exists) return null

      return user.data()
    } catch (err) {
      throw err
    }
  }

  // /**
  //  * Adds a group to a user's list of subscibed groups (Skips duplicates)
  //  *
  //  * @param {string} email - the email to target
  //  * @param {Array<object>} groups - groups to add
  //  */
  // async subscribe(email, groups) {
  //   try {
  //     const newGroups = new Set(groups)
  //     const query = await this.DB.findOne({ email }).exec()
  //     query.groups.addToSet(...newGroups)
  //     await query.save()
  //
  //     return query.toObject()
  //   } catch (err) {
  //     throw err
  //   }
  // }
  //
  // /**
  //  * Removes a group from a user's list of subscibed groups
  //  *
  //  * @param {string} email - the email to target
  //  * @param {Array<object>} groups - groups to remove
  //  */
  // async unsubscribe(email, groups) {
  //   try {
  //     return await this.DB.findOneAndUpdate(
  //       { email },
  //       { $pull: { groups: { $in: groups } } },
  //       { new: true, safe: true, upsert: true },
  //     ).exec()
  //   } catch (err) {
  //     throw err
  //   }
  // }
}

module.exports = MembersModel
