import * as actionTypes from '@/config/action-types'

const initialState = {
  currentUser: {
    init: false
  }
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
  } 
  return state
}

export default reducer