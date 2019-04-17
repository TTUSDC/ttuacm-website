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

  /**
   * Adds a group to a user's list of subscibed groups (Skips duplicates)
   *
   * @param {string} email - the email to target
   * @param {string} group - groups to add
   */
  async subscribe(email, group) {
    try {
      await this.DB.doc(email).update({
        groups: admin.firestore.FieldValue.arrayUnion(group),
      })
      return
    } catch (err) {
      throw err
    }
  }

  /**
   * Removes a group from a user's list of subscibed groups
   *
   * @param {string} email - the email to target
   * @param {string} group - group to remove
   */
  async unsubscribe(email, group) {
    try {
      await this.DB.doc(email).update({
        groups: admin.firestore.FieldValue.arrayRemove(group),
      })
      return
    } catch (err) {
      throw err
    }
  }
}

module.exports = MembersModel
