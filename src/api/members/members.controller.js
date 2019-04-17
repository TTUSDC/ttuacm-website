const moment = require('moment')
const MembersModel = require('./members.model')

function formatGroupName(group) {
  // calculate the season
  let season = 'Fall'
  if (moment().dayOfYear() < 213) {
    // August 1
    season = 'Spring'
  }

  const year = moment().year()

  return `${group} - ${season} - ${year}`
}

class MembersController {
  constructor() {
    this.model = new MembersModel()
  }

  async getMemberByEmail(email) {
    try {
      return await this.model.getMemberByEmail(email)
    } catch (err) {
      throw err
    }
  }

  async getMembers() {
    try {
      return await this.model.getMembers()
    } catch (err) {
      throw err
    }
  }

  async subscribe(email, group) {
    try {
      return await this.model.subscribe(email, formatGroupName(group))
    } catch (err) {
      throw err
    }
  }

  async unsubscribe(email, group) {
    try {
      return await this.model.unsubscribe(email, formatGroupName(group))
    } catch (err) {
      throw err
    }
  }
}

module.exports = MembersController
