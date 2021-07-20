import * as actionCreators from '@/store/actions'
import { isEmail } from '@/utils/validation'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PageHeader from '@/components/PageHeader/PageHeader'
import Input from '@UI/Input/Input'
import OtpModal from '@/components/OtpModal/OtpModal'
import ResetPassword from '@/components/ResetPassword/ResetPassword'
import config from '@/config/constant'

import './request-reset-password.scss'

const page = config.page

class RequestResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: ''
      },
      error: {
        email: ''
      },
      otpInput: '',
      isRequestingOtp: false,
      isUserNameNotExist: false,
      visibleOtpModal: false,
      isEnabledResendOtp: false,
      isInvalidToken: false,
      visibleResetPasswordForm: false
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

  requestResetPassword = e => {
    e && e.preventDefault()
    if (this.state.isRequestingOtp) return
    this.validateForm()
  }

  validateForm = () => {
    const error = {
      email: ''
    }
    if (!this.state.form.email.length) {
      error.email = 'Harus diisi'
    }
    if (!isEmail(this.state.form.email)) {
      error.email = 'Format email salah'
    }
    this.setState({ error }, () => {
      if (!this.state.error.email.length) {
        this.requestResetPasswordOtp(false)
      }
    })
  }

  requestResetPasswordOtp = (resend, successCb = null) => {
    this.setState({
      isUserNameNotExist: false,
      isRequestingOtp: true
    })
    this.props.requestResetPasswordOtp({
      form: {
        ...this.state.form,
        resend
      },
      onSuccess: successCb ? successCb : () => {
        this.setState({
          isRequestingOtp: false,
          visibleOtpModal: true
        })
      },
      onFail: err => {
        if (err.response.data?.errors?.user?.includes('UserMustExist')) {
          this.setState({ isUserNameNotExist: true })
        }
      }
    })
  }

  onCountdownComplete = () => {
    this.setState({ isEnabledResendOtp: true })
  }

  resendOtp = () => {
    this.requestResetPasswordOtp(true, () => this.setState({ isEnabledResendOtp: false, isRequestingOtp: false }))
  }

  toggleOtpModal = () => {
    this.setState({ visibleOtpModal: !this.state.visibleOtpModal })
  }

  verifyResetPasswordOtp = () => {
    this.props.verifyResetPasswordOtp({
      form: {
        email: this.state.form.email,
        token: this.state.otpInput
      },
      onSuccess: () => {
        this.setState({
          visibleOtpModal: false,
          visibleResetPasswordForm: true
        })
      },
      onFail: err => {
        if (err.response.data?.errors?.token?.includes('InvalidToken')) {
          this.setState({ isInvalidToken: true, otpInput: '' })
        }
      }
    })
  }

  render() {
    const { form, error, visibleOtpModal, isUserNameNotExist, visibleResetPasswordForm } = this.state
    return (
      <div className="request-reset-password">
        <PageHeader
          title="Reset kata sandi"
          onBack={() => this.props.history.push(page.login)}
        />
        {
          !visibleResetPasswordForm && (
            <form
              onSubmit={this.requestResetPassword}
              className="p-16"
            >
              <Input
                title="Email"
                type="text"
                placeholder="Tulis email"
                name="email"
                value={form.email}
                onChange={this.handleFormInputChange}
                errorMessage={error.email}
              />
              <button
                type="submit"
                className="request-reset-password__form-btn"
              >
                Reset kata sandi
              </button>
              {
                isUserNameNotExist && (
                  <div className="request-reset-password__error-message p-8">
                    Email tidak terdaftar
                  </div>
                )
              }
            </form>
          )
        }
        {
          visibleOtpModal && (
            <OtpModal
              onClose={() => this.setState({ visibleOtpModal: false })}
              toggleOtpModal={this.toggleOtpModal}
              resendOtp={this.resendOtp}
              onCountdownComplete={this.onCountdownComplete}
              verifyOnClick={this.verifyResetPasswordOtp}
              target={this.props.otpResponse.target}
              resendRemainingTime={this.props.otpResponse.resendRemainingTime}
              input={this.state.otpInput}
              setInput={otpInput => this.setState({ otpInput })}
              isEnabledResendOtp={this.state.isEnabledResendOtp}
              isInvalidToken={this.state.isInvalidToken}
            />
          )
        }
        {
          visibleResetPasswordForm &&
          <ResetPassword
            email={this.state.form.email}
            otp={this.state.otpInput}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  otpResponse: state.user.otpResponse
})

const mapDispatchToProps = dispatch => ({
  requestResetPasswordOtp: payload => dispatch(actionCreators.requestResetPasswordOtp(payload)),
  verifyResetPasswordOtp: payload => dispatch(actionCreators.verifyResetPasswordOtp(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestResetPassword)
