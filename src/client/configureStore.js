import { routerMiddleware } from 'connected-react-router/immutable'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from 'redux/reducers.js'

export const history = createBrowserHistory()

export default function configureStore() {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
      ),
    ),
  )

  if (module.hot) {
    // Reload reducers
    module.hot.accept('./redux/reducers.js', () => {
      store.replaceReducer(rootReducer(history))
    })
  }

  return store
}
