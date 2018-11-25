const express = require('express')

const Controller = require('./events.controller')

const router = express.Router()

/**
 * Testing route for the Events Service
 *
 * - Endpoint: `/events/api/v2/test`
 * - GET
 *
 * @typedef {function} EventsRouter
 */
router.get('/test', (req, res) => {
  res.send('Email App Works!')
})

/**
 * Gets all the events (formatted) in ACM Google Calendar using an OAuth2 Object
 *
 * - Endpoint: `/events/api/v2/`
 * - Verb: GET
 *
 * @typedef {function} EventsRouter-listEvents
 */
router.get('/', async (req, res) => {
  Controller.getAllEvents((err, events) => {
    if (err) {
      res.status(500).json({ err })
    } else {
      res.status(200).json({ events })
    }
  })
})

module.exports = router
