import * as actionCreators from '@/store/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isEmail } from '@/utils/validation'
import React, { Component } from 'react'
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation'
import config from '@/config/constant'
import logo from '@/assets/images/svg/logo.svg'
import './login-page.scss'

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

  handleInputChange = e => {
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
    const { isUnauthorized } = this.state

    return (
      <div className="login-page">
        <section className="logo p-16">
          <img src={logo} />
          <div>Gadget Cemara</div>
        </section>

        <form
          className="form p-16"
          onSubmit={this.login}
          onKeyUp={e => e.key === 'Enter' && e.preventDefault() && this.login()}
        >
          {this.formInputElement()}
          <Link className="form__forgot-pass">
            Forgot password
          </Link>
          <button type="submit">Login</button>
          {
            isUnauthorized && (
              <div className="form__error-message p-8">
                Wrong username/password
              </div>
            )
          }
        </form>

        <div className="form__no-account">
          Didn't have an account yet? &nbsp;
          <Link
            to={page.register}
            className="form__no-account--register"
          >
            Register here
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
