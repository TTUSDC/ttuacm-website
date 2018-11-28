const express = require('express');
const cors = require('cors')
const router = require('./teams.router');

const app = express();
app.use(cors())
app.use('/api/v2', router);

module.exports = app;
