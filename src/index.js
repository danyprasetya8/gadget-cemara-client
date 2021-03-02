import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import mainReducer from '@/store/reducers/main'

import 'pure-react-carousel/dist/react-carousel.es.css'

require('@api-mock')

const rootReducer = combineReducers({
  main: mainReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
)