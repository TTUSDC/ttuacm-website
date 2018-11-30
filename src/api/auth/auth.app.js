const functions = require('firebase-functions')
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const passportConfig = require('./config/passport')
const router = require('./auth.router')
const connectDB = require('../../utils/db-connect')

const database = functions.config().auth.db

connectDB(database) // Open connection to the database

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use(cors({ origin: true }))

app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)
app.use(cors())

app.use('/api/v2', router)

module.exports = app
