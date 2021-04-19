export default {
  login: '/backend/public/login',
  user: '/backend/user',
  changePasswordOtp: '/backend/user/change-password-otp',
  changePassword: '/backend/user/_change-password',
  resetPasswordOtp: '/backend/public/reset-password-otp',
  resetPassword: '/backend/public/_reset-password',
  verifyResetPasswordOtp: '/backend/public/_verify-reset-password-otp',
  address: '/backend/address',
  updatePrimaryAddress: '/backend/address/_setPrimary',
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