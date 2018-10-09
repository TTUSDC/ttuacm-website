const functions = require('firebase-functions')
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const router = require('./auth.router')
const { connectDB } = require('../utils/db-connect')

connectDB() // Open connection to the database

process.env = functions.config().config

const app = express()
app.use('/api/v2', router)

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use(cors({ origin: true }))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

module.exports = app
