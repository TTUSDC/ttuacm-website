const util = require('util')
const express = require('express')
const passport = require('passport')
const querystring = require('querystring')
const OAuthHandler = require('./config/oauth2')
const Request = require('../utils/request')

const router = express.Router()

const Controller = require('./auth.controller')

/**
 * This router handles all of the authentication services
 * whether it be through OAuth or local sign up. This service
 * provides a way for the other services to create their OAuth2
 * instances
 *
 * - Endpoint: `/auth/api/v2/test`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter
 */
router.get('/test', (req, res) => {
  res.send('Auth App Works!')
})

/**
 * Creates a OAuthClient to extract in the other services
 *
 * - Endpoint: `/auth/api/v2/google-api`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter-GoogleAPIs
 * @todo secure this route
 */
router.get('/google-api', async (req, res) => {
  try {
    const OAuth = new OAuthHandler()
    const client = await OAuth.getClient()
    res.status(200).json({ client })
  } catch (err) {
    console.error(err)
    res.status(404).json({ err: err.message })
  }
})

/**
 * Gets the Google Login Screen
 *
 * - Endpoint: `/auth/api/v2/google`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter-GoogleAuth
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }),
)

/**
 * Callback for Google OAuth2
 *
 * - Endpoint: `/auth/api/v2/google/redirect`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter-GoogleAuthRedirect
 */
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const qs = Controller.oauth2(req.user)
  res.redirect(`${req.body.redirectURL}/?${qs}`)
})

/**
 * Gets the GitHub Login Screen
 *
 * - Endpoint: `/auth/api/v2/github`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter-GitHubAuth
 */
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['read:user'],
  }),
)

/**
 * Callback for GitHub OAuth2
 *
 * - Endpoint: `/auth/api/v2/github/redirect`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter-GitHubuthRedirect
 */
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  const qs = Controller.oauth2(req.user)
  res.redirect(`${req.body.redirectURL}/?${qs}`)
})

/**
 * Gets the Facebook Login Screen
 *
 * - Endpoint: `/auth/api/v2/facebook`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter-FacebookAuth
 */
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
)

/**
 * Callback for Facebook OAuth2
 *
 * - Endpoint: `/auth/api/v2/facebook/redirect`
 * - Verb: GET
 *
 * @typedef {function} AuthRouter-GitHubuthRedirect
 */
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    const qs = Controller.oauth2(req.user)
    res.redirect(`${req.body.redirectURL}/?${qs}`)
  },
)

/**
 * Registers the user and saves them as a unverified user
 * It then sends an email to that user to verify
 *
 * - Endpoint: `/auth/api/v2/register`
 * - Verb: POST
 *
 * - OnFailure: Sends an error message
 * - OnSuccess: Sends the user back as JSON
 *
 * @typedef {function} AuthRouter-Register
 */
router.post('/register', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    confirmEmailToken: null,
  }

  try {
    const ctrl = new Controller()
    const request = new Request('v2', 'email')
    const createdUser = await ctrl.register(user)
    await request.get().path('/confirm-email').end()
    res.status(201).json({ createdUser })
  } catch (err) {
    res.status(err.code).json({ err })
  }
})

/**
 * JWT Login/Authentication
 * User must not have signed up using OAuth2
 *
 * - Endpoint: `/auth/api/v2/login`
 * - Verb: POST
 *
 * - OnFailure: Sends an error message
 * - OnSuccess: Sends the JWT Token of the user
 *
 * @typedef {function} AuthRouter-Login
 */
router.post('/login', (req, res) => {
  const ctrl = new Controller()
  const { email } = req.body
  const inputPassword = req.body.password
  ctrl.login(email, inputPassword)
    .then((response) => {
      const { token } = response
      const user = response.foundUser
      res.status(200).json({ token: `JWT ${token}`, user })
    })
    .catch((err) => {
      res.status(err.code).json({ err })
    })
})

/**
 * Confirms the user has a valid email account
 *
 * - Endpoint: `/auth/api/v2/confirm/:token`
 * - Verb: GET
 *
 * - OnFailure: Redirects to error page
 * - OnSuccess: Redirects to the login page with querystring to signal a notification
 *
 * @typedef {function} AuthRouter-ConfirmToken
 * @param {querystring} token - HEX token saved in confirmEmailToken
 */
router.get('/confirm/:token', (req, res) => {
  const ctrl = new Controller()
  const { token } = req.params
  const { redirectURL } = req.body
  ctrl.confirmToken(token)
    .then(() => {
      const qs = querystring.stringify({ verify: 'success' })
      res.redirect(`${redirectURL}/auth/?${qs}`)
    })
    .catch(() => {
      const qs = querystring.stringify({ err: 'Error Validating Email' })
      res.redirect(`${redirectURL}/?${qs}`)
    })
})

/**
 * Verifies that the user is resetting the password of an account they own
 *
 * - Endpoint: `/auth/api/v2/forgot`
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
    const ctrl = new Controller()
    const request = new Request('v2', 'email')
    const { email } = req.body
    const payload = await ctrl.forgotLogin(email)
    await request.get().path('/reset-password').end()
    res.status(200).json({ recipient: payload.user })
  } catch (err) {
    res.status(err.code).json({ msg: err.message })
  }
})

/**
 * This endpoint is hit by an email to reset a user password
 * This endpoint is hit first in the sequence
 *
 * - Endpoint: `/auth/api/v2/reset/:token`
 * - Verb: GET
 *
 * - OnFailure: Redirects to the login screen with an error in query string
 * - OnSuccess: Redirects to the forgot-redirect page to change password
 *
 * @typedef {function} AuthRouter-ResetToken
 * @param {string} token - A string that contains the HEX code/Reset token of a lost account
 */
router.get('/reset/:token', (req, res) => {
  const ctrl = new Controller()
  const { token } = req.params
  const { redirectURL } = req.body
  ctrl.resetToken(token)
    .then((passToken) => {
      const qs = querystring.stringify({ token: passToken })
      res.redirect(`${redirectURL}/auth/forgot/redirect/?${qs}`)
    })
    .catch((err) => {
      const qs = querystring.stringify({ err })
      res.redirect(`${redirectURL}/auth/?${qs}`)
    })
})

/**
 * Client hits this endpoint with a token and a new password to update the account with
 *
 * - Endpoint: `/auth/api/v2/reset/:token`
 * - Verb: POST
 *
 * - OnFailure: Sends a success status code
 * - OnSuccess: Sends a error status code
 *
 * @typedef {function} AuthRouter-VerifyUser
 */
router.post('/reset/:token', async (req, res) => {
  try {
    const ctrl = new Controller()
    const request = new Request('v2', 'email')
    const { token } = req.params
    const { password } = req.body

    const user = await ctrl.verifyUser(token, password)
    await request.get().path('/change-password-notif').end()
    res.status(200).json({ user })
  } catch (err) {
    res.status(404).json({ user: null })
  }
})

module.exports = router
