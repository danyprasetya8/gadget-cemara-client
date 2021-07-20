import ProfileOrder from '@/pages/ProfileOrder/ProfileOrder'
import ProfileWishlist from '@/pages/ProfileWishlist/ProfileWishlist'
import ProfileAddress from '@/pages/ProfileAddress/ProfileAddress'
import ProfileReview from '@/pages/ProfileReview/ProfileReview'
import config from '@/config/constant'

const page = config.page
const { CUSTOMER } = config.role

export default [
  {
    name: 'ProfileOrder',
    path: page.profileOrder,
    component: ProfileOrder,
    roles: [CUSTOMER]
  },
  {
    name: 'ProfileWishlist',
    path: page.profileWishlist,
    component: ProfileWishlist,
    roles: [CUSTOMER]
  },
  {
    name: 'ProfileAddress',
    path: page.profileAddress,
    component: ProfileAddress,
    exact: true,
    roles: [CUSTOMER]
  },
  {
    name: 'ProfileReview',
    path: page.profileReview,
    component: ProfileReview,
    roles: [CUSTOMER]
  }
]