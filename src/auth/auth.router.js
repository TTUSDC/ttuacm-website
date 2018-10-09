const express = require('express')
const passport = require('passport')
const querystring = require('querystring')

const authRouter = express.Router()

const Controller = require('./auth.controller')

authRouter.get('/test', (req, res) => {
  res.send('Auth App Works!')
})

/* GETS the Google Login Screen */
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }),
)

/* Callback URL for Google */
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const qs = Controller.oauth2(req.user)
  res.redirect(`${req.body.redirectURL}/?${qs}`)
})

/* GETS the GitHub Login Screen */
authRouter.get(
  '/github',
  passport.authenticate('github', {
    scope: ['read:user'],
  }),
)

/* Callback URL for GitHub */
authRouter.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  const qs = Controller.oauth2(req.user)
  res.redirect(`${req.body.redirectURL}/?${qs}`)
})

/* GETS the Facebook Login Screen */
authRouter.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
)

/* Callback URL for Facebook */
authRouter.get(
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
 * Registers the user and saved them as a unverified user
 *
 * - endpoint: `/users/register`
 * - Verb: POST
 *
 * OnFailure: Sends an error message
 * OnSuccess: Sends the user back as JSON
 *
 * @typedef {function} UserRouter-register
 *
 */
authRouter.post('/register', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    classification: req.body.classification,
    confirmEmailToken: null,
  }
  try {
    const ctrl = new Controller()
    const createdUser = await ctrl.register(user)
    // TODO: Send Confirmation email
    res.status(201).json({ createdUser })
  } catch (err) {
    res.status(err.code).json({ err })
  }
})

/**
 * JWT Login/Authentication
 * User must not have signed up using OAuth2
 *
 * - endpoint: `/users/login`
 * - Verb: POST
 *
 * OnFailure: Sends an error message
 * OnSuccess: Sends the JWT Token of the user
 *
 * @typedef {function} UserRouter-login
 */
authRouter.post('/login', (req, res) => {
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
 * - endpoint: `users/confirm/:token`
 * - VERB: GET
 *
 * OnFailure: Redirects to error page
 * OnSuccess: Redirects to the login page with querystring to signal a notification
 *
 * @typedef {function} UserRouter-confirmToken
 * @param {querystring} token - HEX token saved in confirmEmailToken
 */
authRouter.get('/confirm/:token', (req, res) => {
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
 * - endpoint: `/users/forgot`
 * - Verb: POST
 *
 * OnFailure: Sends an internal server error message
 * OnSuccess: Sends the user that the email was sent to
 *
 * @typedef {function} UserRouter-forgotLogin
 * @param {string} req.body.email - Email for the account that needs to change passwords
 */
authRouter.post('/forgot', async (req, res) => {
  try {
    const ctrl = new Controller()
    const { email } = req.body
    const payload = await ctrl.forgotLogin(email)
    // TODO: Send a reset email
    res.status(200).json({ recipient: payload.user })
  } catch (err) {
    res.status(err.code).json({ msg: err.message })
  }
})

/**
 * This endpoint is hit by an email to reset a user password
 * This endpoint is hit first in the sequence
 *
 * - endpoint: `/users/reset/:token`
 * - Verb: GET
 *
 * OnFailure: Redirects to the login screen with an error in query string
 * OnSuccess: Redirects to the forgot-redirect page to change password
 *
 * @typedef {function} UserRouter-resetToken
 * @param {string} token - A string that contains the HEX code/Reset token of a lost account
 */
authRouter.get('/reset/:token', (req, res) => {
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
 * - Endpoint: `/users/reset/:token`
 * - Verb: POST
 *
 * OnFailure: Sends a success status code
 * OnSuccess: Sends a error status code
 *
 * @typedef {function} UserRouter-verifyUser
 */
authRouter.post('/reset/:token', async (req, res) => {
  try {
    const ctrl = new Controller()
    const { token } = req.params
    const { password } = req.body

    const user = await ctrl.verifyUser(token, password)
    // TODO: send a changed password email
    res.status(200).json({ user })
  } catch (err) {
    res.status(404).json({ user: null })
  }
})

module.exports = authRouter
