import * as actionTypes from '@/config/action-types'

const initialState = {
  currentUser: {
    init: false
  },
  isGettingUser: true,
  changePasswordOtp: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      window.localStorage.setItem('token', action.value.headers.authorization)
      break
    }
    case actionTypes.SET_CURRENT_USER: {
      const { data = {} } = action.value
      return {
        ...state,
        currentUser: data
      }
    }
    case actionTypes.SET_GETTING_USER: {
      return {
        ...state,
        isGettingUser: action.value
      }
    }
    case actionTypes.SET_CHANGE_PASSWORD_OTP: {
      const { data = {} } = action.value
      return {
        ...state,
        changePasswordOtp: data
      }
    }
  } 
  return state
}

export default reducer