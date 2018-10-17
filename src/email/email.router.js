const express = require('express')

const router = express.Router()

// Controller
const controller = require('./email.controller')

/**
 * Testing route for the Events Service
 *
 * - Endpoint: `/email/api/v2`
 * - Verb: GET
 *
 * @typedef {function} EmailRouter
 */
router.get('/', (req, res) => {
  res.send('Email App Works!')
})

/**
 * Sends and question to ACM Email
 *
 * - Endpoint: `/email/api/v2/contact-us`
 * - Verb: POST
 *
 * @typedef {function} EmailRouter-contactUs
 */
router.post('/contact-us', (req, res) => {
  const emailInfo = {
    name: req.body.name,
    email: req.body.email,
    topic: req.body.topic,
    message: req.body.message,
  }
  controller.contactUs(emailInfo)
    .then(() => res.status(200).json())
    .catch(err => {
      console.error(err)
      res.status(404).json()
    })
})

/**
 * Sends a confirmation email to the user with a link/endpoint
 * to verify their email. Users will click the link to verify
 * thier emails and should be redirected to the login page
 *
 * - Endpoint: `/email/api/v2/confirm-email`
 * - Verb: POST
 *
 * @typedef {function} EmailRouter-sendConfirmationEmail
 */
router.post('/confirm-email', (res, req) => {
  console.log(req.body)
  res.send('confirm-email')
})

/**
 * Sends a reset password email to the user
 * The user should be able to click on the
 * link sent and redirected to the reset
 * password page
 *
 * - Endpoint: `/email/api/v2/reset-password`
 * - Verb: POST
 *
 * @typedef {function} EmailRouter-sendResetEmail
 */
router.post('/reset-email', (res, req) => {
  console.log(req.body)
  res.send('reset-email')
})

/**
 * Notifies the user that their password has been changed
 *
 * - Endpoint: `/email/api/v2/change-password-notif`
 * - Verb: POST
 *
 * @typedef {function} EmailRouter-sendChangedPasswordNotification
 */
router.post('/change-password-notif', (res, req) => {
  console.log(req.body)
  res.send('change-password-notif')
})

module.exports = router
