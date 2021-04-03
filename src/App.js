import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { isMobile } from '@/utils/responsive'
import React, { Component } from 'react'
import * as actionCreators from '@/store/actions'
import RouteGuard from '@/utils/route-guard'
import routes from '@/config/routes/index'

import '@/app.scss'
class App extends Component {
  setDeviceType = () => {
    this.props.setIsMobile(isMobile())
  }

  handleResizeEvent = () => {
    this.setDeviceType()
    window.addEventListener('resize', this.setDeviceType)
  }

  initUser = () => {
    const { currentUser, getCurrentUser } = this.props
    if (!currentUser.init) {
      getCurrentUser()
    }
  }

  componentDidMount() {
    this.handleResizeEvent()
    this.initUser()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {
              routes.map(({ name, path, component, roles, exact = false }) => {
                return (
                  <RouteGuard
                    key={name}
                    path={path}
                    component={component}
                    exact={exact}
                    routeRoles={roles}
                  />
                )
              })
            }
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isMobile: state.main.isMobile,
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setIsMobile: payload => dispatch(actionCreators.setIsMobile(payload)),
  getCurrentUser: payload => dispatch(actionCreators.getCurrentUser(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)