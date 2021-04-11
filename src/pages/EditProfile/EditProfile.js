import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actionCreators from '@/store/actions'
import Input from '@UI/Input/Input'
import male from '@/assets/images/svg/male.svg'
import config from '@/config/constant'

import './edit-profile.scss'

const page = config.page

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        name: '',
        email: ''
      },
      error: {
        name: ''
      }
    }
  }

  componentDidMount() {
    this.setState({
      form: {
        name: this.props.currentUser.name,
        email: this.props.currentUser.email
      }
    })
  }

  handleFormInputChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  updateProfile = e => {
    e && e.preventDefault()
    if (this.state.form.name.length) {
      this.props.updateUser({
        form: this.state.form,
        onSuccess: () => this.props.getCurrentUser({
          onSuccess: () => this.props.history.push(page.profileOrder)
        })
      })
      return
    }
    this.setState({
      error: {
        name: 'Harus diisi'
      }
    })
  }

  render() {
    const { form, error } = this.state

    return (
      <div className="edit-profile">
        <div className="header p-16">
          <Icon
            icon={faArrowLeft}
            onClick={() => this.props.history.goBack()}
            color="#55C595"
          />
          <strong>Ubah profil</strong>
        </div>

        <img
          src={male}
          className="edit-profile__avatar"
        />

        <form
          onSubmit={this.updateProfile}
          className="p-16"
        >
          <Input
            title="Nama"
            type="text"
            placeholder="Tulis nama"
            name="name"
            value={form.name}
            onChange={this.handleFormInputChange}
            errorMessage={error.name}
          />

          <Input
            title="Email"
            type="text"
            placeholder="Tulis email"
            name="email"
            value={form.email}
            onChange={this.handleFormInputChange}
            disabled
          />

          <button
            onClick={() => this.props.history.push(page.changePassword)}
            className="edit-profile__form-btn-password"
          >
            Ubah kata sandi
          </button>

          <button
            type="submit"
            className="edit-profile__form-btn"
          >
            Ubah
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  updateUser: payload => dispatch(actionCreators.updateUser(payload)),
  getCurrentUser: payload => dispatch(actionCreators.getCurrentUser(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
