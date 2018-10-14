const functions = require('firebase-functions')
const express = require('express');
const router = require('./profile.router');

const app = express();

const { environment, profile } = functions.config()
process.env = profile
process.env.NODE_ENV = environment.env

// Middleware
app.use('/api/v2', router);

module.exports = app;
