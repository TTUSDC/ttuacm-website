/* eslint-disable camelcase */
const functions = require('firebase-functions')
const passportJwt = require('passport-jwt')
const { ExtractJwt } = require('passport-jwt')
const passportGoogle = require('passport-google-oauth2')
const passportGitHub = require('passport-github')
const passportFacebook = require('passport-facebook')

const JwtStrategy = passportJwt.Strategy
const GoogleStrategy = passportGoogle.Strategy
const GitHubStrategy = passportGitHub.Strategy
const FacebookStrategy = passportFacebook.Strategy

const User = require('../auth.model')

const {
  session_secret,
  github_client_secret,
  google_clientid,
  google_client_secret,
  github_clientid,
  facebook_clientid,
  facebook_client_secret,
} = functions.config().auth

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

  // Google Strategy
  const googleClientID = google_clientid
  const googleClientSecret = google_client_secret
  const googleOpts = {
    // Change this callback URL in production
    callbackURL: '/api/auth/google/redirect',
    clientID: googleClientID,
    clientSecret: googleClientSecret,
  }
  passport.use(
    new GoogleStrategy(googleOpts, (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            // User exists in database
            done(null, currentUser)
          } else {
            const data = {
              googleId: profile.id,
              email: profile.email,
              firstName: profile.displayName.split(' ')[0],
              lastName: profile.displayName.split(' ')[1],
              verified: true,
            }
            User.mergeAccounts(profile, data, 'googleId', (err, user) => {
              done(err, user)
            })
          }
        })
        .catch((err) => {
          console.log(err)
          done(err, null)
        })
    }),
  )

  // GitHub Strategy
  const githubClientID = github_clientid
  const githubClientSecret = github_client_secret
  const githubOpts = {
    callbackURL: '/api/auth/github/redirect',
    clientID: githubClientID,
    clientSecret: githubClientSecret,
  }
  passport.use(
    new GitHubStrategy(githubOpts, (accessToken, refreshToken, profile, done) => {
      User.findOne({ githubId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser)
          } else {
            // Sometimes, the user has their email access set to private
            // In that case, we save their id instead
            const emailData = profile._json.email === null ? profile.id : profile._json.email
            const data = {
              githubId: profile.id,
              email: emailData,
              firstName: profile.displayName.split(' ')[0],
              lastName: profile.displayName.split(' ')[1],
              verified: true,
            }
            User.mergeAccounts(profile, data, 'githubId', (err, user) => {
              done(err, user)
            })
          }
        })
        .catch((err) => {
          console.error(err)
          done(err, null)
        })
    }),
  )
  // Facebook Strategy
  const facebookClientID = facebook_clientid
  const facebookClientSecret = facebook_client_secret
  const facebookOpts = {
    callbackURL: '/api/auth/facebook/redirect',
    clientID: facebookClientID,
    clientSecret: facebookClientSecret,
    profileFields: ['id', 'emails', 'name'],
  }
  passport.use(
    new FacebookStrategy(facebookOpts, (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser)
          } else {
            // Sometimes, the user has their email access set to private
            // In that case, we save their id instead
            const emailData = profile._json.email === null ? profile.id : profile._json.email
            const data = {
              facebookId: profile.id,
              email: emailData,
              firstName: profile._json.first_name,
              lastName: profile._json.last_name,
              verified: true,
            }
            User.mergeAccounts(profile, data, 'facebookId', (err, user) => {
              done(err, user)
            })
          }
        })
        .catch((err) => {
          console.error(err)
          done(err, null)
        })
    }),
  )
}
