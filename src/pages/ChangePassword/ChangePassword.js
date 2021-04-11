import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react'
import Input from '@UI/Input/Input'

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

  changePassword = e => {
    e && e.preventDefault()
  }

  render() {
    const { form, error } = this.state

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
          onSubmit={this.changePassword}
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
        </form>
      </div>
    )
  }
}

export default ChangePassword
