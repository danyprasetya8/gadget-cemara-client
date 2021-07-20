import * as actionCreators from '@/store/actions'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router'
import React, { Component } from 'react'
import Input from '@UI/Input/Input'
import config from '@/config/constant'

import './reset-password.scss'

const page = config.page

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        password: '',
        rePassword: ''
      },
      error: {
        password: '',
        rePassword: ''
      }
    }
  }

  handleFormInputChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  resetPassword = e => {
    e && e.preventDefault()
    this.validateForm()
  }

  validateForm = () => {
    const error = {
      password: '',
      rePassword: ''
    }

    if (this.state.form.password.length < 6) {
      error.password = 'Kata sandi minimal 6 karakter'
    }
    if (this.state.form.rePassword !== this.state.form.password) {
      error.rePassword = 'Kata sandi berbeda'
    }

    Object.keys(error).forEach(key => {
      if (!this.state.form[key].length) {
        error[key] = 'Harus diisi'
      }
    })

    this.setState({ error }, () => {
      if (this.isValidForm()) {
        this.doResetPassword()
      }
    })
  }

  isValidForm = () => {
    return Object.values(this.state.error).flat()
      .every(str => !str.length)
  }

  doResetPassword = () => {
    this.props.resetPassword({
      form: {
        email: this.props.email,
        newPassword: this.state.form.password,
        token: this.props.otp
      },
      onSuccess: () => {
        toast(() => (
          <div className="toaster-body">Kata sandi berhasil direset</div>
        ), config.app.toastOpt(toast.TYPE.INFO))
        this.props.history.push(page.login)
      }
    })
  }

  render() {
    const { form, error } = this.state
    return (
      <div className="reset-password">
        <form onSubmit={this.resetPassword}>
          <Input
            title="Kata sandi"
            type="password"
            placeholder="Tulis kata sandi"
            name="password"
            value={form.password}
            onChange={this.handleFormInputChange}
            errorMessage={error.password}
          />
          <Input
            title="Konfirmasi kata sandi"
            type="password"
            placeholder="Tulis kata sandi"
            name="rePassword"
            value={form.rePassword}
            onChange={this.handleFormInputChange}
            errorMessage={error.rePassword}
          />
          <button
            type="submit"
            className="reset-password__form-btn"
          >
            Reset kata sandi
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  resetPassword: payload => dispatch(actionCreators.resetPassword(payload))
})

export default connect(null, mapDispatchToProps)(withRouter(ResetPassword))
