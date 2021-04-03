import * as actionTypes from '@/config/action-types'
import api from '@/config/api'
import axios from '@/axios'

const setAddress = value => ({
  type: actionTypes.SET_USER_ADDRESS,
  value
})

export const getUserAddress = (payload = {}) => dispatch => {
  axios.get(api.address)
    .then(res => {
      dispatch(setAddress(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

const setOneAddress = value => ({
  type: actionTypes.SET_ONE_USER_ADDRESS,
  value
})

export const getOneUserAddress = (payload = {}) => dispatch => {
  axios.get(api.oneAddress(payload.id))
    .then(res => {
      dispatch(setOneAddress(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

export const saveUserAddress = (payload = {}) => dispatch => {
  axios.post(api.address, payload.form)
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}

export const updatePrimaryAddress = (payload = {}) => dispatch => {
  const config = {
    method: 'put',
    url: api.updatePrimaryAddress,
    params: {
      id: payload.addressId
    }
  }
  axios(config)
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}

export const updateUserAddress = (payload = {}) => dispatch => {
  axios.put(api.address, payload.form)
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}

export const deleteUserAddress = (payload = {}) => dispatch => {
  axios.delete(api.address, {
    params: {
      id: payload.addressId
    }
  })
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}