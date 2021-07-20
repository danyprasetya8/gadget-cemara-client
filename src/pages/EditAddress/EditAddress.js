import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actionCreators from '@/store/actions'
import Input from '@UI/Input/Input'
import Dropdown from '@UI/Dropdown/Dropdown'
import Switch from 'react-switch'
import PageHeader from '@/components/PageHeader/PageHeader'
import config from '@/config/constant'

import './edit-address.scss'

const page = config.page

class EditAddress extends Component {
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
    this.props.getOneUserAddress({
      id: this.getAddressIdFromQuery(),
      onSuccess: this.onSuccessGetOneUserAddress
    })
  }

  onSuccessGetOneUserAddress = () => {
    const { oneUserAddress = {} } = this.props
    const preFilledForm = {
      label: oneUserAddress.label,
      receiver: oneUserAddress.receiver,
      phoneNumber: oneUserAddress.phoneNumber,
      postalCode: oneUserAddress.postalCode,
      province: {
        id: '',
        value: oneUserAddress.province
      },
      regency: {
        id: '',
        value: oneUserAddress.regency
      },
      district: {
        id: '',
        value: oneUserAddress.district
      },
      detail: oneUserAddress.detail,
      primary: oneUserAddress.primary
    }
    this.setState({ form: preFilledForm }, this.fillAreaField)
  }

  findArea = area => {
    return this.props[`${area}List`].find(o => o.nama === this.state.form[area].value) || {}
  }

  fillAreaField = () => {
    const {
      getProvinceList,
      getRegencyList,
      getDistrictList
    } = this.props

    getProvinceList({
      onSuccess: () => {
        getRegencyList({
          provinceId: this.findArea('province').id,
          onSuccess: () => {
            getDistrictList({
              regencyId: this.findArea('regency').id,
              onSuccess: () => {
                this.setState({ 
                  form: {
                    ...this.state.form,
                    province: {
                      id: this.findArea('province').id,
                      value: this.findArea('province').nama
                    },
                    regency: {
                      id: this.findArea('regency').id,
                      value: this.findArea('regency').nama
                    },
                    district: {
                      id: this.findArea('district').id,
                      value: this.findArea('district').nama
                    }
                  }
                 })
              }
            })
          }
        })
      }
    })
  }

  getAddressIdFromQuery = () => {
    const { search = '' } = this.props.location
    const query = new URLSearchParams(search)
    return query.get('addressId')
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

  handleFormInputChange = (e, name) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.validity.valid ? e.target.value : this.state.form[name]
      }
    })
  }

  handlePrimarySwitchChange = checked => {
    if (!checked) return
    this.setState({
      form : {
        ...this.state.form,
        primary: checked
      }
    })
  }

  updateAddress = e => {
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
        this.doUpdateAddress(this.state.form)
      }
    })
  }

  doUpdateAddress = form => {
    const requestBody = {
      ...form,
      id: this.getAddressIdFromQuery(),
      province: form.province.value,
      regency: form.regency.value,
      district: form.district.value
    }
    this.props.updateUserAddress({
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
      <div className="edit-address">
        <PageHeader
          title="Ubah alamat"
          onBack={() => this.props.history.push(page.profileAddress)}
        />

        <form onSubmit={this.updateAddress}>
          <section className="edit-address__form-contact">
            <div className="edit-address__form-title edit-address__form-title--green">
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

          <section className="edit-address__form-address">
            <div className="edit-address__form-title edit-address__form-title--green">
              Alamat
            </div>

            <div className="edit-address__form--province">
              <div className="edit-address__form-title">
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

            <div className="edit-address__form--regency">
              <div className="edit-address__form-title">
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

            <div className="edit-address__form--district">
              <div className="edit-address__form-title">
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

            <label className="edit-address__form-primary">
              <Switch
                onChange={this.handlePrimarySwitchChange}
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
              className="edit-address__form-btn"
            >
              Ubah alamat
            </button>
          </section>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  oneUserAddress: state.address.oneUserAddress,
  provinceList: state.indonesiaArea.provinceList,
  regencyList: state.indonesiaArea.regencyList,
  districtList: state.indonesiaArea.districtList
})

const mapDispatchToProps = dispatch => ({
  getUserAddress: payload => dispatch(actionCreators.getUserAddress(payload)),
  getOneUserAddress: payload => dispatch(actionCreators.getOneUserAddress(payload)),
  updateUserAddress: payload => dispatch(actionCreators.updateUserAddress(payload)),
  getProvinceList: payload => dispatch(actionCreators.getProvinceList(payload)),
  getRegencyList: payload => dispatch(actionCreators.getRegencyList(payload)),
  getDistrictList: payload => dispatch(actionCreators.getDistrictList(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress)
