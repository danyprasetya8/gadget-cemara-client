import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
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
    text: 'Beranda',
    path: config.page.dashboard,
    active: [config.page.dashboard]
  },
  {
    icon: article,
    activeIcon: articleActive,
    text: 'Artikel',
    path: config.page.article,
    active: [config.page.article]
  },
  {
    icon: bell,
    activeIcon: bellActive,
    text: 'Notifikasi',
    path: config.page.notification,
    active: [config.page.notification]
  },
  {
    icon: user,
    activeIcon: userActive,
    text: 'Profil',
    path: config.page.profileOrder,
    active: [
      config.page.profile,
      config.page.profileOrder,
      config.page.profileWishlist,
      config.page.profileAddress,
      config.page.profileReview,
    ]
  }
]

class BottomNavigation extends Component {
  constructor(props) {
    super(props)
    this.intersectionEl = null
    this.setIntersectionRef = el => {
      this.intersectionEl = el
    }

    this.state = {
      positionSticky: false,
      observer: null
    }
  }

  componentDidMount() {
    this.initIntersectionObserver()
  }

  componentWillUnmount() {
    this.destroyIntersectionObserver()
  }

  initIntersectionObserver = () => {
    const screenHeight = window.innerHeight
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && entries[0].boundingClientRect.bottom > screenHeight) {
        this.setState({ positionSticky: true })
        return
      }
      this.setState({ positionSticky: false })
    })

    this.setState({ observer }, () => {
      this.state.observer.observe(this.intersectionEl)
    })
  }

  destroyIntersectionObserver = () => {
    this.state.observer.disconnect()
  }

  navigateTo = path => {
    this.props.history.push(path)
  }

  render() {
    const { pathname } = this.props.history.location
    const { positionSticky } = this.state
    return (
      <>
        <div
          ref={this.setIntersectionRef}
          className="bottom-navigation__observer"
        />
        <div
          className="bottom-navigation"
          style={{
            position: positionSticky ? 'sticky' : 'fixed'
          }}
        >
          {
            navigationList.map(navigator => (
              <div
                key={navigator.path}
                className="navigator"
                onClick={() => this.navigateTo(navigator.path)}
              >
                <img src={
                  navigator.active.includes(pathname)
                    ? navigator.activeIcon
                    : navigator.icon
                } />
                <small style={{
                  color: navigator.active.includes(pathname)
                  ? '#55C595'
                  : '#9A9898'
                }}>
                  {navigator.text}
                </small>
              </div>
            ))
          }
        </div>
      </>
    )
  }
}

export default withRouter(BottomNavigation)
