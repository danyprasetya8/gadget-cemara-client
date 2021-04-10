import * as actionTypes from '@/config/action-types'
import api from '@/config/api'
import axios from '@/axios'

const setProvinceList = value => ({
  type: actionTypes.SET_PROVINCE_LIST,
  value
})

export const getProvinceList = (payload = {}) => dispatch => {
  axios.get(api.indonesia.province)
    .then(res => {
      dispatch(setProvinceList(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

const setRegencyList = value => ({
  type: actionTypes.SET_REGENCY_LIST,
  value
})

export const getRegencyList = (payload = {}) => dispatch => {
  axios.get(api.indonesia.regency(payload.provinceId))
    .then(res => {
      dispatch(setRegencyList(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

const setDistrictList = value => ({
  type: actionTypes.SET_DISTRICT_LIST,
  value
})

export const getDistrictList = (payload = {}) => dispatch => {
  axios.get(api.indonesia.district(payload.regencyId))
    .then(res => {
      dispatch(setDistrictList(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

export const clearProvinceList = (payload = {}) => dispatch => {
  dispatch(() => ({ type: actionTypes.CLEAR_PROVINCE_LIST }))
}

export const clearRegencyList = (payload = {}) => dispatch => {
  dispatch(() => ({ type: actionTypes.CLEAR_REGENCY_LIST }))
}

export const clearDistrictList = (payload = {}) => dispatch => {
  dispatch(() => ({ type: actionTypes.CLEAR_DISTRICT_LIST }))
}