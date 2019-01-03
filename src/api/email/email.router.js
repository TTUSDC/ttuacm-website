const express = require('express')

const router = express.Router()

// Controller
const Controller = require('./email.controller')

/**
 * @api {get} /api/v2/email/test Test Route
 * @apiDescription
 * Test route to check if the API is properly connected
 *
 * @apiGroup Email
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
 * @api {post} /api/v2/email/contact-us Contact Us
 * @apiDescription
 * Sends a question to ACM Email
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 OK
 *
 * @apiParam (Request body) {String} name name
 * @apiParam (Request body) {String} email email
 * @apiParam (Request body) {String} topic topic
 * @apiParam (Request body) {String} message message
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
 * @api {post} /api/v2/email/confirm-email Send Confirmation Email
 * @apiDescription
 * Sends a confirmation email to the user with a link/endpoint
 * to verify their email. Users will click the link to verify
 * their emails and should be redirected to the login page.
 * This will mainly be used for resending emails
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 OK
 *
 * @apiParam (Request body) {String} email email
 * @apiParam (Request body) {String} token the user's reset password token
 * @apiParam (Request body) {String} fallback redirect url when failed
 * @apiParam (Request body) {String} redirectURLSuccess redirect url when success
 */
router.post('/confirm-email', async (req, res) => {
  const ctrl = new Controller()
  try {
    const {
      email, token, fallback, redirectURLSuccess,
    } = req.body
    await ctrl.sendConfirmationEmail(email, token, fallback, redirectURLSuccess)
    res.status(200).json()
  } catch (err) {
    console.error(err)
    res.status(500).json()
  }
})

/**
 * @api {post} /api/v2/email/reset-password Send Reset Email
 * @apiDescription
 * Sends a reset password email to the user.
 * The user should be able to click on the
 * link sent and redirected to the reset
 * password page
 *
 * This will mainly be used for resending emails
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 OK
 *
 * @apiParam (Request body) {String} email email
 * @apiParam (Request body) {String} token the user's reset password token
 */
router.post('/reset-password', (req, res) => {
  const ctrl = new Controller()
  const { email, token } = req.body

  ctrl.sendResetEmail(email, token)
    .then(() => res.status(200).json())
    .catch((err) => {
      console.error(err)
      res.status(500).json()
    })
})

module.exports = router
