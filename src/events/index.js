const functions = require('firebase-functions')
const events = require('./events.app');

process.env = functions.config().config

console.log(process.env)

module.exports = events;
