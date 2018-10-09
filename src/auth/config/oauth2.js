const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { google } = require('googleapis')

const ErrorMessages = require('../auth.errors')

// If modifying these scopes, delete credentials.json.
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.google.com/m8/feeds/',
]

const TOKEN_PATH = path.resolve(__dirname, 'credentials.json')

class OAuthHandler {
  constructor() {
    console.log('Grabbing Google API credentials...')
    try {
      this.content = fs.readFileSync(path.resolve(__dirname, 'client_secret.json'))
    } catch (err) {
      console.error('Cannot read Client Secret')
      process.exit(1)
    }
  }

  createAPI(option) {
    return new Promise(async (resolve, reject) => {
      try {
        await this._authorize(JSON.parse())

        let api
        // Create all the Google API Objects
        switch(option) {
          case('calendar'):
            api = google.calendar({ version: 'v3', auth: this.oAuth2Client });
            break
          case('contacts'):
            api = google.people({ version: 'v1', auth: this.oAuth2Client });
            break
          default:
            reject(ErrorMessages.InvalidAPIOption())
            break
        }

        resolve(api)
      } catch (err) {
        console.error(err)
        reject(ErrorMessages.OAuthError())
      }
    })
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @return {function} if error in reading credentials.json asks for a new one.
   */
  _authorize() {
    return new Promise(async (resolve, reject) => {
      // Gets the information out of the token
      let token = {}
      // eslint-disable-next-line
      const { client_secret, client_id, redirect_uris } = this.content.installed
      this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

      // Check if we have previously stored a token.
      try {
        token = fs.readFileSync(TOKEN_PATH)
      } catch (err) {
        this.oAuth2Client = await this._getAccessToken()
      }

      if (this.oAuth2Client === null) reject(ErrorMessages.OAuthError)
      this.oAuth2Client.setCredentials(JSON.parse(token))

      resolve()
    })
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   */
  _getAccessToken() {
    return new Promise((resolve, reject) => {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      })
      console.log('Authorize this app by visiting this url:', authUrl)
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close()
        this.oAuth2Client.getToken(code, (err, token) => {
          if (err) reject(err)
          this.oAuth2Client.setCredentials(token)
          // Store the token to disk for later program executions
          try {
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
            console.log('Token stored to', TOKEN_PATH)
          } catch (storeErr) {
            console.error(storeErr)
            reject(storeErr)
          }
          resolve()
        })
      })
    })
  }
}

module.exports = OAuthHandler
