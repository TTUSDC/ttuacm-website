const chai = require('chai')
const mongoose = require('mongoose')
const Controller = require('./teams.controller')
const Model = require('./teams.model')

const { expect } = chai

describe('Teams Unit Tests' , () => {
  let ctrl
  let model
  // eslint-disable-next-line
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost:27017/testing', {
      useNewUrlParser: true,
    }, (err) => {
      done(err)
    })
  })

  beforeEach(() => {
    ctrl = new Controller()
    model = new Model()
  })

  afterEach((done) => {
    // Make sure to at least create one user for each test
    // or this will error out
    mongoose.connection.dropCollection('teams', done)
  })

  it('Should be able to add an email to all the teams without duplicates', async () => {
    const email1 = 'email1'
    const email2 = 'email2'
    const teams = [
      'team1',
      'team2',
      'team1',
      'team3',
    ]

    try {
      await ctrl.addMemberOfGroups(teams, email1)
      await ctrl.addMemberOfGroups(teams, email1)
      await ctrl.addMemberOfGroups(teams, email2)

      const allTeams = await model.getAllTeams()

      expect(allTeams.length).to.equal(3)

      expect(allTeams[0].members[0][0]).to.equal('email1')
      expect(allTeams[0].members[1][0]).to.equal('email2')
      expect(allTeams[0].members.length).to.equal(2)
    } catch (err) {
      expect(err.message).not.to.exist
    }
  })
})
