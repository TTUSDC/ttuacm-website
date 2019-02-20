const TeamModel = require('./teams.model')
const { asyncForEach } = require('../../utils/async-for-each')

class TeamController {
  constructor() {
    this.model = new TeamModel()
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

  /**
   * Will grab all of the user's groups of interest
   *
   * @param {string} email - the email to check
   * @return {Array<string>} - the name of the groups that this user is a part of
   */
  async getActiveGroups(email) {
    try {
      const teams = await this.model.getUserTeams(email)
      return teams
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  /**
   * Adds the member to groups if the are not already a part of them
   * If there is no group with that name, a new one is created
   *
   * @param {Array<string>} groupNames - groups to join
   * @param {string} email - email to add
   * @return {Error} - An error if something happened with adding members to the group
   */
  async addMemberOfGroups(groupNames, email) {
    const fmtGroupNames = groupNames.map((name) =>
      TeamController.formatGroupName(name),
    )
    // Check if they all exist, otherwise, make them
    try {
      await asyncForEach(fmtGroupNames, async (name) => {
        const exists = await this.model.checkIfTeamExists(name)
        if (!exists) await this.model.createNewTeam(name)
      })

      await this.model.addToTeams(fmtGroupNames, email)
    } catch (err) {
      console.error(err)
      throw err // TODO
    }
  }

  /**
   * Adds the member to groups if the are not already a part of them
   * If there is no group with that name, nothing is done
   *
   * @param {Array<string>} groupNames - groups to remove from
   * @param {string} email - email to remove
   * @return {Error} - An error if something happened with adding members to the group
   */
  async deleteMemberOfGroups(groupNames, email) {
    const fmtGroupNames = groupNames.map((name) =>
      TeamController.formatGroupName(name),
    )
    // Check if they all exist, otherwise, make them
    try {
      await asyncForEach(fmtGroupNames, async (name) => {
        const exists = await this.model.checkIfTeamExists(name)
        if (!exists) await this.model.createNewTeam(name)
      })

      await this.model.removeFromTeams(fmtGroupNames, email)
    } catch (err) {
      console.error(err)
      throw err // TODO
    }
  }
}

module.exports = TeamController
