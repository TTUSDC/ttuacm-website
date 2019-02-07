import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router/immutable'
import AuthState from 'redux/reducers/auth-reducer'
import EventsState from 'redux/reducers/events-reducer'
import TeamsState from 'redux/reducers/teams-reducer'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  auth: AuthState,
  events: EventsState,
  teams: TeamsState,
})

export default rootReducer
