import * as actionTypes from '@/config/action-types'
import api from '@/config/api'
import axios from '@/axios'

const loginCreator = value => ({
  type: actionTypes.LOGIN,
  value
})

export const login = payload => dispatch => {
  const requestBody = {
    email: payload.email,
    password: payload.password
  }
  axios.post(api.login, requestBody)
    .then(res => {
      dispatch(loginCreator(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

const setCurrentUser = value => ({
  type: actionTypes.SET_CURRENT_USER,
  value
})

export const getCurrentUser = (payload = {}) => dispatch => {
  axios.get(api.user)
    .then(res => {
      dispatch(setCurrentUser(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

export const registerUser = payload => () => {
  axios.post(api.user, payload.form)
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}