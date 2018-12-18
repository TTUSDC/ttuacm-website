const express = require('express')
const querystring = require('querystring')

const router = express.Router()

const AuthController = require('./auth.controller')
const EmailController = require('../email/email.controller')

/**
 * This router handles all of the authentication services
 * whether it be through OAuth or local sign up. This service
 * provides a way for the other services to create their OAuth2
 * instances
 *
 * - Endpoint: `/api/v2/test`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter
 */
router.get('/test', (req, res) => {
  res.send('Auth App Works!')
})

/**
 * Registers the user and saves them as a unverified user
 * It then sends an email to that user to verify
 *
 * - Endpoint: `/api/v2/auth/register`
 * - Verb: POST
 *
 * - OnFailure: Sends an error message
 * - OnSuccess: Sends the user back as JSON
 *
 * @typedef {function} AuthRouter-Register
 */
router.post('/register', async (req, res) => {
  const authCtrl = new AuthController()
  const emailCtrl = new EmailController(req.protocol, req.headers.host)

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    classification: req.body.classification,
    confirmEmailToken: null,
  }

  try {
    // Register the user
    const createdUser = await authCtrl.register(user)

    // Sending the email token
    await emailCtrl.sendConfirmationEmail(createdUser.email, createdUser.confirmEmailToken)

    res.status(201).json({ createdUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: err.message })
  }
})

/**
 * JWT Login/Authentication
 * User must not have signed up using OAuth2
 *
 * - Endpoint: `/api/v2/auth/login`
 * - Verb: POST
 *
 * - OnFailure: Sends an error message
 * - OnSuccess: Sends the JWT Token of the user
 *
 * @typedef {function} AuthRouter-Login
 */
router.post('/login', async (req, res) => {
  const ctrl = new AuthController()
  const { email } = req.body
  const inputPassword = req.body.password

  try {
    const { foundUser, token } = await ctrl.login(email, inputPassword)
    res.status(200).json({ token: `JWT ${token}`, user: foundUser })
  } catch (err) {
    console.error(err)
    res.status(err.code).json({ err })
  }
})

/**
 * Confirms the user has a valid email account
 *
 * - Endpoint: `/api/v2/auth/confirm/:token`
 * - Verb: GET
 *
 * - OnFailure: Redirects to error page
 * - OnSuccess: Redirects to the login page with querystring to signal a notification
 *
 * @typedef {function} AuthRouter-ConfirmToken
 * @param {querystring} token - HEX token saved in confirmEmailToken
 */
router.get('/confirm/:token', (req, res) => {
  const ctrl = new AuthController()
  const { token } = req.params
  const { redirectURL } = req.body
  ctrl.confirmToken(token)
    .then(() => {
      const qs = querystring.stringify({ verify: 'success' })
      res.redirect(302, `${redirectURL}/auth/?${qs}`)
    })
    .catch(() => {
      const qs = querystring.stringify({ err: 'Error Validating Email' })
      res.redirect(302, `${redirectURL}/?${qs}`)
    })
})

/**
 * Verifies that the user is resetting the password of an account they own
 *
 * - Endpoint: `/api/v2/auth/forgot`
 * - Verb: POST
 *
 * - OnFailure: Sends an internal server error message
 * - OnSuccess: Sends the user that the email was sent to
 *
 * @typedef {function} AuthRouter-ForgotLogin
 * @param {string} req.body.email - Email for the account that needs to change passwords
 */
router.post('/forgot', async (req, res) => {
  try {
    const authCtrl = new AuthController()
    const emailCtrl = new EmailController(req.protocol, req.headers.host)

    const { user } = await authCtrl.forgotLogin(req.body.email)
    await emailCtrl.sendResetEmail(user.email, user.resetPasswordToken)

    res.status(200).json({ recipient: user })
  } catch (err) {
    res.status(err.code).json({ msg: err.message })
  }
})

/**
 * This endpoint is hit by an email to reset a user password
 * This endpoint is hit first in the sequence
 *
 * - Endpoint: `/api/v2/auth/reset/:token`
 * - Verb: GET
 *
 * - OnFailure: Redirects to the login screen with an error in query string
 * - OnSuccess: Redirects to the forgot-redirect page to change password
 *
 * @typedef {function} AuthRouter-ResetToken
 * @param {string} token - A string that contains the HEX code/Reset token of a lost account
 */
router.get('/reset/:token', async (req, res) => {
  const ctrl = new AuthController()
  const { token } = req.params
  const { redirectURLSuccess, fallback } = req.body
  try {
    const passToken = ctrl.resetToken(token)
    const qs = querystring.stringify({ token: passToken })
    res.redirect(`${redirectURLSuccess}/?${qs}`)
  } catch (err) {
    const qs = querystring.stringify({ err })
    res.redirect(`${fallback}/?${qs}`)
  }
})

/**
 * Client hits this endpoint with a token and a new password to update the account with
 *
 * - Endpoint: `/api/v2/auth/reset/:token`
 * - Verb: POST
 *
 * - OnFailure: Sends a success status code
 * - OnSuccess: Sends a error status code
 *
 * @typedef {function} AuthRouter-VerifyUser
 */
router.post('/reset/:token', async (req, res) => {
  try {
    const authCtrl = new AuthController()
    const emailCtrl = new EmailController(req.headers.host, req.protocol)
    const { token } = req.params
    const { password } = req.body

    const user = await authCtrl.verifyUser(token, password)

    await emailCtrl.sendChangedPasswordEmail(user.email)

    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ user: null })
  }
})

module.exports = router
