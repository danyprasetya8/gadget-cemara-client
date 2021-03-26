import * as actionCreators from '@/store/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmail } from '@/utils/validation'
import React, { Component } from 'react'
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation'
import config from '@/config/constant'
import logo from '@/assets/images/svg/logo.svg'

import './register-page.scss'

const page = config.page

const formList = [
  {
    name: 'email',
    title: 'Email',
    placeholder: 'gadgetcemara@gmail.com',
    type: 'text'
  },
  {
    name: 'password',
    title: 'Password',
    placeholder: 'Input password',
    type: 'password'
  },
  {
    name: 'rePassword',
    title: 'Confirm password',
    placeholder: 'Re-input password',
    type: 'password'
  },
  {
    name: 'address',
    title: 'Address',
    placeholder: 'Input address',
    type: 'text'
  }
]

class RegisterPage extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        email: '',
        password: '',
        rePassword: '',
        address: ''
      },
      error: {
        email: [],
        password: [],
        rePassword: [],
        address: []
      },
      isUserAlreadyExist: false
    }
  }

  handleInputChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  validateForm = () => {
    const { email, password, rePassword, address } = this.state.form
    const error = {
      email: [],
      password: [],
      rePassword: [],
      address: []
    }

    if (!email.length) {
      error.email = [...error.email, 'Must be filled']
    }
    if (!isEmail(email)) {
      error.email = [...error.email, 'Wrong email format']
    }
    if (password.length < 6) {
      error.password = [...error.password, 'Password must be minimal 6 characters']
    }
    if (!rePassword.length) {
      error.rePassword = [...error.rePassword, 'Must be filled']
    }
    if (password !== rePassword) {
      error.rePassword = [...error.rePassword, 'Password not match']
    }
    if (!address.length) {
      error.address = [...error.address, 'Must be filled']
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
        if (err.response.data.length && err.response.data.includes('UsernameAlreadyExist')) {
          this.setState({ isUserAlreadyExist: true })
        }
      }
    })
  }

  formInputElement = () => {
    return formList.map(({ title, name, placeholder, type }) => {
      const { form, error } = this.state
      return (
        <React.Fragment key={name}>
          <div className="form__title">{title}</div>
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={form[name]}
            onChange={this.handleInputChange}
            className={error[name].length ? 'input-error' : ''}
          />
          {
            !!error[name].length && (
              <div className="form__error">
                {
                  error[name].map(err => (<div key={err}>{err}</div>))
                }
              </div>
            )
          }
        </React.Fragment>
      )
    })
  }

  render() {
    const { isUserAlreadyExist } = this.state

    return (
      <div className="register-page">
        <section className="logo p-16">
          <img src={logo} />
          <div>Gadget Cemara</div>
        </section>

        <form
          className="form p-16"
          onSubmit={this.register}
          onKeyUp={e => e.key === 'Enter' && e.preventDefault() && this.register()}
        >
          {this.formInputElement()}
          <button type="submit">Register</button>
          {
            isUserAlreadyExist && (
              <div className="form__error-message p-8">
                There's already a user registered with this email
              </div>
            )
          }
        </form>

        <div className="form__have-account">
          Already have an account? &nbsp;
          <Link
            to={page.login}
            className="form__have-account--login"
          >
            Login here
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
