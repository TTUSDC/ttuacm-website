const express = require('express')

const router = express.Router()

// Controller
const Controller = require('./email.controller')

/**
 * Testing route for the Email Service
 *
 * - Endpoint: `/api/v2/email/test`
 * - Verb: GET
 *
 * @typedef {function} EmailRouter
 */
router.get('/test', (req, res) => {
  res.send('Email App Works!')
})

/**
 * Sends a question to ACM Email
 *
 * - Endpoint: `/api/v2/email/contact-us`
 * - Verb: POST
 *
 * @typedef {function} EmailRouter-ContactUs
 * @param {object} req.body - Body Parser Body Object
 * @param {string} req.body.name - user name
 * @param {string} req.body.email - user email
 * @param {string} req.body.topic - topic to attach
 * @param {string} req.body.message - message to send
 */
router.post('/contact-us', (req, res) => {
  const ctrl = new Controller(req.protocol, req.headers.host)

  ctrl.contactUs(req.body)
    .then(() => res.status(200).json())
    .catch((err) => {
      console.error(err)
      res.status(500).json()
    })
})

/**
 * Sends a confirmation email to the user with a link/endpoint
 * to verify their email. Users will click the link to verify
 * their emails and should be redirected to the login page
 *
 * This will mainly be used for resending emails
 *
 * - Endpoint: `/api/v2/email/confirm-email`
 * - Verb: POST
 *
 * @typedef {function} EmailRouter-SendConfirmationEmail
 * @param {object} req.body - Body Parser Body Object
 * @param {string} req.body.email - user email
 * @param {string} req.body.token - user reset password token
 */
router.post('/confirm-email', (req, res) => {
  const ctrl = new Controller(req.protocol, req.headers.host)
  const { email, token } = req.body

  ctrl.sendConfirmationEmail(email, token)
    .then(() => res.status(200).json())
    .catch((err) => {
      console.error(err)
      res.status(500).json()
    })
})

/**
 * Sends a reset password email to the user
 * The user should be able to click on the
 * link sent and redirected to the reset
 * password page
 *
 * This will mainly be used for resending emails
 *
 * - Endpoint: `/api/v2/email/reset-password`
 * - Verb: POST
 *
 * @typedef {function} EmailRouter-SendResetEmail
 * @param {object} req.body - Body Parser Body Object
 * @param {string} req.body.email - user email
 * @param {string} req.body.token - user reset password token
 *
 */
router.post('/reset-password', (req, res) => {
  const ctrl = new Controller(req.protocol, req.headers.host)
  const { email, token } = req.body

  ctrl.sendResetEmail(email, token)
    .then(() => res.status(200).json())
    .catch((err) => {
      console.error(err)
      res.status(500).json()
    })
})

module.exports = router
