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

const setGettingUser = value => ({
  type: actionTypes.SET_GETTING_USER,
  value
})

export const getCurrentUser = (payload = {}) => dispatch => {
  dispatch(setGettingUser(true))
  axios.get(api.user)
    .then(res => {
      dispatch(setCurrentUser(res))
      dispatch(setGettingUser(false))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => {
      dispatch(setCurrentUser({}))
      dispatch(setGettingUser(false))
      payload.onFail && payload.onFail(err)
    })
}

export const registerUser = payload => () => {
  axios.post(api.user, payload.form)
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}

export const updateUser = payload => () => {
  axios.put(api.user, payload.form)
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}

const setOtpResponse = value => ({
  type: actionTypes.SET_OTP_RESPONSE,
  value
})

export const requestChangePasswordOtp = (payload = {}) => dispatch => {
  axios.post(api.changePasswordOtp, payload.form)
    .then(res => {
      dispatch(setOtpResponse(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

export const verifyChangePassword = (payload = {}) => () => {
  axios.post(api.changePassword, payload.form)
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}

export const requestResetPasswordOtp = (payload = {}) => dispatch => {
  axios.post(api.resetPasswordOtp, payload.form)
    .then(res => {
      dispatch(setOtpResponse(res))
      payload.onSuccess && payload.onSuccess(res)
    })
    .catch(err => payload.onFail && payload.onFail(err))
}

export const resetPassword = (payload = {}) => () => {
  axios.post(api.resetPassword, payload.form)
    .then(res => payload.onSuccess && payload.onSuccess(res))
    .catch(err => payload.onFail && payload.onFail(err))
}

export const verifyResetPasswordOtp = (payload = {}) => () => {
  axios.post(api.verifyResetPasswordOtp, payload.form)
  .then(res => payload.onSuccess && payload.onSuccess(res))
  .catch(err => payload.onFail && payload.onFail(err))
}