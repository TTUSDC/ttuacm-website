const express = require('express')
const ErrorMessages = require('./teams.errors')
const { membersOnlyRoute } = require('../utils/protected-route')

// Controller
const Controller = require('./teams.controller')

const router = express.Router()

/**
 * Testing route for the Teams Service
 *
 * - Endpoint: `/teams/api/v2/test`
 * - Verb: GET
 *
 * @typedef {function} TeamsRouter
 */
router.get('/test', (req, res) => {
  res.send('Teams App Works!')
})

/**
 * Gets all of the teams that the user is a part of
 *
 * - Restricted
 * - Endpoint: `/teams/api/v2/teams`
 * - Verb: GET
 *
 * @typedef {function} TeamsRouter-GetTeams
 */
router.get('/teams', membersOnlyRoute, async (req, res) => {
  try {
    if (!req.body.email) throw ErrorMessages.MissingRequestBody()
    const teams = await (new Controller()).getActiveGroups(req.body.email)
    res.status(200).end({ teams });
  } catch (err) {
    res.status(err.code).json({ err });
  }
})

/**
 * Adds the given email to the SDC Group with their interests
 *
 * - Restricted
 * - Endpoint: `/teams/api/v2/teams`
 * - Verb: PUT
 *
 * @requires Authentication - JWT
 * @typedef {function} TeamsRouter-AddMembers
 */
router.put('/teams', membersOnlyRoute, async (req, res) => {
  try {
    if (!req.body.email || !req.body.teams) throw ErrorMessages.MissingRequestBody()
    const { email, teams } = req.body

    await (new Controller()).addMemberOfGroups(teams, email)
    res.status(200).end();
  } catch (err) {
    res.status(err.code).json({ err });
  }
})

/**
 * Deletes a member from a group
 *
 * - Restricted
 * - Endpoint: `/teams/api/v2/teams`
 * - Verb: DELETE
 *
 * @requires Authentication - JWT
 * @typedef {function} TeamsRouter-DeleteUserFromTeams
 */
router.delete('/teams', membersOnlyRoute, async (req, res) => {
  try {
    if (!req.body.email || !req.body.teams) throw ErrorMessages.MissingRequestBody()
    const { email, teams } = req.body

    await (new Controller).deleteMemberOfGroups(teams, email)
    res.status(200).end();
  } catch (err) {
    res.status(err.code).json({ err });
  }
})

module.exports = router;
