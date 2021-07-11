import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { arrayContainAny } from '@/utils/object-util'
import PageNotFound from '@/components/PageNotFound/PageNotFound'
import config from '@/config/constant'
import store from '@/store'

const RouteGuard = ({ component: Component, routeRoles, path, redirect, ...rest }) => {
  const { user = {} } = store.getState()
  const { currentUser = {} } = user

  const guestAccessProtectedRoute = !currentUser.roles && routeRoles.length
  const userDontHaveAuthority = routeRoles.length && currentUser.roles && currentUser.roles.length && !arrayContainAny(routeRoles, currentUser.roles)
  const userIsLoggedIn = currentUser && currentUser.email && currentUser.roles.length
  const loggedInUserAccessBlacklistedPath = userIsLoggedIn && config.app.userLoggedInBlacklistedPath.includes(path)

  const parentProps = {
    ...rest,
    path
  }

  return (
    <Route {...parentProps} render={props => {
      if (userDontHaveAuthority) {
        return <PageNotFound />
      }

      if (guestAccessProtectedRoute) {
        return <Redirect to={{
          pathname: config.page.login,
          search: `?redirect=${encodeURIComponent(redirect ? redirect : path)}`
        }}/>
      }

      if (loggedInUserAccessBlacklistedPath) {
        return <Redirect to={config.page.dashboard} />
      }

      return <Component {...props} />
    }}/>
  )
}

export default RouteGuard
