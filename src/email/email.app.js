const express = require('express')
const cors = require('cors')
const router = require('./email.router')

const app = express()

app.use('/api/v2', router)
app.use(cors())

module.exports = app
