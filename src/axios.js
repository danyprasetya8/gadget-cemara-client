import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(req => {
  const token = window.localStorage.getItem('token')
  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }
  return req
})

export default axiosInstance