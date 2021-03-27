import { useHistory, useLocation } from 'react-router-dom'
import React from 'react'
import home from '@/assets/images/svg/home.svg'
import homeActive from '@/assets/images/svg/home-active.svg'
import article from '@/assets/images/svg/article.svg'
import articleActive from '@/assets/images/svg/article-active.svg'
import bell from '@/assets/images/svg/bell.svg'
import bellActive from '@/assets/images/svg/bell-active.svg'
import user from '@/assets/images/svg/user.svg'
import userActive from '@/assets/images/svg/user-active.svg'
import config from '@/config/constant'

import './bottom-navigation.scss'

const navigationList = [
  {
    icon: home,
    activeIcon: homeActive,
    text: 'Home',
    path: config.page.dashboard,
    active: [config.page.dashboard]
  },
  {
    icon: article,
    activeIcon: articleActive,
    text: 'Article',
    path: config.page.article,
    active: [config.page.article]
  },
  {
    icon: bell,
    activeIcon: bellActive,
    text: 'Notification',
    path: config.page.notification,
    active: [config.page.notification]
  },
  {
    icon: user,
    activeIcon: userActive,
    text: 'Profile',
    path: config.page.profile,
    active: [config.page.profile]
  }
]

const BottomNavigation = () => {
  const history = useHistory()

  const navigateTo = path => {
    history.push(path)
  }

  return (
    <div className="bottom-navigation">
      {
        navigationList.map(navigator => (
          <div
            key={navigator.path}
            className="navigator"
            onClick={() => navigateTo(navigator.path)}
          >
            <img src={
               navigator.active.includes(useLocation().pathname)
                ? navigator.activeIcon
                : navigator.icon
            } />
            <small style={{
              color: navigator.active.includes(useLocation().pathname)
              ? '#55C595'
              : '#9A9898'
            }}>
              {navigator.text}
            </small>
          </div>
        ))
      }
    </div>
  )
}

export default BottomNavigation
