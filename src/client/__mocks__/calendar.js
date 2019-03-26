import moment from 'moment'

const MOCK_CALENDAR = []

const TITLES = [
  'A Random Class',
  'Another Workshop with a really long title',
  'GitHub Workshop',
]

const LOCATION = ['IMSE 117', 'IMSE 118', 'IMSE 119']

const DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut'

const today = moment()

for (let i = 0; i < 10; i += 1) {
  MOCK_CALENDAR.push({
    day: today.format('dddd'),
    startTime: today.toDate(),
    endTime: today.toDate(),
    title: TITLES[Math.floor(Math.random() * TITLES.length)],
    location: LOCATION[Math.floor(Math.random() * LOCATION.length)],
    description:
      DESCRIPTION.repeat(Math.floor(Math.random() * 2)) || DESCRIPTION,
    recurringEvent: false,
  })

  today.add(1, 'days')
}

export default MOCK_CALENDAR
