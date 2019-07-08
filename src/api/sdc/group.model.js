const ACMModel = require('../shared/acm.model')

/**
 * Represents a group that is managed by SDC
 */
class Group extends ACMModel {
  constructor() {
    super()
    this.name = ''
    this.description = ''
    // Every group has team leads. These are the people who will run the group directly
    this.teamLeadIds = []
  }
}

module.exports = Group
