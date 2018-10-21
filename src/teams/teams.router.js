const express = require('express');
const { membersOnlyRoute } = require('../utils/protected-route');

// Controller
// const Controller = require('./teams.controller');

const router = express.Router();

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
 * Gets all of the members in a team
 *
 * - Restricted
 * - Endpoint: `/teams/api/v2/teams`
 * - Verb: GET
 *
 * @typedef {function} TeamsRouter-GetMembersFromTeam
 */
router.get('/teams', async (req, res) => {
  try {
    res.status(200).end();
  } catch (err) {
    res.status(err.code).json({ err });
  }
})

/**
 * Creates a new team
 *
 * - Restricted
 * - Endpoint: `/teams/api/v2/teams`
 * - Verb: POST
 *
 * @requires Authentication - JWT
 * @typedef {function} TeamsRouter-CreateNewTeam
 */
router.post('/teams', membersOnlyRoute, async (req, res) => {
  try {
    res.status(200).end();
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
 * @typedef {function} TeamsRouter-UpdateTeamMembers
 */
router.put('/teams', membersOnlyRoute, async (req, res) => {
  try {
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
 * @typedef {function} TeamsRouter-DeleteUserFromTeam
 */
router.delete('/teams', membersOnlyRoute, async (req, res) => {
  try {
    res.status(200).end();
  } catch (err) {
    res.status(err.code).json({ err });
  }
})

module.exports = router;
