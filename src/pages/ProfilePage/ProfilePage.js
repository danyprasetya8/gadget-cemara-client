import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation'
import ProfileOrder from '@/components/ProfileOrder/ProfileOrder'
import ProfileWishlist from '@/components/ProfileWishlist/ProfileWishlist'
import ProfileAddress from '@/components/ProfileAddress/ProfileAddress'
import ProfileReview from '@/components/ProfileReview/ProfileReview'
import male from '@/assets/images/svg/male.svg'
import config from '@/config/constant'

import './profile-page.scss'

const page = config.page

const profileTabList = [
  {
    name: 'order',
    title: 'My Orders',
    path: page.order
  },
  {
    name: 'wishlist',
    title: 'Wishlist',
    path: page.wishlist
  },
  {
    name: 'address',
    title: 'Address',
    path: page.address
  },
  {
    name: 'review',
    title: 'Reviews',
    path: page.review
  }
]

const Profile = props => {
  const [activeTab, setActiveTab] = useState('address')
  const history = useHistory()
  const name = props.currentUser.name

  const toEditPage = () => {
    history.push(page.editProfile)
  }

  const getActiveComponent = () => {
    if (activeTab === 'order') return <ProfileOrder />
    if (activeTab === 'wishlist') return <ProfileWishlist />
    if (activeTab === 'address') return <ProfileAddress history={history} />
    if (activeTab === 'review') return <ProfileReview />
  }
  
  return (
    <div className="profile-page">
      <section className="p-16">
        <h1 className="mb-18">My Profile</h1>

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
              activeTab === tab.name ? 'active' : ''
            ]
            return (
              <div
                key={tab.name}
                className={classList.join(' ')}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.title}
              </div>
            )
          })
        }
      </section>
      {getActiveComponent()}
      <BottomNavigation />
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Profile)
