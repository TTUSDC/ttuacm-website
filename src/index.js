const functions = require('firebase-functions');

const admin = require('firebase-admin')
admin.initializeApp()

if (admin.app().options_.projectId === 'acm-development-firebase') {
  process.env.NODE_ENV = 'dev'
} else {
  process.env.NODE_ENV = 'prod'
}

// Here is a list of all the functions by themselves

const profileApp = require('./profile')
const authApp = require('./auth')
const contactsApp = require('./contacts')
const emailApp = require('./email')
const eventsApp = require('./events')

exports.profile = functions.https.onRequest(profileApp)
exports.auth = functions.https.onRequest(authApp)
exports.email = functions.https.onRequest(emailApp)
exports.events = functions.https.onRequest(eventsApp)
exports.contacts = functions.https.onRequest(contactsApp)

