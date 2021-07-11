import * as actionTypes from '@/config/action-types'

const initialState = {
  userAddress: [],
  oneUserAddress: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_ADDRESS: {
      const { data = [] } = action.value
      return {
        ...state,
        userAddress: data
      }
    }
    case actionTypes.SET_ONE_USER_ADDRESS: {
      const { data = {} } = action.value
      return {
        ...state,
        oneUserAddress: data
      }
    }
  } 
  return state
}

export default reducer