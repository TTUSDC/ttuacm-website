const chai = require('chai')
const mongoose = require('mongoose')
const Controller = require('./teams.controller')
const Model = require('./teams.model')
const { asyncForEach } = require('../utils/async-for-each')

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

  it('[addMemberOfGroups] should be able to add an email to all the teams without duplicates', async () => {
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
      expect(err).not.to.exist
    }
  })

  it('[deleteMemberOfGroups] should be able to remove an email from all the teams', async () => {
    const email1 = 'email1'
    const email2 = 'email2'
    const teams = [
      'team1',
      'team2',
      'team3',
    ]

    const fmtTeams = teams.map(name => Controller.formatGroupName(name))

    let allTeams
    try {
      await asyncForEach(fmtTeams, async (team) => {
        await model.createNewTeam(team)
      })
      await model.addToTeams(fmtTeams, email1)
      await model.addToTeams(fmtTeams, email2)

      await ctrl.deleteMemberOfGroups(teams, email1)
      await ctrl.deleteMemberOfGroups(teams, email2)
      await ctrl.deleteMemberOfGroups(['team4', 'team'], email2)

      allTeams = await model.getAllTeams()
    } catch (err) {
      expect(err).not.to.exist
    }

    expect(allTeams[1].members.length).to.equal(0)
    expect(allTeams[0].members.length).to.equal(0)
  })

  it('[getActiveGroups] should be able get all teams that a email is a part of', async () => {
    const email = 'email'
    const teams = [
      'team1',
      'team2',
      'team3',
    ]

    const fmtTeams = teams.map(name => Controller.formatGroupName(name))

    let foundTeams

    try {
      await asyncForEach(fmtTeams, async (team) => {
        await model.createNewTeam(team)
      })
      await model.addToTeams(fmtTeams, email)

      foundTeams = await ctrl.getActiveGroups(email)
    } catch (err) {
      expect(err.message).not.to.exist
    }

    expect(foundTeams.length).to.equal(3)
    expect(fmtTeams.includes(foundTeams[0].name)).to.equal(true)
    expect(fmtTeams.includes(foundTeams[1].name)).to.equal(true)
    expect(fmtTeams.includes(foundTeams[2].name)).to.equal(true)
  })
})
