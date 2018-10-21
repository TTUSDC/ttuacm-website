const functions = require('firebase-functions')
const express = require('express');
const cors = require('cors')
const router = require('./profile.router');

const app = express();

const { environment, profile } = functions.config()
process.env = profile
process.env.NODE_ENV = environment.env || 'dev'

// Middleware
app.use('/api/v2', router);
app.use(cors())

module.exports = app;
