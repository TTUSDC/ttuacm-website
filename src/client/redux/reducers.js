import { combineReducers } from 'redux'
import AuthState from 'redux/reducers/auth-reducer'
import EventsState from 'redux/reducers/events-reducer'
import TeamsState from 'redux/reducers/teams-reducer'

const MainReducer = combineReducers({
  AuthState,
  EventsState,
  TeamsState,
})

export default MainReducer
