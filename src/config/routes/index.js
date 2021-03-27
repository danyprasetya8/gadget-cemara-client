import Dashboard from '@/pages/Dashboard/Dashboard'
import Article from '@/pages/Article/Article'
import Notification from '@/pages/Notification/Notification'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import RegisterPage from '@/pages/RegisterPage/RegisterPage'
import EditProfile from '@/pages/EditProfile/EditProfile'
import config from '@/config/constant'

const page = config.page
const { USER, ADMIN } = config.role

export default [
  {
    name: 'Dashboard',
    path: page.dashboard,
    component: Dashboard,
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
    roles: [USER]
  },
  {
    name: 'Profile',
    path: page.profile,
    component: ProfilePage,
    roles: [USER]
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
    roles: [USER]
  }
]