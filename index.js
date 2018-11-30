const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const authApp = require('./src/api/auth')
const teamsApp = require('./src/api/teams')
const emailApp = require('./src/api/email')
const eventsApp = require('./src/api/events')
const environmentService = require('./src/api/environment')

exports.auth = functions.https.onRequest(authApp)
exports.email = functions.https.onRequest(emailApp)
exports.events = functions.https.onRequest(eventsApp)
exports.teams = functions.https.onRequest(teamsApp)
exports.environment = functions.https.onRequest(environmentService)
