const express = require('express')
const router = require('./auth.router')

const app = express()
app.use('/api/v2', router)

module.exports = app
