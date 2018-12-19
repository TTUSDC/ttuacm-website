const express = require('express')
const ErrorMessages = require('./teams.errors')
const { membersOnlyRoute } = require('../../utils/protected-route')

// Controller
const Controller = require('./teams.controller')

const router = express.Router()

/**
 * Testing route for the Teams Service
 *
 * - Endpoint: `/api/v2/teams/test`
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
 * - Endpoint: `/api/v2/teams`
 * - Verb: GET
 *
 * @typedef {function} TeamsRouter-GetTeams
 * @param {object} req.body - Body Parser Body Object
 * @param {string} req.body.email - user email
 */
router.get('/', membersOnlyRoute, async (req, res) => {
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
 * - Endpoint: `/api/v2/teams`
 * - Verb: PUT
 *
 * @requires Authentication - JWT
 * @typedef {function} TeamsRouter-AddMembers
 * @param {object} req.body - Body Parser Body Object
 * @param {string} req.body.email - user email
 * @param {Array<string>} req.body.teams - user teams
 */
router.put('/', membersOnlyRoute, async (req, res) => {
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
 * - Endpoint: `/api/v2/teams`
 * - Verb: DELETE
 *
 * @requires Authentication - JWT
 * @typedef {function} TeamsRouter-DeleteUserFromTeams
 * @param {object} req.body - Body Parser Body Object
 * @param {string} req.body.email - user email
 * @param {Array<string>} req.body.teams - user teams
 */
router.delete('/', membersOnlyRoute, async (req, res) => {
  try {
    if (!req.body.email || !req.body.teams) throw ErrorMessages.MissingRequestBody()
    const { email, teams } = req.body

    await (new Controller()).deleteMemberOfGroups(teams, email)
    res.status(200).end();
  } catch (err) {
    res.status(err.code).json({ err });
  }
})

module.exports = router;
