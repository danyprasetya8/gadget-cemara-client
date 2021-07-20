import * as actionCreators from '@/store/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmail } from '@/utils/validation'
import React, { Component } from 'react'
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation'
import FormInput from '@/components/FormInput/FormInput'
import config from '@/config/constant'
import logo from '@/assets/images/svg/logo.svg'

import './register-page.scss'

const page = config.page

const formList = [
  {
    name: 'email',
    title: 'Email',
    placeholder: 'Tulis email',
    type: 'text'
  },
  {
    name: 'name',
    title: 'Nama',
    placeholder: 'Tulis nama',
    type: 'text'
  },
  {
    name: 'password',
    title: 'Kata sandi',
    placeholder: 'Tulis kata sandi',
    type: 'password'
  },
  {
    name: 'rePassword',
    title: 'Konfirmasi kata sandi',
    placeholder: 'Tulis kembali kata sandi',
    type: 'password'
  },
  {
    name: 'address',
    title: 'Alamat',
    placeholder: 'Tulis alamat',
    type: 'text'
  },
  {
    name: 'phoneNumber',
    title: 'Nomor telepon',
    placeholder: 'Tulis nomor telepon',
    type: 'text',
    textNumber: true
  }
]

class RegisterPage extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        email: '',
        name: '',
        password: '',
        rePassword: '',
        address: '',
        phoneNumber: ''
      },
      error: {
        email: [],
        name: [],
        password: [],
        rePassword: [],
        address: [],
        phoneNumber: []
      },
      isUserAlreadyExist: false
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

  validateForm = () => {
    const { email, name, password, rePassword, address, phoneNumber } = this.state.form
    const error = {
      email: [],
      name: [],
      password: [],
      rePassword: [],
      address: [],
      phoneNumber: []
    }

    if (!email.length) {
      error.email = [...error.email, 'Harus diisi']
    }
    if (!isEmail(email)) {
      error.email = [...error.email, 'Format email salah']
    }
    if (!name.length) {
      error.name = [...error.name, 'Harus diisi']
    }
    if (password.length < 6) {
      error.password = [...error.password, 'Kata sandi minimal 6 karakter']
    }
    if (!rePassword.length) {
      error.rePassword = [...error.rePassword, 'Harus diisi']
    }
    if (password !== rePassword) {
      error.rePassword = [...error.rePassword, 'Kata sandi tidak sesuai']
    }
    if (!address.length) {
      error.address = [...error.address, 'Harus diisi']
    }
    if (!phoneNumber.length) {
      error.phoneNumber = [...error.phoneNumber, 'Harus diisi']
    }
    if (phoneNumber.length < 8) {
      error.phoneNumber = [...error.phoneNumber, 'Format nomor telepon salah']
    }

    this.setState({ error }, () => {
      if (this.isValidForm()) {
        this.doRegister(this.state.form)
      }
    })
  }

  isValidForm = () => {
    return !Object.values(this.state.error)
      .flat()
      .length
  }

  register = e => {
    e && e.preventDefault()
    this.setState({ isUserAlreadyExist: false })
    this.validateForm()
  }

  doRegister = form => {
    this.props.registerUser({
      form,
      onSuccess: () => this.props.history.push(page.login),
      onFail: err => {
        if (err.response?.data?.errors?.user?.includes('UserMustNotExist')) {
          this.setState({ isUserAlreadyExist: true })
        }
      }
    })
  }

  render() {
    const { isUserAlreadyExist, form, error } = this.state

    return (
      <div className="register-page">
        <section className="logo p-16">
          <img src={logo} />
          <div className="font-comfortaa">Gadget Cemara</div>
        </section>

        <FormInput
          form={form}
          error={error}
          formInputList={formList}
          onSubmit={this.register}
          handleFormInputChange={this.handleFormInputChange}
        >
          <button
            type="submit"
            className="register-form__btn"
          >
              Daftar
          </button>
          {
            isUserAlreadyExist && (
              <div className="register-form__error-message p-8">
                User dengan email ini telah terdaftar
              </div>
            )
          }
        </FormInput>

        <div className="register-form__have-account">
          Sudah punya akun? &nbsp;
          <Link
            to={page.login}
            className="register-form__have-account--login"
          >
            Masuk disini
          </Link>
        </div>

        <BottomNavigation />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  registerUser: payload => dispatch(actionCreators.registerUser(payload))
})

export default connect(null, mapDispatchToProps)(RegisterPage)
