const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const passportConfig = require('./src/api/auth/config/passport')

admin.initializeApp()

const authApp = require('./src/api/auth/auth.router')
const teamsApp = require('./src/api/teams/teams.router')
const emailApp = require('./src/api/email/email.router')
const eventsApp = require('./src/api/events/events.router')
const environmentService = require('./src/api/environment/index')

const api = express()
api.use(bp.json())
api.use(bp.urlencoded({ extended: false }))
api.use(cors({ origin: true }))

api.use(passport.initialize())
api.use(passport.session())
passportConfig(passport)
api.use(cors())

api.use('/api/v2/auth', authApp)
api.use('/api/v2/teams', teamsApp)
api.use('/api/v2/email', emailApp)
api.use('/api/v2/events', eventsApp)
api.use('/api/v2/environment', environmentService)

exports.api = functions.https.onRequest(api)
