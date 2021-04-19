import React from 'react'
import BottomSheet from '@UI/BottomSheet/BottomSheet'
import OtpInput from 'react-otp-input'
import Countdown from '@/components/Countdown/Countdown'
import PropTypes from 'prop-types'

import './otp-modal.scss'

const OtpModal = props => {
  return (
    <BottomSheet onClose={props.onClose}>
      <div className="otp-modal__body p-8">
        <h2 className="mb-6">Masukkan kode verifikasi</h2>
        <p>Kami telah mengirimkan kode verifikasi 4 digit ke {props.target} </p>
        <p className="mtb-6">Demi keamananmu, jangan berikan kode tersebut kepada siapapun</p>
        <OtpInput
          value={props.input}
          onChange={props.setInput}
          numInputs={4}
          isInputNum
          shouldAutoFocus
          separator={<span>&nbsp;</span>}
          containerStyle="otp-modal__input-container mt-10"
          inputStyle="otp-modal__input"
        />
        {
          props.isEnabledResendOtp ? (
            <a
              className="mt-20 otp-modal__resend"
              onClick={props.resendOtp}
            >
              <strong>Kirim ulang kode OTP</strong>
            </a>
          ) : (
            <strong className="mt-20 otp-modal__countdown-resend">
              <div className="mb-6">Kirim ulang dalam</div>
              <Countdown
                time={Math.floor(props.resendRemainingTime / 1000)}
                onCountdownComplete={props.onCountdownComplete}
              />
            </strong>
          )
        }
        {
          props.isInvalidToken && (
            <div className="otp-modal__error-message p-8">
              Kode OTP salah
            </div>
          )
        }
        <button
          onClick={props.verifyOnClick}
          className={['mt-20',
            props.input.length < 4 ? 'otp-modal__btn--disabled' : 'otp-modal__btn'
          ].join(' ')}
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
