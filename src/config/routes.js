import Dashboard from '@/pages/Dashboard/Dashboard.js'
import config from '@/config/constant'

const page = config.page

export default [
  {
    name: 'Dashboard',
    path: page.dashboard,
    component: Dashboard
  }
]