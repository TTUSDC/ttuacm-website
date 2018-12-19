const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { google } = require('googleapis')

const ErrorMessages = require('./oauth.errors')

// If modifying these scopes, delete credentials.json.
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.google.com/m8/feeds/',
]

const TOKEN_PATH = path.resolve(__dirname, 'token.json')

class OAuthHandler {
  constructor() {
    try {
      this.credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'credentials.json')))
    } catch (err) {
      console.error('Cannot read Client Secret')
      process.exit(1)
    }
  }

  /**
   * Creates an OAuthClient to be used for Google APIs
   */
  async getClient() {
    try {
      await this._authorize()
      return this.oAuth2Client
    } catch (err) {
      console.error(err)
      throw ErrorMessages.OAuthError()
    }
  }

  /**
   * Create an OAuth2 client with the given credentials
   *
   * @throws {Error}
   * @return {null}
   */
  async _authorize() {
    // Gets the information out of the token
    let token = {}
    // eslint-disable-next-line
    const { client_secret, client_id, redirect_uris } = this.credentials.installed
    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

    // Check if we have previously stored a token.
    try {
      token = fs.readFileSync(TOKEN_PATH)
      if (this.oAuth2Client === null) throw ErrorMessages.OAuthError()
      this.oAuth2Client.setCredentials(JSON.parse(token))
    } catch (err) {
      this.oAuth2Client = await this._getAccessToken()
    }

    return null
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   */
  async _getAccessToken() {
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
        if (err) {
          console.error(err)
          throw ErrorMessages.UnknownServerError()
        }
        this.oAuth2Client.setCredentials(token)
        // Store the token to disk for later program executions
        try {
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
          console.log('Token stored to', TOKEN_PATH)
        } catch (storeErr) {
          console.error(storeErr)
          throw ErrorMessages.UnknownServerError()
        }
        return null
      })
    })
  }
}

module.exports = OAuthHandler
