const ACMService = require('../shared/acm.service')

class SdcService extends ACMService {
  /**
   * Creates DB instance with reference to the `sdc` collection
   */
  constructor() {
    super('sdc')
  }

  /**
   * Adds a group to a user's list of subscribed groups (Skips duplicates)
   *
   * @param {string} groupId - groupId to target
   * @param {string} memberId - the memberId to add
   */
  async subscribe(groupId, memberId) {
    try {
      await this.DB.doc(groupId).update({
        activeStudents: this.admin.firestore.FieldValue.arrayUnion(memberId),
      })
      return
    } catch (err) {
      throw err
    }
  }

  /**
   * Removes a group from a user's list of subscibed groups
   *
   * @param {string} groupId - groupId to target
   * @param {string} memberId - the memberId to add
   */
  async unsubscribe(groupId, memberId) {
    try {
      await this.DB.doc(groupId).update({
        activeStudents: this.admin.firestore.FieldValue.arrayRemove(memberId),
      })
      return
    } catch (err) {
      throw err
    }
  }
}

module.exports = SdcService
