// All properties are arrays of events
// const EventsResponse = {
//     "TODAY": [],
//     "TOMORROW": [],
//     "WEEK": [],
//     "MONTH": []
// }
// Fake Api

// Events Info for PageInfoComponent. Notice that it misses the color
export const EventsPageInfo = {
  // color: '#253F51',
  title: 'EVENTS',
  info: `Many events are organized throughout the semester. 
    From companies' info sessions to simple workshops, 
    we offer you many opportunities to become successful in your studies`,
};

// Might be moved to API where the weekdays are defined
export const ProvidedTimes = [
  'TODAY',
  'TOMORROW',
  'THIS WEEK',
  'THIS MONTH',
]

export const EventField = {
  MONTH: 'month',
  DAY: 'day',
  WEEKDAY: 'weekday',
  NAME: 'name',
  TIMELOC: 'timeloc',
  CONTENT: 'content',
}


export const EventsResponse = {
  TODAY: [
    {
      month: 'July',
      day: '28',
      weekday: 'Saturday',
      name: 'GitHub Workshop',
      timeloc: '5:00pm - 6:00pm @ IMSE 117',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    },
    {
      month: 'July',
      day: '28',
      weekday: 'Saturday',
      name: 'GitHub Workshop',
      timeloc: '5:00pm - 6:00pm @ IMSE 117',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    },
  ],
  TOMORROW: [
    {
      month: 'July',
      day: '28',
      weekday: 'Saturday',
      name: 'GitHub Workshop',
      timeloc: '5:00pm - 6:00pm @ IMSE 117',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    },
    {
      month: 'July',
      day: '28',
      weekday: 'Saturday',
      name: 'GitHub Workshop',
      timeloc: '5:00pm - 6:00pm @ IMSE 117',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    },
  ],
  'THIS WEEK': [
    {
      month: 'July',
      day: '28',
      weekday: 'Saturday',
      name: 'GitHub Workshop',
      timeloc: '5:00pm - 6:00pm @ IMSE 117',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    },
    {
      month: 'July',
      day: '28',
      weekday: 'Saturday',
      name: 'GitHub Workshop',
      timeloc: '5:00pm - 6:00pm @ IMSE 117',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    },
  ],
  'THIS MONTH': [],
}
