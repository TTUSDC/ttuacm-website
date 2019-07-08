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
   * @param {string} memberId - the id to target
   * @param {string} groupId - groups to add
   */
  async subscribe(memberId, groupId) {
    try {
      await this.DB.doc(memberId).update({
        groups: this.admin.firestore.FieldValue.arrayUnion(groupId),
      })
      return
    } catch (err) {
      throw err
    }
  }

  /**
   * Removes a group from a user's list of subscibed groups
   *
   * @param {string} memberId - the id to target
   * @param {string} groupId - group to remove
   */
  async unsubscribe(memberId, groupId) {
    try {
      await this.DB.doc(memberId).update({
        groups: this.admin.firestore.FieldValue.arrayRemove(groupId),
      })
      return
    } catch (err) {
      throw err
    }
  }
}

module.exports = SdcService
