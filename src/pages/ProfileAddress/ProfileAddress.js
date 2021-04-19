import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '@/store/actions'
import Switch from 'react-switch'
import BottomSheet from '@UI/BottomSheet/BottomSheet'
import config from '@/config/constant'
import questionImg from '@/assets/images/question.png'

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
        onSuccess: () => this.setState({ visibleDeleteAddressModal: false })
      })
    })
  }

  updatePrimaryAddress = address => {
    if (address.primary) return
    this.props.updatePrimaryAddress({
      addressId: address.id,
      onSuccess: this.props.getUserAddress
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
                <div className="address-card__title mb-6">
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
                <div className="address-card__receiver mb-6">
                    {address.receiver}
                  </div>
                <div className="mb-4">{address.detail}</div>
                <div>{address.district}, {address.regency}, {address.province}, {address.postalCode}</div>
                <div className="mt-4">{address.phoneNumber}</div>

                <div className="address-card__action-container">
                  <Link
                    className="link"
                    to={{
                      pathname: page.editAddress,
                      search: '?addressId=' + address.id
                    }}
                  >
                    <Icon
                      icon={faPencilAlt}
                      className="icon"
                    />
                    Ubah
                  </Link>
                  <label className="address-card__action-container--switch">
                    <Switch
                      id="primary-switch"
                      onChange={() => this.updatePrimaryAddress(address)}
                      checked={address.primary}
                      onColor="#55C595"
                      offColor="#9A9898"
                      uncheckedIcon={false}
                      checkedIcon={false}
                      height={16}
                      width={30}
                      handleDiameter={14}
                    />
                    <div>Jadikan alamat utama</div>
                  </label>
                  {
                    userAddress.length > 1 && !address.primary && (
                      <div onClick={() => this.toggleDeleteAddressModal(address.id)}>
                        <Icon
                          icon={faTrashAlt}
                          className="icon"
                        />
                        Hapus
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
            <BottomSheet onClose={this.toggleDeleteAddressModal}>
              <div className="delete-address-modal">
                <img src={questionImg} />
                <p>
                  <strong>Yakin hapus alamat ini?</strong>
                </p>
                <div>
                  <button onClick={this.toggleDeleteAddressModal}>
                    Kembali
                  </button>
                  <button onClick={() => this.deleteAddress()}>
                    Hapus
                  </button>
                </div>
              </div>
            </BottomSheet>
          )
        }
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
