import Dashboard from '@/pages/Dashboard/Dashboard'
import Article from '@/pages/Article/Article'
import Notification from '@/pages/Notification/Notification'
import Profile from '@/pages/Profile/Profile'
import LoginPage from '@/pages/LoginPage/LoginPage'
import RegisterPage from '@/pages/RegisterPage/RegisterPage'
import config from '@/config/constant'

const page = config.page

export default [
  {
    name: 'Dashboard',
    path: page.dashboard,
    component: Dashboard
  },
  {
    name: 'Article',
    path: page.article,
    component: Article
  },
  {
    name: 'Notification',
    path: page.notification,
    component: Notification
  },
  {
    name: 'Profile',
    path: page.profile,
    component: Profile
  },
  {
    name: 'LoginPage',
    path: page.login,
    component: LoginPage
  },
  {
    name: 'RegisterPage',
    path: page.register,
    component: RegisterPage
  }
]