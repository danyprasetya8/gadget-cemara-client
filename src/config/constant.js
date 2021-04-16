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
    profileOrder: '/profile/order',
    profileWishlist: '/profile/wishlist',
    profileAddress: '/profile/address',
    profileReview: '/profile/review',
    editAddress: '/address/edit',
    createAddress: '/address/create',
    changePassword: '/change-password'
  },
  role: {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN'
  },
  app: {
    toastOpt(type) {
      return {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        type,
        transition: Fade
      }
    },
    userLoggedInBlacklistedPath: [
      '/login',
      '/register'
    ]
  }
}