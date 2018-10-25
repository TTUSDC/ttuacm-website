const express = require('express')
const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })

const app = express()
app.use(cors)

app.get('/:password', (req, res) => {
  const { password } = req.params
  const { secret, environment } = functions.config()
  if (password === secret.password) {
    res.json(environment)
  } else {
    res.status(401).end()
  }
})

module.exports = app
