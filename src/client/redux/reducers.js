import { combineReducers } from 'redux'
import EventsState from 'redux/reducers/events-reducer'
import TeamsState from 'redux/reducers/teams-reducer'

const rootReducer = combineReducers({
  events: EventsState,
  teams: TeamsState,
})

export default rootReducer
