const express = require('express')
const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })

const PROTECTED_ENDPOINTS = [
  'https://acm-texas-tech-web-app-2-beta.firebaseapp.com/',
  'https://acm-texas-tech-web-app-2.firebaseapp.com'
]

const app = express()
app.use(cors)

/**
 * A Protected route to serve environment variables
 *
 * When the route is called in a production/staging environment,
 * we have to check whether or not the host is either the
 * production or staging host. Otherwise, send over the environment
 */
app.get('/get-environment', (req, res) => {
  const { environment } = functions.config()
  if (['prod', 'staging'].includes(environment.env)) {
    if (PROTECTED_ENDPOINTS.includes(req.headers.origin)) {
      res.json(environment)
    } else {
      console.error(`${req.headers.origin} does not match https://acm-texas-tech-web-app-2.firebaseapp.com`)
      res.status(401).end()
    }
  } else {
    res.json(environment)
  }
})

module.exports = app
