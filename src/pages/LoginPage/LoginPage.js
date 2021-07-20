import * as actionCreators from '@/store/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmail } from '@/utils/validation'
import React, { Component } from 'react'
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation'
import FormInput from '@/components/FormInput/FormInput'
import config from '@/config/constant'
import logo from '@/assets/images/svg/logo.svg'
import './login-page.scss'

const page = config.page

const formList = [
  {
    name: 'email',
    title: 'Email',
    placeholder: 'Tulis email',
    type: 'text'
  },
  {
    name: 'password',
    title: 'Kata sandi',
    placeholder: 'Tulis kata sandi',
    type: 'password'
  }
]

class LoginPage extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        email: '',
        password: ''
      },
      error: {
        email: [],
        password: []
      },
      isUnauthorized: false
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

  isValidForm = (email, password) => {
    return email && password && isEmail(email)
  }

  login = e => {
    e && e.preventDefault()
    this.setState({ isUnauthorized: false })
    this.validateForm()
  }

  doLogin = ({ email, password }) => {
    this.props.login({
      email,
      password,
      onSuccess: this.getUser,
      onFail: () => {
        this.setState({ isUnauthorized: true })
      }
    })
  }

  getUser = () => {
    const { getCurrentUser, history } = this.props
    getCurrentUser({
      onSuccess: () => {
        const { search = '' } = this.props.location
        const query = new URLSearchParams(search)
        if (query.get('redirect')) {
          history.push(query.get('redirect'))
          return
        }
        history.push(page.dashboard)
      }
    })
  }

  validateForm = () => {
    const { email, password } = this.state.form
    const error = {
      email: [],
      password: []
    }

    if (!email.length) {
      error.email = [...error.email, 'Must be filled']
    }
    if (!isEmail(email)) {
      error.email = [...error.email, 'Wrong email format']
    }
    if (!password.length) {
      error.password = [...error.password, 'Must be filled']
    }

    this.setState({ error }, () => {
      if (this.isValidForm()) {
        this.doLogin(this.state.form)
      }
    })
  }

  isValidForm = () => {
    return !Object.values(this.state.error)
      .flat()
      .length
  }

  render() {
    const { isUnauthorized, form, error } = this.state

    return (
      <div className="login-page">
        <section className="logo p-16">
          <img src={logo} />
          <div className="font-comfortaa">Gadget Cemara</div>
        </section>

        <FormInput
          form={form}
          error={error}
          formInputList={formList}
          onSubmit={this.login}
          handleFormInputChange={this.handleFormInputChange}
        >
          <Link
            className="login-form__forgot-pass"
            to={page.resetPassword}
          >
            Lupa kata sandi
          </Link>
          <button
            type="submit"
            className="login-form__btn"
          >
            Masuk
          </button>
          {
            isUnauthorized && (
              <div className="login-form__error-message p-8">
                Email atau kata sandi Anda salah
              </div>
            )
          }
        </FormInput>

        <div className="login-form__no-account">
          Belum punya akun? &nbsp;
          <Link
            to={page.register}
            className="login-form__no-account--register"
          >
            Daftar disini
          </Link>
        </div>

        <BottomNavigation />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(actionCreators.login(payload)),
  getCurrentUser: payload => dispatch(actionCreators.getCurrentUser(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
