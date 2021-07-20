import React from 'react'
import BottomSheet from '@UI/BottomSheet/BottomSheet'
import OtpInput from 'react-otp-input'
import Countdown from '@/components/Countdown/Countdown'
import PropTypes from 'prop-types'

import './otp-modal.scss'

const OtpModal = props => {
  return (
    <BottomSheet onClose={props.onClose}>
      <div className="otp-modal__body">
        <h2>Masukkan kode verifikasi</h2>
        <p>Kami telah mengirimkan kode verifikasi 4 digit ke {props.target} </p>
        <p>Demi keamananmu, jangan berikan kode tersebut kepada siapapun</p>
        <OtpInput
          value={props.input}
          onChange={props.setInput}
          numInputs={4}
          isInputNum
          shouldAutoFocus
          separator={<span>&nbsp;</span>}
          containerStyle="otp-modal__input-container"
          inputStyle="otp-modal__input"
        />
        {
          props.isEnabledResendOtp ? (
            <a
              className="otp-modal__resend"
              onClick={props.resendOtp}
            >
              <strong>Kirim ulang kode OTP</strong>
            </a>
          ) : (
            <strong className="otp-modal__countdown-resend">
              <div className="">Kirim ulang dalam</div>
              <Countdown
                time={Math.floor(props.resendRemainingTime / 1000)}
                onCountdownComplete={props.onCountdownComplete}
              />
            </strong>
          )
        }
        {
          props.isInvalidToken && (
            <div className="otp-modal__error-message">
              Kode OTP salah
            </div>
          )
        }
        <button
          onClick={props.verifyOnClick}
          className={props.input.length < 4 ? 'otp-modal__btn--disabled' : 'otp-modal__btn'}
        >
          Verifikasi
        </button>
      </div>
    </BottomSheet>
  )
}

export default OtpModal

OtpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  toggleOtpModal: PropTypes.func.isRequired,
  resendOtp: PropTypes.func.isRequired,
  onCountdownComplete: PropTypes.func.isRequired,
  verifyOnClick: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
  resendRemainingTime: PropTypes.number.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  isEnabledResendOtp: PropTypes.bool.isRequired,
  isInvalidToken: PropTypes.bool.isRequired
}
