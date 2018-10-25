const express = require('express')
const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })

const app = express()
app.use(cors)

app.get('/', (req, res) => {
  res.json(functions.config().environment)
})

module.exports = app
