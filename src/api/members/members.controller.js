const MembersModel = require('./members.model')

class MembersController {
  constructor() {
    this.model = new MembersModel()
  }

  /**
   * Creates a new member
   *
   * @param {string} email - email
   * @return {object} - the new member object
   */
  async createMember(email) {
    try {
      const newMember = await this.model.createMember(email)
      return newMember
    } catch (err) {
      throw err
    }
  }

  async getMembers() {
    try {
      const members = await this.model.getMembers()
      return members
    } catch (err) {
      throw err
    }
  }

  /**
   * Formats the group name given to match the semester and year
   *
   * @example
   * `SDC - Algorithms - Fall 2018`
   *
   * @param {string} groupName - the name for the group
   * @param {boolean} exact - whether or not to save the exact name of the group name
   * @return {string} - the formatted string
   */
  static formatGroupName(groupName) {
    let formattedName = groupName

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getYear()

    // May - December is considered Fall, everything else is Spring
    const season = currentMonth > 4 && currentMonth <= 11 ? 'Fall' : 'Spring'

    // Gets the last two digits of the year
    const year = currentYear.toString().slice(1, 3)

    formattedName = `SDC - ${groupName} - ${season} ${year}`

    return formattedName
  }
}

module.exports = MembersController
