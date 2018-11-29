/* eslint-disable */
const fs = require('fs');
const readline = require('readline');
const path = require('path')
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.resolve(__dirname, 'token.json')

function getAllEvents(done) {
  // Load client secrets from a local file.
  fs.readFile(path.resolve(__dirname, 'credentials.json'), (err, content) => {
    if (err) done(err)
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents, done);
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, done) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    listEvents(oAuth2Client, done);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback, done) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) done(err)
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) done(err)
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client, done);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, done) {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const calendar = google.calendar({version: 'v3', auth});
  let allEvents
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) done(err)
    events = res.data.items;
    if (events.length) {
      allEvents = events.map((event, i) => {
        // Will store all of the events and return
        // Maps all of the numbers to days
        const start = event.start.dateTime || event.start.date
        const end = event.end.dateTime || event.end.date
        const singleEvent =  {
          day: `${weekday[new Date(start).getDay()]}`,
          startTime: start,
          endTime: end,
          title: event.summary || '',
          location: event.location || 'TBA',
          description: event.description || '',
          recurringEvent: Boolean(event.recurringEventId),
        }
        return singleEvent
      })
    } else {
      console.log('No upcoming events found.');
    }
    done(null, allEvents)
  });
}

module.exports.getAllEvents = getAllEvents
