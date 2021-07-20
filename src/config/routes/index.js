import Dashboard from '@/pages/Dashboard/Dashboard'
import Article from '@/pages/Article/Article'
import Notification from '@/pages/Notification/Notification'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import RegisterPage from '@/pages/RegisterPage/RegisterPage'
import EditProfile from '@/pages/EditProfile/EditProfile'
import EditAddress from '@/pages/EditAddress/EditAddress'
import CreateAddress from '@/pages/CreateAddress/CreateAddress'
import ChangePassword from '@/pages/ChangePassword/ChangePassword'
import RequestResetPassword from '@/pages/RequestResetPassword/RequestResetPassword'
import config from '@/config/constant'

const page = config.page
const { CUSTOMER } = config.role

export default [
  {
    name: 'Dashboard',
    path: page.dashboard,
    component: Dashboard,
    exact: true,
    roles: []
  },
  {
    name: 'Article',
    path: page.article,
    component: Article,
    roles: []
  },
  {
    name: 'Notification',
    path: page.notification,
    component: Notification,
    roles: [CUSTOMER]
  },
  {
    name: 'Profile',
    path: page.profile,
    component: ProfilePage,
    roles: [CUSTOMER],
    redirect: page.profileOrder
  },
  {
    name: 'LoginPage',
    path: page.login,
    component: LoginPage,
    roles: []
  },
  {
    name: 'RegisterPage',
    path: page.register,
    component: RegisterPage,
    roles: []
  },
  {
    name: 'EditProfile',
    path: page.editProfile,
    component: EditProfile,
    roles: [CUSTOMER]
  },
  {
    name: 'EditAddress',
    path: page.editAddress,
    component: EditAddress,
    roles: [CUSTOMER]
  },
  {
    name: 'CreateAddress',
    path: page.createAddress,
    component: CreateAddress,
    roles: [CUSTOMER]
  },
  {
    name: 'ChangePassword',
    path: page.changePassword,
    component: ChangePassword,
    roles: [CUSTOMER]
  },
  {
    name: 'RequestResetPassword',
    path: page.resetPassword,
    component: RequestResetPassword,
    roles: []
  }
]