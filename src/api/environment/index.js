const express = require('express')
const functions = require('firebase-functions')
const cors = require('cors')

const PROTECTED_ENDPOINTS = [
  'https://acm-texas-tech-web-app-2-beta.firebaseapp.com',
  'https://acm-texas-tech-web-app-2.firebaseapp.com',
]

const router = express.Router()
router.use(cors({ origin: true }))

/**
 * @api {get} /api/v2/environment/test Test Route
 * @apiDescription
 * Test route to check if the API is properly connected
 *
 * @apiGroup Environment
 * @apiVersion 0.2.0
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
router.get('/test', (req, res) => {
  res.send('Environment Provider Works!')
})

/**
 * @api {get} /api/v2/environment Get Environment Variables
 * @apiDescription
 * A Protected route to serve environment variables
 *
 * When the route is called in a production/staging environment,
 * we have to check whether or not the host is either the
 * production or staging host. Otherwise, send over the environment
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Environment
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "auth_provider_x509_cert_url": String,
 *        "auth_uri": String,
 *        "client_x509_cert_url": String,
 *        "private_key": String,
 *        "maintainance": String,
 *        "private_key_id": String,
 *        "project_id": String,
 *        "client_id": String,
 *        "env": String,
 *        "token_uri": String,
 *        "client_email": String,
 *        "type": String
 *        "session_secret": String,
 *        "protocol": String,
 *        "host": String,
 *        "firebase": {
 *          "api_key": String,
 *          "auth_domain": String,
 *          "database_url": String,
 *          "project_id": String,
 *          "storage_bucket": String,
 *          "message_sender_id": String,
 *        }
 *     }
 *
 * @typedef {function} EnvironmentProvider
 */
router.get('/', (req, res) => {
  const { environment, auth, connections } = functions.config()
  if (['prod', 'staging'].includes(environment.env)) {
    if (PROTECTED_ENDPOINTS.includes(req.headers.origin)) {
      environment.session_secret = auth.session_secret
      environment.protocol = connections.protocol
      environment.host = connections.host
      res.json(environment)
    } else {
      console.error(
        `${
          req.headers.origin
        } does not match https://acm-texas-tech-web-app-2.firebaseapp.com`,
      )
      res.status(401).end()
    }
  } else {
    res.json(environment)
  }
})

module.exports = router
