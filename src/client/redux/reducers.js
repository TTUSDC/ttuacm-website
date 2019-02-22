import { combineReducers } from 'redux'
import AuthState from 'redux/reducers/auth-reducer'
import EventsState from 'redux/reducers/events-reducer'
import TeamsState from 'redux/reducers/teams-reducer'

const rootReducer = combineReducers({
  auth: AuthState,
  events: EventsState,
  teams: TeamsState,
})

export default rootReducer
