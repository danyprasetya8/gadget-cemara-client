import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actionCreators from '@/store/actions'
import Input from '@UI/Input/Input'
import Dropdown from '@UI/Dropdown/Dropdown'
import Switch from 'react-switch'
import PageHeader from '@/components/PageHeader/PageHeader'
import config from '@/config/constant'

import './create-address.scss'

const page = config.page
class CreateAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        label: '',
        receiver: '',
        phoneNumber: '',
        postalCode: '',
        province: {
          id: '',
          value: ''
        },
        regency: {
          id: '',
          value: ''
        },
        district: {
          id: '',
          value: ''
        },
        detail: '',
        primary: false
      },
      error: {
        label: '',
        receiver: '',
        phoneNumber: '',
        postalCode: '',
        province: '',
        regency: '',
        district: '',
        detail: ''
      }
    }
  }

  componentDidMount() {
    if (this.props.provinceList.length) return
    this.props.getProvinceList()
  }

  mappedProvinceList = () => {
    return this.props.provinceList.map(({ id, nama }) => ({ id, value: nama }))
  }

  mappedRegencyList = () => {
    return this.props.regencyList.map(({ id, nama }) => ({ id, value: nama }))
  }

  mappedDistrictList = () => {
    return this.props.districtList.map(({ id, nama }) => ({ id, value: nama }))
  }

  handleFormInputChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.validity.valid ? e.target.value : this.state.form[e.target.name]
      }
    })
  }

  handlePrimarySwitchChnage = checked => {
    this.setState({
      form : {
        ...this.state.form,
        primary: checked
      }
    })
  }

  createAddress = e => {
    e && e.preventDefault()
    this.validateForm()
  }

  validateForm = () => {
    const {
      phoneNumber,
      province,
      regency,
      district
    } = this.state.form

    const error = {
      label: '',
      receiver: '',
      phoneNumber: '',
      postalCode: '',
      detail: ''
    }

    if (phoneNumber.length < 8) {
      error.phoneNumber = 'Format nomor telepon salah'
    }

    Object.keys(error).forEach(key => {
      if (!this.state.form[key].length) {
        error[key] = 'Harus diisi'
      }
    })

    if (!province.value.length) {
      error.province = 'Harus diisi'
    }

    if (!regency.value.length) {
      error.regency = 'Harus diisi'
    }

    if (!district.value.length) {
      error.district = 'Harus diisi'
    }

    this.setState({ error }, () => {
      if (this.isValidForm()) {
        this.doCreateAddress(this.state.form)
      }
    })
  }

  doCreateAddress = form => {
    const requestBody = {
      ...form,
      province: form.province.value,
      regency: form.regency.value,
      district: form.district.value
    }
    this.props.saveUserAddress({
      form: requestBody,
      onSuccess: () => this.props.getUserAddress({
        onSuccess: () => this.props.history.push(page.profileAddress)
      })
    })
  }

  isValidForm = () => {
    return Object.values(this.state.error).flat()
      .every(str => !str.length)
  }

  setProvince = province => {
    this.setState({
      form: {
        ...this.state.form,
        province,
        regency: { id: '', value: '' },
        district: { id: '', value: '' }
      }
    }, () => this.props.getRegencyList({ provinceId: this.state.form.province.id }))
  }

  setRegency = regency => {
    this.setState({
      form: {
        ...this.state.form,
        regency,
        district: { id: '', value: '' }
      }
    }, () => this.props.getDistrictList({ regencyId: this.state.form.regency.id }))
  }

  setDistrict = district => {
    this.setState({
      form: {
        ...this.state.form,
        district
      }
    })
  }

  render() {
    const { form, error } = this.state

    return (
      <div className="create-address">
        <PageHeader
          title="Buat alamat baru"
          onBack={() => this.props.history.push(page.profileAddress)}
        />
        <form onSubmit={this.createAddress}>
          <section className="create-address__form-contact">
            <div className="create-address__form-title create-address__form-title--green">
              Kontak
            </div>
            <Input
              title="Label alamat"
              type="text"
              placeholder="Tulis label alamat"
              name="label"
              value={form.label}
              onChange={this.handleFormInputChange}
              errorMessage={error.label}
            />

            <Input
              title="Penerima"
              type="text"
              placeholder="Tulis nama penerima"
              name="receiver"
              value={form.receiver}
              onChange={this.handleFormInputChange}
              errorMessage={error.receiver}
            />

            <Input
              title="Nomor telepon"
              type="text"
              placeholder="Tulis nomor telepon"
              name="phoneNumber"
              pattern={'[0-9]*'}
              value={form.phoneNumber}
              onChange={this.handleFormInputChange}
              errorMessage={error.phoneNumber}
            />
          </section>

          <section className="create-address__form-address">
            <div className="create-address__form-title create-address__form-title--green">
              Alamat
            </div>

            <div className="create-address__form--province">
              <div className="create-address__form-title">
                Provinsi
              </div>
              <Dropdown
                selected={form.province}
                disabled={!this.mappedProvinceList().length}
                listItem={this.mappedProvinceList()}
                handleSelectItem={this.setProvince}
                error={error.province}
              />
            </div>

            <div className="create-address__form--regency">
              <div className="create-address__form-title">
                Kota
              </div>
              <Dropdown
                selected={form.regency}
                disabled={!this.mappedRegencyList().length}
                listItem={this.mappedRegencyList()}
                handleSelectItem={this.setRegency}
                error={error.regency}
              />
            </div>

            <div className="create-address__form--district">
              <div className="create-address__form-title">
                Kecamatan
              </div>
              <Dropdown
                selected={form.district}
                disabled={!this.mappedDistrictList().length}
                listItem={this.mappedDistrictList()}
                handleSelectItem={this.setDistrict}
                error={error.district}
              />
            </div>

            <Input
              title="Kode pos"
              type="text"
              placeholder="Tulis kode pos"
              name="postalCode"
              value={form.postalCode}
              onChange={this.handleFormInputChange}
              errorMessage={error.postalCode}
              pattern={'[0-9]*'}
            />

            <Input
              title="Nama jalan dan detail lainnya"
              type="text"
              placeholder="Tulis detail alamat"
              name="detail"
              value={form.detail}
              onChange={this.handleFormInputChange}
              errorMessage={error.detail}
            />

            <label className="create-address__form-primary">
              <Switch
                onChange={this.handlePrimarySwitchChnage}
                checked={this.state.form.primary}
                onColor="#55C595"
                offColor="#9A9898"
                uncheckedIcon={false}
                checkedIcon={false}
                height={18}
                width={36}
                handleDiameter={16}
              />
              <div>Jadikan alamat utama</div>
            </label>

            <button
              type="submit"
              className="create-address__form-btn"
            >
              Tambah alamat
            </button>
          </section>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  provinceList: state.indonesiaArea.provinceList,
  regencyList: state.indonesiaArea.regencyList,
  districtList: state.indonesiaArea.districtList
})

const mapDispatchToProps = dispatch => ({
  getUserAddress: payload => dispatch(actionCreators.getUserAddress(payload)),
  saveUserAddress: payload => dispatch(actionCreators.saveUserAddress(payload)),
  getProvinceList: payload => dispatch(actionCreators.getProvinceList(payload)),
  getRegencyList: payload => dispatch(actionCreators.getRegencyList(payload)),
  getDistrictList: payload => dispatch(actionCreators.getDistrictList(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAddress)
