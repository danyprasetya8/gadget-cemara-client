import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import React, { Component } from 'react'
import * as actionCreators from '@/store/actions'
import Input from '@UI/Input/Input'
import OtpInput from 'react-otp-input'
import Countdown from '@/components/Countdown/Countdown'
import BottomSheet from '@UI/BottomSheet/BottomSheet'
import config from '@/config/constant'

import './change-password.scss'
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
        this.props.history.push(config.page.editProfile)
      },
      onFail: err => {
        if (err.response.data.includes('InvalidToken')) {
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
        this.requestChangePasswordOtp(this.state.form)
        return
      }
    })
  }

  isValidForm = () => {
    return Object.values(this.state.error).flat()
      .every(str => !str.length)
  }

  requestChangePasswordOtp = (form, successCb = null) => {
    this.setState({ isRequestingOtp: true })
    this.props.requestChangePasswordOtp({
      form,
      onSuccess: successCb ? successCb : () => this.setState({ visibleOtpModal: true, isRequestingOtp: false }),
      onFail: err => {
        if (err.response.data.includes('PasswordStillSame')) {
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
    this.requestChangePasswordOtp(this.state.form, () => this.setState({ isEnabledResendOtp: false, isRequestingOtp: false }))
  }

  toggleOtpModal = () => {
    this.setState({ visibleOtpModal: !this.state.visibleOtpModal })
  }

  render() {
    const { form, error, isStillSamePassword, visibleOtpModal, otpInput, isEnabledResendOtp, isInvalidToken } = this.state
    const { changePasswordOtp } = this.props

    return (
      <div className="change-password">
        <div className="header p-16">
          <Icon
            icon={faArrowLeft}
            onClick={() => this.props.history.goBack()}
            color="#55C595"
          />
          <strong>Ubah kata sandi</strong>
        </div>

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
            <BottomSheet onClose={this.toggleOtpModal}>
              <div className="modal-otp__body p-8">
                <h2 className="mb-6">Masukkan kode verifikasi</h2>
                <p>Kami telah mengirimkan kode verifikasi 4 digit ke {changePasswordOtp.target} </p>
                <p className="mtb-6">Demi keamananmu, jangan berikan kode tersebut kepada siapapun</p>
                <OtpInput
                  value={otpInput}
                  onChange={otpInput => this.setState({ otpInput })}
                  numInputs={4}
                  isInputNum
                  shouldAutoFocus
                  separator={<span>&nbsp;</span>}
                  containerStyle="modal-otp__input-container mt-10"
                  inputStyle="modal-otp__input"
                />
                {
                  isEnabledResendOtp ? (
                    <a
                      className="mt-20 modal-otp__resend"
                      onClick={this.resendOtp}
                    >
                      <strong>Kirim ulang kode OTP</strong>
                    </a>
                  ) : (
                    <strong className="mt-20 modal-otp__countdown-resend">
                      <div className="mb-6">Kirim ulang dalam</div>
                      <Countdown
                        time={Math.floor(changePasswordOtp.remainingTime / 1000)}
                        onCountdownComplete={this.onCountdownComplete}
                      />
                      {
                        isInvalidToken && (
                          <div className="change-password__error-message p-8">
                            Kode OTP salah
                          </div>
                        )
                      }
                    </strong>
                  )
                }
                <button
                  onClick={this.verifyChangePassword}
                  className={['mt-20',
                    otpInput.length < 4 ? 'change-password__form-btn--disabled' : 'change-password__form-btn'
                  ].join(' ')}
                >
                  Verifikasi
                </button>
              </div>
            </BottomSheet>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  changePasswordOtp: state.user.changePasswordOtp
})

const mapDispatchToProps = dispatch => ({
  requestChangePasswordOtp: payload => dispatch(actionCreators.requestChangePasswordOtp(payload)),
  verifyChangePassword: payload => dispatch(actionCreators.verifyChangePassword(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
