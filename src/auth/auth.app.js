const functions = require('firebase-functions')
const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const router = require('./auth.router')
const { connectDB } = require('../utils/db-connect')

// Env Variables from the Configs
const { environment, auth } = functions.config()
process.env = auth
process.env.NODE_ENV = environment.env

const database = process.env.db

connectDB(database) // Open connection to the database

const app = express()
app.use('/api/v2', router)

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use(cors({ origin: true }))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

module.exports = app
