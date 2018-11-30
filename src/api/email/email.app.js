const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const router = require('./email.router')

const app = express()

app.use(bp.json())
app.use(cors())

app.use('/api/v2', router)

module.exports = app
