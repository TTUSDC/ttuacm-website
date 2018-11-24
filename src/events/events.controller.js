const Request = require('../utils/request')
/**
 * Handles Google Calendar Events Controller
 */
class EventsController {
  /**
   * Grabs the OAuth2 Provider from Auth Service and creates a calendar object
   */
  constructor() {
    this.calendar
    this.currentAttendees
    this.calendarId
    new Request('v2', 'auth')
      .params({ api: 'calendar' })
      .path('google-api')
      .end().then((res) => {
         /**
         * Calendar Object
         * @type {object}
         */
        this.calendar = res.data.api
         /**
         * Current Attendees for any particular event
         * @type {Array<object>}
         */
        this.currentAttendees = []
        /**
         * Calendar of choice from ACM
         * @type {string}
         */
        this.calendarId = 'primary'
      }).catch((err) => {
        console.error(err)
        throw err
      })
  }


  /**
   * Gets the raw events object
   *
   * - OnSuccess: Resolves with a list of (raw) events (an empty array if nore are found[])
   * - OnFailure: Rejects with an Error
   *
   * @returns { Promise.<Array, Error> }
   */
  getRawEvents() {
    return new Promise((resolve, reject) => {
      this.calendar.events.list(
        {
          calendarId: this.calendarId,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        },
        (err, { data }) => {
          if (err) {
            reject(err)
          } else {
            resolve(data.items || [])
          }
        },
      )
    })
  }

  /**
   * Lists the events on the user's primary calendar.
   *
   * - OnSuccess: Resolves with a list(10) events
   * - OnFailure: Rejects with an Error
   *
   * @requires oAuth2Client
   */
  listEvents() {
    return new Promise(async (resolve, reject) => {
      this.getRawEvents()
        .then((events) => {
          // Will store all of the events and return
          const eventsList = []
          // Maps all of the numbers to days
          const weekday = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ]
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date
            const end = event.end.dateTime || event.end.date
            // Event Object
            eventsList.push({
              id: i + 1,
              day: `${weekday[new Date(start).getDay()]}`,
              startTime: start,
              endTime: end,
              title: event.summary || '',
              location: event.location || 'TBA',
              creator: event.creator.displayName || 'TTU ACM',
              description: event.description || '',
              attendees: event.attendees || [],
              eventId: event.id, // Event ID according to Google
              allDayEvent: event.start.date !== undefined,
            })
            return resolve(eventsList)
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * Lists all attendees for an event
   *
   * - OnSuccess: Resolves
   * - OnFailure: Rejects with an Error
   *
   * @param {string} eventId Event ID
   * @returns {Promise.<Array<Object>>} A Promise
   */
  getAttendees(eventId) {
    return new Promise((resolve, reject) => {
      this.calendar.events.get(
        {
          calendarId: this.calendarId,
          eventId,
        },
        (err, { data }) => {
          if (err) {
            reject(err)
          } else {
            resolve(data.attendees || [])
          }
        },
      )
    })
  }

  /**
   * Adds an attendee to an event
   *
   * - OnSuccess: Resolves
   * - OnFailure: Rejects with an Error
   *
   * @param {string} eventId the event ID
   * @param {Array} currentAttendees the current attendees for the event
   * @param {string} email the user's email
   * @returns {Promise.<null>} A Promise
   */
  addAttendee(eventId, email) {
    return new Promise(async (resolve, reject) => {
      try {
        this.currentAttendees.push({ email, responseStatus: 'accepted' })
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Removes the attendee by their email
   *
   * - OnSuccess: Resolves with the current attendees
   * - OnFailure: Rejects with an Error
   *
   * @param {string} email the user's email
   * @returns {Array<Object>} updated attendee list
   */
  removeAttendee(email) {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.currentAttendees.length === 0) throw new Error('No attendees found')
        const originalAttendees = this.currentAttendees
        this.currentAttendees = this.currentAttendees.filter(each => each.email !== email.toLowerCase())
        if (originalAttendees.length === this.currentAttendees.length) {
          throw new Error('No user found')
        }
        resolve(this.currentAttendees)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Replaces the event's attendees with the attendees list
   *
   * - OnSuccess: Resolves with the new event object
   * - OnFailure: Rejects with an Error
   *
   * Fun Fact: Google's API deletes duplicates by default
   *
   * @requires oAuth2Client
   * @param {string} eventId user's event ID
   * @param {Array<Object>} attendees array of attendees
   * @returns {Promise<Array<Object>>}
   */
  updateAttendee(eventId, attendees) {
    return new Promise(async (resolve, reject) => {
      this.calendar.events.patch(
        {
          calendarId: this.calendarId,
          eventId,
          resource: {
            attendees,
          },
        },
        (err, { data }) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        },
      )
    })
  }
}


module.exports = EventsController
