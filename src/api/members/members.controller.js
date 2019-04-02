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
      const user = await this.model.getMemberByEmail(email)
      if (user) return null
      return await this.model.createMember(email)
    } catch (err) {
      throw err
    }
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

  async subscribe(email, groups) {
    try {
      return await this.model.subscribe(email, groups)
    } catch (err) {
      throw err
    }
  }

  async unsubscribe(email, groups) {
    try {
      return await this.model.unsubscribe(email, groups)
    } catch (err) {
      throw err
    }
  }

  async payDues(email) {
    try {
      return await this.model.payDues(email)
    } catch (err) {
      throw err
    }
  }

  async reset() {
    try {
      return await this.model.resetMembers()
    } catch (err) {
      throw err
    }
  }
}

module.exports = MembersController
