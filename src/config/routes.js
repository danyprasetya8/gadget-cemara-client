import Dashboard from '@/pages/Dashboard/Dashboard.js'
import Article from '@/pages/Article/Article.js'
import Notification from '@/pages/Notification/Notification.js'
import Profile from '@/pages/Profile/Profile.js'
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
  }
]