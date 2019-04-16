const MembersModel = require('./members.model')

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
  //
  // async subscribe(email, groups) {
  //   try {
  //     return await this.model.subscribe(email, groups)
  //   } catch (err) {
  //     throw err
  //   }
  // }
  //
  // async unsubscribe(email, groups) {
  //   try {
  //     return await this.model.unsubscribe(email, groups)
  //   } catch (err) {
  //     throw err
  //   }
  // }
}

module.exports = MembersController
