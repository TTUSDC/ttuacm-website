const { google } = require('googleapis')
const OAuth = require('../oauth/oauth2')

class EventsController {
  constructor() {
    this.oauth = new OAuth()
  }

  /**
   * Lists all of the events form google calendar
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  getAllEvents() {
    return new Promise(async (resolve, reject) => {
      let allEvents
      try {
        const auth = await this.oauth.getClient()
        const calendar = google.calendar({ version: 'v3', auth })
        calendar.events.list(
          {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
          },
          (err, res) => {
            if (err) reject(err)
            const events = res.data.items
            if (events.length) {
              allEvents = events.map((event) => {
                // Will store all of the events and return
                // Maps all of the numbers to days
                const start = event.start.dateTime || event.start.date
                const end = event.end.dateTime || event.end.date
                const singleEvent = {
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
              console.log('No upcoming events found.')
            }
            resolve(allEvents)
          },
        )
      } catch (err) {
        console.error(err)
        reject(err)
      }
    })
  }
}

module.exports = EventsController
