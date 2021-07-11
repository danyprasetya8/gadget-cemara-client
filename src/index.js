import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import reduxStore from '@/store'

import 'pure-react-carousel/dist/react-carousel.es.css'
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';

require('@api-mock')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
)