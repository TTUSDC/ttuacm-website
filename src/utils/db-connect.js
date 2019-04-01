const mongoose = require('mongoose')
const functions = require('firebase-functions')

/**
 * Connects the API to it's MongoDB database
 *
 * @param {string} connection the url of the mongodb instance
 */
function connectDB(req, res, next) {
  mongoose.connect(functions.config().connections.db, {
    useNewUrlParser: true,
  })

  mongoose.connection.on('connected', () => {
    next()
  })

  mongoose.connection.on('error', (err) => {
    console.error(`Error Connecting to database... \n${err}`)
    console.error(`Tried connecting to ${process.env.db}`)
    process.exit(1)
  })
}

module.exports = connectDB
