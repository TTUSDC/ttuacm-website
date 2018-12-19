const express = require('express')

const Controller = require('./events.controller')

const router = express.Router()

/**
 * Testing route for the Events Service
 *
 * - Endpoint: `/api/v2/events/test`
 * - Verb: GET
 *
 * @typedef {function} EventsRouter
 */
router.get('/test', (req, res) => {
  res.send('Email App Works!')
})

/**
 * Gets all the events (formatted) in ACM Google Calendar using an OAuth2 Object
 *
 * - Endpoint: `/api/v2/events`
 * - Verb: GET
 *
 * @typedef {function} EventsRouter-listEvents
 */
router.get('/', async (req, res) => {
  try {
    const ctrl = new Controller()
    const allEvents = await ctrl.getAllEvents()
    res.status(200).json({ allEvents })
  } catch (err) {
    res.status(500).json({ err })
  }
})

module.exports = router
