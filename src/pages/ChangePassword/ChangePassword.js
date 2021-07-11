import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import React, { Component } from 'react'
import * as actionCreators from '@/store/actions'
import Input from '@UI/Input/Input'
import OtpModal from '@/components/OtpModal/OtpModal'
import PageHeader from '@/components/PageHeader/PageHeader'
import config from '@/config/constant'

import './change-password.scss'

const page = config.page
class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        oldPassword: '',
        newPassword: ''
      },
      error: {
        oldPassword: '',
        newPassword: ''
      },
      otpInput: '',
      isRequestingOtp: false,
      isStillSamePassword: false,
      visibleOtpModal: false,
      isEnabledResendOtp: false,
      isInvalidToken: false
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

  verifyChangePassword = () => {
    this.setState({ isInvalidToken: false })
    this.props.verifyChangePassword({
      form: {
        oldPassword: this.state.form.oldPassword,
        newPassword: this.state.form.newPassword,
        token: this.state.otpInput
      },
      onSuccess: () => {
        toast(() => (
          <div className="toaster-body">Kata sandi berhasil diubah</div>
        ), config.app.toastOpt(toast.TYPE.INFO))
        this.props.history.push(page.editProfile)
      },
      onFail: err => {
        if (err.response && err.response.data.includes('InvalidToken')) {
          this.setState({ isInvalidToken: true, otpInput: '' })
        }
      }
    })
  }

  doChangePasswordOtp = e => {
    e && e.preventDefault()
    if (this.state.isRequestingOtp) return
    this.setState({ isStillSamePassword: false }, this.validateForm)
  }

  validateForm = () => {
    const { oldPassword, newPassword } = this.state.form
    const error = {
      oldPassword: '',
      newPassword: ''
    }

    Object.keys(error).forEach(key => {
      if (!this.state.form[key].length) {
        error[key] = 'Harus diisi'
      }
    })

    if (oldPassword === newPassword) {
      error.newPassword = 'Kata sandi tidak boleh sama'
    }
    if (newPassword.length < 6) {
      error.newPassword = 'Kata sandi minimal 6 karakter'
    }

    this.setState({ error }, () => {
      if (this.isValidForm()) {
        this.requestChangePasswordOtp()
        return
      }
    })
  }

  isValidForm = () => {
    return Object.values(this.state.error).flat()
      .every(str => !str.length)
  }

  requestChangePasswordOtp = (additionalForm = {}, successCb = null) => {
    this.setState({ isRequestingOtp: true })
    this.props.requestChangePasswordOtp({
      form: {
        ...this.state.form,
        ...additionalForm
      },
      onSuccess: successCb ? successCb : () => this.setState({ visibleOtpModal: true, isRequestingOtp: false }),
      onFail: err => {
        if (err.response && err.response.data && err.response.data.includes('PasswordStillSame')) {
          this.setState({ isStillSamePassword: true, isRequestingOtp: false })
          return
        }
        this.setState({ isRequestingOtp: false })
      }
    })
  }

  onCountdownComplete = () => {
    this.setState({ isEnabledResendOtp: true })
  }

  resendOtp = () => {
    this.requestChangePasswordOtp({ resend: true }, () => this.setState({ isEnabledResendOtp: false, isRequestingOtp: false }))
  }

  toggleOtpModal = () => {
    this.setState({ visibleOtpModal: !this.state.visibleOtpModal })
  }

  render() {
    const {
      form,
      error,
      isStillSamePassword,
      visibleOtpModal,
    } = this.state

    return (
      <div className="change-password">
        <PageHeader
          title="Ubah kata sandi"
          onBack={() => this.props.history.push(page.editProfile)}
        />

        <form
          onSubmit={this.doChangePasswordOtp}
          className="p-16"
        >
          <Input
            title="Kata sandi lama"
            type="password"
            placeholder="Tulis kata sandi"
            name="oldPassword"
            value={form.oldPassword}
            onChange={this.handleFormInputChange}
            errorMessage={error.oldPassword}
          />

          <Input
            title="Kata sandi baru"
            type="password"
            placeholder="Tulis kata sandi"
            name="newPassword"
            value={form.newPassword}
            onChange={this.handleFormInputChange}
            errorMessage={error.newPassword}
          />

          <button
            type="submit"
            className="change-password__form-btn"
          >
            Ubah kata sandi
          </button>

          {
            isStillSamePassword && (
              <div className="change-password__error-message p-8">
                Kata sandi baru harus berbeda
              </div>
            )
          }
        </form>

        {
          visibleOtpModal && (
            <OtpModal
              onClose={() => this.setState({ visibleOtpModal: false })}
              toggleOtpModal={this.toggleOtpModal}
              resendOtp={this.resendOtp}
              onCountdownComplete={this.onCountdownComplete}
              verifyOnClick={this.verifyChangePassword}
              target={this.props.otpResponse.target}
              resendRemainingTime={this.props.otpResponse.resendRemainingTime}
              input={this.state.otpInput}
              setInput={otpInput => this.setState({ otpInput })}
              isEnabledResendOtp={this.state.isEnabledResendOtp}
              isInvalidToken={this.state.isInvalidToken}
            />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  otpResponse: state.user.otpResponse
})

const mapDispatchToProps = dispatch => ({
  requestChangePasswordOtp: payload => dispatch(actionCreators.requestChangePasswordOtp(payload)),
  verifyChangePassword: payload => dispatch(actionCreators.verifyChangePassword(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
