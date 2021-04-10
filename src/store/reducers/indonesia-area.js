import * as actionTypes from '@/config/action-types'

const initialState = {
  provinceList: [],
  regencyList: [],
  districtList: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROVINCE_LIST: {
      const { data = [] } = action.value
      return {
        ...state,
        provinceList: data.provinsi
      }
    }
    case actionTypes.SET_REGENCY_LIST: {
      const { data = [] } = action.value
      return {
        ...state,
        regencyList: data.kota_kabupaten
      }
    }
    case actionTypes.SET_DISTRICT_LIST: {
      const { data = [] } = action.value
      return {
        ...state,
        districtList: data.kecamatan
      }
    }
    case actionTypes.CLEAR_PROVINCE_LIST: {
      return {
        ...state,
        provinceList: []
      }
    }
    case actionTypes.CLEAR_REGENCY_LIST: {
      return {
        ...state,
        regencyList: []
      }
    }
    case actionTypes.CLEAR_DISTRICT_LIST: {
      return {
        ...state,
        districtList: []
      }
    }
  } 
  return state
}

export default reducer