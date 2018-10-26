const express = require('express');
const cors = require('cors')
const router = require('./profile.router');

const app = express();

// Middleware
app.use('/api/v2', router);
app.use(cors())

module.exports = app;
