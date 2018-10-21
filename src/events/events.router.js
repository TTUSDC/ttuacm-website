const express = require('express')

const Controller = require('./events.controller')

const router = express.Router()

const { membersOnlyRoute } = require('../utils/protected-route')

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
 * - GET
 *
 * @typedef {function} EventsRouter-listEvents
 */
router.get('/', (req, res) => {
  new Controller()
    .listEvents()
    .then((events) => {
      res.status(200).json({ events })
    })
    .catch((err) => {
      if (err) console.log(err)
      res.status(404).json({ events: [], err })
    })
})

/**
 * Gets all attendees for an event
 *
 * - Endpoint `/events/api/v2/attendee?id=userId`
 * - Verb: GET
 *
 * @typedef {function} EventsRouter-getAttendees
 */
router.get('/attendee/:id', (req, res) => {
  new Controller()
    .getAttendees(req.params.id)
    .then((attendees) => {
      res.status(200).json({ err: null, attendees })
    })
    .catch((err) => {
      console.error(err.errors)
      res.status(404).json({})
    })
})

/**
 * Adds an attendee to the event
 *
 * - Endpoint `/events/api/v2/attendee?id=userId`
 * - Verb: PATCH
 *
 * @param {string} req.body.email - user's email
 * @typedef {function} EventsRouter-addAttendee
 */
router.patch('/attendee/:id', membersOnlyRoute, async (req, res) => {
  console.log('Add Route')
  try {
    const eventId = req.params.id
    const controller = new Controller()
    const currentAttendees = await controller.getAttendees(eventId)
    const updatedAttendeeList = await controller.addAttendee(currentAttendees, req.body.email)
    const updatedEvent = await controller.updateAttendee(eventId, updatedAttendeeList)
    res.status(200).json({ err: null, updatedEvent })
  } catch (err) {
    console.error(err)
    res.status(404).json({ err, updatedEvent: null })
  }
})

/**
 * Deletes an attendee for an event
 *
 * - Endpoint `/events/api/v2/attendee?id=userId`
 * - Verb: DELETE
 *
 * @param {string} req.params.id event ID
 * @typedef {function} EventsRouter-removeAttendee
 */
router.delete('/remove-attendee/:id', async (req, res) => {
  try {
    const eventId = req.params.id
    const controller = new Controller()
    const currentAttendees = await controller.getAttendees(eventId)
    const updatedAttendeeList = await controller.removeAttendee(currentAttendees, req.body.email)
    const updatedEvent = await controller.updateAttendee(eventId, updatedAttendeeList)
    res.status(200).json({ err: null, updatedEvent })
  } catch (err) {
    console.error(err)
    res.status(404).json({ err, updatedEvent: null })
  }
})

/**
 * Gets all raw event objects: Mainly used for testing
 *
 * - Endpoint `/events/api/v2/raw/`
 * - Verb: GET
 *
 * @typedef {function} EventsRouter-getRawEvents
 */
router.get('/raw', (req, res) => {
  new Controller()
    .getRawEvents()
    .then((events) => {
      res.status(200).json({ err: null, events })
    })
    .catch((err) => {
      res.status(404).json({ err, events: null })
    })
})

module.exports = router
