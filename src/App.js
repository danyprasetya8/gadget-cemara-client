import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { isMobile } from '@/utils/responsive'
import React, { Component } from 'react'
import * as actionCreators from '@/store/actions'
import routes from '@/config/routes'

import '@/app.scss'
class App extends Component {
  setDeviceType = () => {
    this.props.setIsMobile(isMobile())
  }

  handleResizeEvent = () => {
    this.setDeviceType()
    window.addEventListener('resize', this.setDeviceType)
  }

  componentDidMount() {
    this.handleResizeEvent()
  }

  render() {
    return (
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
  }
}

const mapStateToProps = state => ({
  isMobile: state.main.isMobile
})

const mapDispatchToProps = dispatch => ({
  setIsMobile: value => dispatch(actionCreators.setIsMobile(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)