const express = require('express')

const router = express.Router()

// Controller
const Controller = require('./email.controller')

/**
 * Testing route for the Email Service
 *
 * - Endpoint: `/email/api/v2`
 * - Verb: GET
 *
 * @typedef {function} EmailRouter
 */
router.get('/test', (req, res) => {
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
  const ctrl = new Controller(req.protocol, req.headers.host)
  const { name, email, topic, message } = req.body
  const emailInfo = { name, email, topic, message }

  ctrl.contactUs(emailInfo)
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
  const ctrl = new Controller(req.protocol, req.headers.host)
  const { token, email } = req.body

  ctrl.sendConfirmationEmail(email, token)
    .then(() => res.status(200).json())
    .catch(err => {
      console.error(err)
      res.status(404).json()
    })
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
router.post('/reset-password', (res, req) => {
  const ctrl = new Controller(req.protocol, req.headers.host)
  const { email, token } = req.body

  ctrl.sendResetEmail(email, token)
    .then(() => res.status(200).json())
    .catch(err => {
      console.error(err)
      res.status(404).json()
    })
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
  const ctrl = new Controller(req.protocol, req.headers.host)
  const { email, token } = req.body

  ctrl.sendConfirmationEmail(email, token)
    .then(() => res.status(200).json())
    .catch(err => {
      console.error(err)
      res.status(404).json()
    })
})

module.exports = router
