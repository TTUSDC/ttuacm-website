const express = require('express');
const router = require('./events.router');

const app = express();

console.log(process.env)

// Middleware
app.use('/api/v2', router);

module.exports = app;
