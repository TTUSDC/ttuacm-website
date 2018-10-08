const express = require('express');
const passport = require('passport');
const querystring = require('querystring');

const { membersOnlyRoute } = require('../utils/protected-route');

const router = express.Router();

// Controller
const controller = require('./profile.controller');

router.get('/test', (req, res) => {
  res.send('Profile App Works');
});

/**
 * Gets the user's profile to fill in a profile page
 * This route requires authentication
 *
 * - endpoint: `/users/profile`
 * - Verb: GET
 *
 * OnFailure: Sends an error statuscode
 * OnSuccess: Sends a success statuscode with an user Object
 *
 * @typedef {function} UserRouter-getProfile
 */
router.get('/profile', membersOnlyRoute, (req, res) => {
  controller.getProfile(req.user.email)
    .then((user) => {
      res.status(200).json({ user, err: null });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ user: null, err });
    });
});

/**
 * Updates the user's resume
 * This route requires authentication
 *
 * - endpoint: `/users/update-resume`
 * - Verb: PUT
 *
 * OnFailure: Sends an error statuscode
 * OnSuccess: Sends a success statuscode with an user Object
 * @deprecated - Use `/users/update-user`
 * @typedef {function} UserRouter-updateResume
 */
router.put('/update-resume', membersOnlyRoute, (req, res) => {
  controller.updateResume(req.user._id, req.body.path)
    .then((user) => {
      res.status(200).json({ user, err: null });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ user: null, err });
    });
});

/**
 * Updates the user's information completely
 * This route requires authentication
 *
 * - endpoint: `/users/update-user`
 * - Verb: PUT
 *
 * OnFailure: Sends an error statuscode
 * OnSuccess: Sends a success statuscode with an user Object
 *
 * @typedef {function} UserRouter-updateUser
 * @param {object} req.body.user A New User object with a ObjectID
 */
router.put('/update-user', membersOnlyRoute, (req, res) => {
  controller.updateUser(req.body.user)
    .then((payload) => {
      res.status(200).json(
        {
          user: payload.user,
          token: payload.token,
          err: null,
        },
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json(
        {
          user: null,
          token: null,
          err,
        },
      );
    });
});

module.exports = router;
