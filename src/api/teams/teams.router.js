const express = require('express')
const ErrorMessages = require('./teams.errors')
const { membersOnlyRoute } = require('../../utils/protected-route')

// Controller
const Controller = require('./teams.controller')

const router = express.Router()

/**
 * @api {get} /api/v2/teams/test Test Route
 * @apiDescription
 * Test route to check if the API is properly connected
 *
 * @apiGroup Teams
 * @apiVersion 0.2.0
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
router.get('/test', (req, res) => {
  res.send('Teams App Works!')
})

/**
 * @api {get} /api/v2/teams Get Teams
 * @apiDescription
 * Gets all of the teams that the user is a part of
 *
 * @apiVersion 0.2.0
 *
 * @apiPermission user
 *
 * @apiGroup Teams
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        "name": String,
 *        "members": String[]
 *     ]
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 OK
 *
 * @apiParam (Request body) {String} email email
 */
router.get('/', membersOnlyRoute, async (req, res) => {
  try {
    if (!req.body.email) throw ErrorMessages.MissingRequestBody()
    const teams = await new Controller().getActiveGroups(req.body.email)
    res.status(200).json(teams)
  } catch (err) {
    res.status(500).json({ err })
  }
})

/**
 * @api {put} /api/v2/teams Add to Teams
 * @apiDescription
 * Adds the given email to the SDC Group with their interests
 *
 * @apiVersion 0.2.0
 *
 * @apiPermission user
 *
 * @apiGroup Teams
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 OK
 *
 * @apiParam (Request body) {String} email email
 * @apiParam (Request body) {String[]} teams the teams the user wants to join
 */
router.put('/', membersOnlyRoute, async (req, res) => {
  try {
    if (!req.body.email || !req.body.teams)
      throw ErrorMessages.MissingRequestBody()
    const { email, teams } = req.body

    await new Controller().addMemberOfGroups(teams, email)
    res.status(200).end()
  } catch (err) {
    res.status(500).json({ err })
  }
})

/**
 * @api {delete} /api/v2/teams Delete from Teams
 * @apiDescription
 * Deletes a member from a group
 *
 * @apiVersion 0.2.0
 *
 * @apiPermission user
 *
 * @apiGroup Teams
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 OK
 *
 * @apiParam (Request body) {String} email email
 * @apiParam (Request body) {String[]} teams the teams the user wants to join
 */
router.delete('/', membersOnlyRoute, async (req, res) => {
  try {
    if (!req.body.email || !req.body.teams)
      throw ErrorMessages.MissingRequestBody()
    const { email, teams } = req.body

    await new Controller().deleteMemberOfGroups(teams, email)
    res.status(200).end()
  } catch (err) {
    res.status(500).json({ err })
  }
})

module.exports = router
