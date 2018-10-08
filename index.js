const functions = require('firebase-functions');

const admin = require('firebase-admin')

admin.initializeApp()

process.env = functions.config().config

// Here is a list of all the functions by themselves

const profileApp = require('./src/profile')
const authApp = require('./src/auth')
const contactsApp = require('./src/contacts')
const emailApp = require('./src/email')
const eventsApp = require('./src/events')

exports.profile = functions.https.onRequest(profileApp)
exports.auth = functions.https.onRequest(authApp)
exports.email = functions.https.onRequest(emailApp)
exports.events = functions.https.onRequest(eventsApp)
exports.contacts = functions.https.onRequest(contactsApp)
