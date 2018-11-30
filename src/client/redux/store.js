import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducers from 'redux/reducers'

const app = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
)

export default app
