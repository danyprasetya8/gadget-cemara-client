import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Link , useHistory, useLocation } from 'react-router-dom'
import React from 'react'
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation'
import RouteGuard from '@/utils/route-guard'
import male from '@/assets/images/svg/male.svg'
import config from '@/config/constant'
import profileRoutes from '@/config/routes/profile-page-routes'

import './profile-page.scss'

const page = config.page

const profileTabList = [
  {
    name: 'order',
    title: 'Pesanan',
    path: page.profileOrder
  },
  {
    name: 'wishlist',
    title: 'Wishlist',
    path: page.profileWishlist
  },
  {
    name: 'address',
    title: 'Alamat',
    path: page.profileAddress
  },
  {
    name: 'review',
    title: 'Ulasan',
    path: page.profileReview
  }
]

const Profile = props => {
  const history = useHistory()
  const { pathname } = useLocation()
  const name = props.currentUser.name

  const toEditPage = () => {
    history.push(page.editProfile)
  }

  const isActiveTab = selectedPathName => {
    return pathname.indexOf(selectedPathName) > -1
  }
  
  return (
    <div className="profile-page">
      <section className="p-16">
        <h1 className="mb-18">Profil</h1>

        <div className="profile-page__user">
          <img src={male} />
          <div>
            <strong>{name}</strong>
            <button onClick={toEditPage}>
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      <section className="profile-navigation">
        {
          profileTabList.map(tab => {
            const classList = [
              'profile-navigation__tab-item',
              isActiveTab(tab.name) ? 'active' : ''
            ]
            return (
              <Link
                key={tab.name}
                className={classList.join(' ')}
                to={tab.path}
              >
                {tab.title}
              </Link>
            )
          })
        }
      </section>
      <Switch>
        {
          profileRoutes.map(({ name, path, component, roles, exact = false }) => {
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
      <BottomNavigation />
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Profile)
