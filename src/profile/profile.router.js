const express = require('express')

const { membersOnlyRoute } = require('../utils/protected-route')

const router = express.Router()

// Controller
const Controller = require('./profile.controller')

/**
 * This service handles all of the users public information.
 * Anything having to do with their name, classification or
 * their dues goes through this service
 *
 * @typedef {function} ProfileRouter
 */
router.get('/', (req, res) => {
  res.send(`Profile App Works`)
})

/**
 * Gets the user's profile to fill in a profile page
 * This route requires authentication
 *
 * - Endpoint: `/profile/api/v2/profile`
 * - Verb: GET
 *
 * OnSuccess: Sends a success statuscode with an user Object
 * OnFailure: Sends an error statuscode
 *
 * @typedef {function} ProfileRouter-GetProfileByEmail
 * @param {object} req.body.user A New User object with a ObjectID
 */
router.get('/profile', membersOnlyRoute, async (req, res) => {
  const { email } = req.user

  try {
    const ctrl = new Controller()
    const profile = await ctrl.getProfileByEmail(email)
    res.status(200).json({ profile })
  } catch (err) {
    console.error(err)
    res.status(err.code).json({ err })
  }
})

/**
 * Updates the profile's information completely
 * This route requires authentication
 *
 * - Endpoint: `/profile/api/v2/profile`
 * - Verb: PUT
 *
 * - OnSuccess: Sends a success statuscode with an profile Object
 * - OnFailure: Sends an error statuscode
 *
 * @typedef {function} ProfileRouter-UpdateProfile
 * @param {string} req.body.email profile email
 * @param {object} req.body.update update to use against database
 */
router.put('/profile', membersOnlyRoute, async (req, res) => {
  const { email, update } = req.body

  try {
    const ctrl = new Controller()
    const updatedProfile = await ctrl.updatedProfile({ email }, update)
    res.status(200).json(updatedProfile)
  } catch (err) {
    console.error(err)
    res.status(err.code).json({ err })
  }
})

module.exports = router
