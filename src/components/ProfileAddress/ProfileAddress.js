import { ToastContainer, toast } from 'react-toastify';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '@/store/actions'
import config from '@/config/constant'

import './profile-address.scss'

const page = config.page
class ProfileAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleDeleteAddressModal: false,
      savedAddressId: ''
    }
  }

  componentDidMount() {
    if (this.props.userAddress && this.props.userAddress.length) return
    this.props.getUserAddress()
  }

  toggleDeleteAddressModal = (id) => {
    if (id) {
      this.setState({
        savedAddressId: id,
        visibleDeleteAddressModal: !this.state.visibleDeleteAddressModal
      })
      return
    }
    this.setState({ visibleDeleteAddressModal: !this.state.visibleDeleteAddressModal })
  }

  deleteAddress = () => {
    this.props.deleteUserAddress({
      addressId: this.state.savedAddressId,
      onSuccess: () => this.props.getUserAddress({
        onSuccess: () => this.setState({ visibleDeleteAddressModal: false }),
        onFail: () => toast(() => <div className="error-toaster">Terjadi kesalahan pada sistem, silahkan coba lagi</div>, config.app.errorToastOpt)
      })
    })
  }

  updatePrimaryAddress = addressId => {
    this.props.updatePrimaryAddress({
      addressId,
      onSuccess: this.props.getUserAddress,
      onFail: () => toast(() => <div className="error-toaster">Terjadi kesalahan pada sistem, silahkan coba lagi</div>, config.app.errorToastOpt)
    })
  }

  toCreateAddressPage = () => {
    this.props.history.push(page.createAddress)
  }

  render() {
    const { userAddress } = this.props
    return (
      <div className="profile-address">
        {
          userAddress.map(address => {
            return (
              <div
                key={address.id}
                className="address-card"
              >
                <div className="address-card__title">
                  <div className="address-card__label">
                    {address.label}
                  </div>
                  {
                    address.primary && (
                      <div className="address-card__primary-label">
                        Primary Address
                      </div>
                    )
                  }
                </div>
                <div className="address-card__receiver">
                    {address.receiver}
                  </div>
                <div>{address.location}</div>
                <div>{address.phoneNumber}</div>

                <div className="address-card__action-container">
                  <Link
                    className="link"
                    to={{
                      pathname: page.editAddress,
                      addressId: address.id
                    }}
                  >
                    Ubah
                  </Link>
                  {
                    !!userAddress.length > 1 && !userAddress.primary && (
                      <div onClick={() => this.toggleDeleteAddressModal(address.id)}>
                        Hapus
                      </div>
                    )
                  }
                  {
                    !address.primary && (
                      <div onClick={() => this.updatePrimaryAddress(address.id)}>
                        Jadikan alamat utama
                      </div>
                    )
                  }
                </div>
              </div>
            )
          })
        }
        {
          userAddress.length < 3 && (
            <button
              className="add-address-btn"
              onClick={this.toCreateAddressPage}
            >
              + Tambah alamat
            </button>
          )
        }
        {
          this.state.visibleDeleteAddressModal && (
            <>
              <section className="delete-address-modal">
                <div
                  className="mask"
                  onClick={this.toggleDeleteAddressModal}
                />
                <div className="modal-body">
                  <h1>Delete address</h1>
                  <p>
                    Deleted address can't be reverted
                  </p>
                  <div>
                    <button onClick={this.toggleDeleteAddressModal}>
                      Back
                    </button>
                    <button onClick={() => this.deleteAddress()}>
                      Delete
                    </button>
                  </div>
                </div>
              </section>
            </>
          )
        }
        <ToastContainer className="toast-container" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userAddress: state.address.userAddress
})

const mapDispatchToProps = dispatch => ({
  getUserAddress: payload => dispatch(actionCreators.getUserAddress(payload)),
  deleteUserAddress: payload => dispatch(actionCreators.deleteUserAddress(payload)),
  updatePrimaryAddress: payload => dispatch(actionCreators.updatePrimaryAddress(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAddress)
