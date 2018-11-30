// TODO: Fix this so that every service has their own way to authenticate
const passport = require('passport');

/**
 * Middleware for route guarding, this is pretty magical
 * I am not sure how this works lol
 *
 * If errors occur, it is probably because front-end is not sending
 * JWT along with their requests
 */
const membersOnlyRoute = passport.authenticate('jwt', { session: false })

module.exports = {
  membersOnlyRoute,
}
