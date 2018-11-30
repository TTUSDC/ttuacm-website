const express = require('express');
const cors = require('cors')
const router = require('./events.router');

const app = express();

// Middleware
app.use(cors())
app.use('/api/v2', router);

module.exports = app;
