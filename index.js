const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')({ origin: true })
const firebase = require('firebase-functions')
const serviceAccount = require('./service_account.json')

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
api.post('/v2/users', async (req, res) => {
  if (!req.body.email) res.status(500).end()
  else {
    const doc = await admin
      .firestore()
      .collection('members')
      .doc(req.body.email)
      .get()

    if (!doc.exists)
      admin
        .firestore()
        .collection('members')
        .doc(req.body.email)
        .set({
          hasPaidDues: false,
          groups: [],
          permissions: {
            admin: 0,
            officer: 0,
            member: 1,
          },
        })
    res.status(201).end()
  }
})

module.exports.app = api
module.exports.api = functions.https.onRequest(api)

module.exports.createNewUser = functions.auth.user().onCreate((user) => {
  admin
    .firestore()
    .collection('members')
    .doc(user.email)
    .set({
      hasPaidDues: false,
      groups: [],
      permissions: {
        admin: 0,
        officer: 0,
        member: 1,
      },
    })
  return 1
})

// Creates a new user in the database after every login
module.exports.createNewUser = functions.auth.user().onCreate((user) => {
  admin
    .firestore()
    .collection('members')
    .doc(user.email)
    .set({
      hasPaidDues: false,
      groups: [],
      permissions: {
        admin: 0,
        officer: 0,
        member: 1,
      },
    })
  return 1
})

// Deletes user in the database if they ever get deleted
module.exports.deleteExistingUser = functions.auth.user().onDelete((user) => {
  admin
    .firestore()
    .collection('members')
    .doc(user.email)
    .delete()

  return 1
})
