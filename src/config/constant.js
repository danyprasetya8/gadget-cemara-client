import { toast } from 'react-toastify';
import { cssTransition } from 'react-toastify';

const Fade = cssTransition({
  enter: 'animate__animated animate__fadeIn',
  exit: 'animate__animated animate__fadeOut'
})

export default {
  page: {
    dashboard: '/',
    article: '/article',
    notification: '/notification',
    profile: '/profile',
    editProfile: '/edit-profile',
    login: '/login',
    register: '/register',
    editAddress: '/profile/address/edit',
    createAddress: '/profile/address/create'
  },
  role: {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN'
  },
  app: {
    errorToastOpt: {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      type: toast.TYPE.DARK,
      transition: Fade
    }
  }
}