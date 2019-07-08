const ACMModel = require('../shared/acm.model')

/**
 * Represents a member in of the SDC Committee
 */
class SdcMember extends ACMModel {
  constructor() {
    super()
    this.groups = []
  }
}

module.exports = SdcMember
