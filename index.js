const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')({ origin: true })
const firebase = require('firebase-functions')
const serviceAccount = require('./service_account.json')
// const connectDB = require('./src/utils/db-connect')

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)
adminConfig.credential = admin.credential.cert(serviceAccount)
admin.initializeApp(adminConfig)

const membersApp = require('./src/api/members/members.router')
const eventsApp = require('./src/api/events/events.router')
const environmentService = require('./src/api/environment/index')

if (firebase.config().environment.env !== 'production')
  console.log(`Running in ${firebase.config().environment.env}`)

const api = express()

api.use(cors)
api.use(bp.json())
api.use(bp.urlencoded({ extended: false }))

api.use('/v2/members', membersApp)
api.use('/v2/events', eventsApp)
api.use('/v2/environment', environmentService)

module.exports.app = api
module.exports.api = functions.https.onRequest(api)

// Creates a new user in the database after every login
module.exports.createNewUser = functions.auth.user().onCreate((user) => {
  admin
    .firestore()
    .collection('members')
    .doc(user.email)
    .set({
      hasPaid: false,
      groups: {},
    })
})
