const express = require('express')

const Controller = require('./events.controller')

const router = express.Router()

/**
 * @api {get} /api/v2/events/test Test Route
 * @apiDescription
 * Test route to check if the API is properly connected
 *
 * @apiGroup Events
 * @apiVersion 0.2.0
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
router.get('/test', (req, res) => {
  res.send('Email App Works!')
})

/**
 * @api {get} /api/v2/events Get Events
 * @apiDescription
 * Gets all the events (formatted) in ACM Google Calendar using an OAuth2 Object
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Events
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "allEvents": {
 *           "day": `Tuesday`,
 *           "startTime": `2018-12-24T16:10:22.200Z`,
 *           "endTime": `2018-12-24T16:10:22.200Z`,
 *           "title": `Workshop`,
 *           "location": `Texas Tech`,
 *           "description": `A Really Awesome Workshop`,
 *           "recurringEvent": false,
 *        }
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "err": Error
 *   }
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
