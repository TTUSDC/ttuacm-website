const express = require('express')
const router = require('./events.router')

const app = express()

// Middleware
app.use('/api/v2', router)

module.exports = app
