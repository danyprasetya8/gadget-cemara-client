import { toast } from 'react-toastify'
import React from 'react'
import axios from 'axios'
import config from '@/config/constant'

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(res => res, error => {
  if (error.response.status === 500) {
    toast(() => (
      <div className="error-toaster">Terjadi kesalahan pada sistem, silahkan coba lagi</div>
    ), config.app.errorToastOpt)
  }
  return Promise.reject(error)
})

axiosInstance.interceptors.request.use(req => {
  const token = window.localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default axiosInstance