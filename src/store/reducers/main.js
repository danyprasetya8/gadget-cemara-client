import * as actionTypes from '@/config/action-types'

const initialState = {
  isMobile: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_MOBILE:
      return {
        ...state,
        isMobile: action.value
      }
  } 
  return state
}

export default reducer