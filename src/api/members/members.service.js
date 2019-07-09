const ACMService = require('../shared/acm.service')

class MemberService extends ACMService {
  /**
   * Creates DB instance with reference to the `members` collection
   */
  constructor() {
    super('members')
  }
}

module.exports = MemberService
