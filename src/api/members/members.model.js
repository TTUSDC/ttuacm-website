const ACMModel = require('../shared/acm.model')

/**
 * Represents a member in ACM
 *
 * You should be querying the member by their ID
 * and use the ID as a foreign key for other services
 *
 * Defaults to a user having not paid their dues
 */
class Member extends ACMModel {
  constructor() {
    super()

    this.firstName = ''
    this.lastName = ''
    this.hasPaidDues = false
  }
}

module.exports = Member
