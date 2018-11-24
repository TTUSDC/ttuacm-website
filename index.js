const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// Here is a list of all the functions by themselves

const authApp = require('./src/auth')
const teamsApp = require('./src/teams')
const emailApp = require('./src/email')
const eventsApp = require('./src/events')
const environmentService = require('./src/environment')

exports.auth = functions.https.onRequest(authApp)
exports.email = functions.https.onRequest(emailApp)
exports.events = functions.https.onRequest(eventsApp)
exports.teams = functions.https.onRequest(teamsApp)
exports.environment = functions.https.onRequest(environmentService)
