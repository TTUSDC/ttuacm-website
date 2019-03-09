const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')({ origin: true })

admin.initializeApp()

const membersApp = require('./src/api/members/members.router')
const emailApp = require('./src/api/email/email.router')
const eventsApp = require('./src/api/events/events.router')
const environmentService = require('./src/api/environment/index')

const api = express()
api.use(cors)
api.use(bp.json())
api.use(bp.urlencoded({ extended: false }))

api.use('/v2/members', membersApp)
api.use('/v2/email', emailApp)
api.use('/v2/events', eventsApp)
api.use('/v2/environment', environmentService)

// Not Found
api.use((req, res) => {
  res
    .status(422)
    .json({
      err: 'Cannot find service or requested service is not implemented',
    })
})

module.exports.app = api
module.exports.api = functions.https.onRequest(api)
