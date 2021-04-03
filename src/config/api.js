export default {
  login: '/backend/public/login',
  user: '/backend/user',
  address: '/backend/address',
  updatePrimaryAddress: '/backend/address/_setPrimary',
  oneAddress(id) {
    return `${this.address}/${id}`
  }
}