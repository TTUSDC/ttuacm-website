const functions = require('firebase-functions')
const express = require('express')
const router = require('./email.router')

const app = express()

const { environment, email } = functions.config()
process.env = email
process.env.NODE_ENV = environment.env

app.use('/api/v2', router)

module.exports = app
