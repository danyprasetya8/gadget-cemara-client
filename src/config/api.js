export default {
  login: '/api/public/login',
  user: '/api/user',
  changePasswordOtp: '/api/password/change/otp',
  changePassword: '/api/password/change',
  resetPasswordOtp: '/api/public/password/reset/otp',
  resetPassword: '/api/public/password/reset',
  verifyResetPasswordOtp: '/api/public/password/reset/verify',
  address: '/api/address',
  updatePrimaryAddress: '/api/address/_setPrimary',
  oneAddress(id) {
    return `${this.address}/${id}`
  },
  indonesia: {
    province: 'https://dev.farizdotid.com/api/daerahindonesia/provinsi',
    regency(provinceId) {
      return `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${[provinceId]}`
    },
    district(regencyId) {
      return `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${regencyId}`
    }
  }
}