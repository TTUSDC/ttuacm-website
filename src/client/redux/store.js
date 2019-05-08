import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from 'redux/reducers.js'

export const store = (history) =>
  createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(applyMiddleware(routerMiddleware(history))),
  )
