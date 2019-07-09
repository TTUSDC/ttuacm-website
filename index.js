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

const Member = require('./src/api/members/members.model')
const MemberService = require('./src/api/members/members.service')
const MemberController = require('./src/api/members/members.controller')
const SdcController = require('./src/api/sdc/sdc.controller')
const eventsApp = require('./src/api/events/events.router')
const environmentService = require('./src/api/environment/index')

if (firebase.config().environment.env !== 'production')
  console.log(`Running in ${firebase.config().environment.env}`)

const api = express()

api.use(cors)
api.use(bp.json())
api.use(bp.urlencoded({ extended: false }))

api.use('/members', MemberController)
api.use('/sdc', SdcController)
api.use('/events', eventsApp)
api.use('/environment', environmentService)

module.exports.app = api
module.exports.api = functions.https.onRequest(api)

// Creates a new user in the database after every login
module.exports.createNewUser = functions.auth.user().onCreate(async (user) => {
  const svc = new MemberService()
  const newMember = new Member()

  // eslint-disable-next-line prefer-const
  let [firstName, ...lastName] = user.displayName.split(' ')
  lastName = lastName.join(' ')

  newMember.firstName = firstName
  newMember.lastName = lastName

  try {
    await svc.createEntity(user.uid, newMember)
    return 0
  } catch (err) {
    console.error(err)
    return 1
  }
})

// Deletes user in the database if they ever get deleted
module.exports.deleteExistingUser = functions.auth
  .user()
  .onDelete(async (user) => {
    const svc = new MemberService()

    try {
      await svc.deleteEntityById(user.uid)
      return 0
    } catch (err) {
      console.error(err)
      return 1
    }
  })
