const express = require('express');

const router = express.Router();

// Controller
const controller = require('./email.controller');

router.get('/test', (req, res) => {
  res.send('Email App Works!');
});

/**
 * Sends and question to ACM Email
 *
 * - Endpoint: `/users/contact-us`
 * - Verb: POST
 *
 * @typedef {function} UserRouter-contactUs
 */
router.post('/contact-us', (req, res) => {
  const emailInfo = {
    name: req.body.name,
    email: req.body.email,
    topic: req.body.topic,
    message: req.body.message,
  };
  controller.contactUs(emailInfo)
    .then(() => res.status(200).json())
    .catch(err => {
      console.error(err)
      res.status(404).json()
    });
});

router.post('/confirm-email', (res, req) => {
  console.log(req.body)
  res.send('confirm-email');
});

router.post('/reset-email', (res, req) => {
  console.log(req.body)
  res.send('reset-email');
});

router.post('/change-password', (res, req) => {
  console.log(req.body)
  res.send('change-password');
});

module.exports = router;
