/* eslint-disable camelcase */
const functions = require('firebase-functions')
const { JwtStrategy } = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

const User = require('../auth.model')

const { session_secret } = functions.config().auth

/**
 * Uses a JWT stategy to verify the token
 *
 * @param {object} passport I'm not really sure. It's pretty magical tbh
 */
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user)
    })
  })

  // JWT Strategy
  const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: session_secret,
  }
  passport.use(
    new JwtStrategy(jwtOpts, (jwtPayload, done) => {
      User.getUserById(jwtPayload.data._id, (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
    }),
  )
}
