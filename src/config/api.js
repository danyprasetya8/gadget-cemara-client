export default {
  login: '/backend/public/login',
  user: '/backend/user',
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