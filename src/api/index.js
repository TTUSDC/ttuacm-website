const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const authApp = require('./auth')
const teamsApp = require('./teams')
const emailApp = require('./email')
const eventsApp = require('./events')
const environmentService = require('./environment')

exports.auth = functions.https.onRequest(authApp)
exports.email = functions.https.onRequest(emailApp)
exports.events = functions.https.onRequest(eventsApp)
exports.teams = functions.https.onRequest(teamsApp)
exports.environment = functions.https.onRequest(environmentService)
