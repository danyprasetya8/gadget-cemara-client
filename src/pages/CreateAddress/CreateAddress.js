import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import React, { Component } from 'react'
import * as actionCreators from '@/store/actions'
import FormInput from '@/components/FormInput/FormInput'
import config from '@/config/constant'

import './create-address.scss'

const page = config.page

const formList = [
  {
    name: 'label',
    title: 'Label alamat',
    placeholder: 'Tulis label alamat',
    type: 'text'
  },
  {
    name: 'receiver',
    title: 'Penerima',
    placeholder: 'Tulis nama penerima',
    type: 'text'
  },
  {
    name: 'location',
    title: 'Alamat',
    placeholder: 'Tulis alamat lengkap',
    type: 'text'
  },
  {
    name: 'phoneNumber',
    title: 'Nomor telepon',
    placeholder: 'Tulis nomor telepon',
    type: 'text',
    textNumber: true
  },
  {
    name: 'postalCode',
    title: 'Kode pos',
    placeholder: 'Tulis kode pos',
    type: 'text',
    textNumber: true
  }
]

class CreateAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        label: '',
        location: '',
        receiver: '',
        phoneNumber: '',
        postalCode: ''
      },
      error: {
        label: [],
        location: [],
        receiver: [],
        phoneNumber: [],
        postalCode: []
      }
    }
  }

  handleFormInputChange = (e, name) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.validity.valid ? e.target.value : this.state.form[name]
      }
    })
  }

  createAddress = e => {
    e && e.preventDefault()
    this.validateForm()
  }

  validateForm = () => {
    const { label, location, receiver, phoneNumber, postalCode } = this.state.form
    const error = {
      label: [],
      location: [],
      receiver: [],
      phoneNumber: [],
      postalCode: []
    }

    if (!label.length) {
      error.label = [...error.label, 'Harus diisi']
    }
    if (!location.length) {
      error.location = [...error.location, 'Harus diisi']
    }
    if (!receiver.length) {
      error.receiver = [...error.receiver, 'Harus diisi']
    }
    if (!phoneNumber.length) {
      error.phoneNumber = [...error.phoneNumber, 'Harus diisi']
    }
    if (phoneNumber.length < 8) {
      error.phoneNumber = [...error.phoneNumber, 'Format nomor telepon salah']
    }
    if (!postalCode.length) {
      error.postalCode = [...error.postalCode, 'Harus diisi']
    }

    this.setState({ error }, () => {
      if (this.isValidForm()) {
        this.doCreateAddress(this.state.form)
      }
    })
  }

  doCreateAddress = form => {
    this.props.saveUserAddress({
      form,
      onSuccess: () => this.props.getUserAddress({
        onSuccess: () => this.props.history.push(page.profile)
      }),
      onFail: () => toast(() => <div className="error-toaster">Terjadi kesalahan pada sistem, silahkan coba lagi</div>, config.app.errorToastOpt)
    })
  }

  isValidForm = () => {
    return !Object.values(this.state.error)
      .flat()
      .length
  }

  render() {
    const { form, error } = this.state

    return (
      <div className="create-address">
        <div className="header p-16">
          <Icon
            icon={faArrowLeft}
            onClick={() => this.props.history.goBack()}
          />
          <strong>Buat alamat baru</strong>
        </div>

        <FormInput
          form={form}
          error={error}
          formInputList={formList}
          onSubmit={this.createAddress}
          handleFormInputChange={this.handleFormInputChange}
        >
          <button
            type="submit"
            className="create-address-form__btn"
          >
            Tambah alamat
          </button>
        </FormInput>
        <ToastContainer className="toast-container" />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getUserAddress: payload => dispatch(actionCreators.getUserAddress(payload)),
  saveUserAddress: payload => dispatch(actionCreators.saveUserAddress(payload))
})

export default connect(null, mapDispatchToProps)(CreateAddress)
