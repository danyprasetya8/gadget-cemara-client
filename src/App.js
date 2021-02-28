import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import routes from '@/config/routes'

import '@/app.scss'

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        {
          routes.map(({ name, path, component }) => (
            <Route
              key={name}
              path={path}
              component={component}
              exact={path === '/'}
            />
          ))
        }
      </Switch>
    </div>
  </Router>
)

export default App