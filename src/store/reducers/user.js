import * as actionTypes from '@/config/action-types'

const initialState = {
  currentUser: {
    init: false
  },
  isGettingUser: true,
  otpResponse: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      window.localStorage.setItem('token', action.value.data.data.token)
      break
    }
    case actionTypes.SET_CURRENT_USER: {
      const { data = {} } = action.value
      return {
        ...state,
        currentUser: data.data
      }
    }
    case actionTypes.SET_GETTING_USER: {
      return {
        ...state,
        isGettingUser: action.value
      }
    }
    case actionTypes.SET_OTP_RESPONSE: {
      const { data = {} } = action.value
      return {
        ...state,
        otpResponse: data.data
      }
    }
  } 
  return state
}

export default reducer