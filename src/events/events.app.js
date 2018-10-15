const functions = require('firebase-functions')
const express = require('express');
const router = require('./events.router');

const app = express();
const { environment, events } = functions.config()
process.env = events
process.env.NODE_ENV = environment.env || 'dev'

// Middleware
app.use('/api/v2', router);

module.exports = app;
